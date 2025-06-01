-- Remaining limit calculation
create or replace function remaining_limit(emp uuid)
returns numeric language sql stable as $$
  select (e.salary*e.limit_pct) -
         coalesce(sum(case when wr.status in ('pending','approved','disbursed') then wr.amount end),0)
  from employees e
  left join wage_requests wr on wr.employee_id=e.id
  where e.id=emp
  group by e.salary,e.limit_pct;
$$;

-- Can request advance check
create or replace function can_request_advance(emp uuid, amt numeric)
returns boolean language sql stable as $$
  select remaining_limit(emp) >= amt;
$$;

-- Trigger: enforce limit & snapshot
create or replace function wage_before_insert()
returns trigger language plpgsql as $$
begin
  if not can_request_advance(NEW.employee_id, NEW.amount) then
    raise exception 'Amount exceeds remaining limit';
  end if;
  NEW.limit_snapshot := (select salary*limit_pct from employees where id=NEW.employee_id);
  return NEW;
end;
$$;

create trigger trg_wage_before_insert
  before insert on wage_requests
  for each row execute procedure wage_before_insert();

-- RPC approve_wage_request
create or replace function approve_wage_request(req uuid)
returns void language plpgsql security definer as $$
declare
  r wage_requests%rowtype;
begin
  select * into r from wage_requests where id = req for update;
  if r.status <> 'pending' then raise exception 'Only pending'; end if;

  update wage_requests set status='approved' where id=req;

  insert into transactions (ref_id, tx_type, amount, status)
    values (req, 'advance', r.amount, 'ready');

  insert into audit_logs(actor_id:=auth.uid(), actor_role:=current_role(),
                         entity:='wage_requests', entity_id:=req,
                         action:='approved', delta:=jsonb_build_object('amount',r.amount));
end;
$$;

grant execute on function approve_wage_request(uuid) to authenticated; 
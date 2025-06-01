-- Enable RLS on all tables
alter table companies enable row level security;
alter table employees enable row level security;
alter table wage_requests enable row level security;
alter table payroll_financing enable row level security;
alter table transactions enable row level security;
alter table audit_logs enable row level security;

-- Helper functions
create or replace function current_role() returns text
  language sql stable as $$ 
    select role from auth.users where id = auth.uid(); 
  $$;

create or replace function current_company() returns uuid
  language sql stable as $$ 
    select company_id from auth.users where id = auth.uid(); 
  $$;

-- Drop existing policies if they exist
drop policy if exists "admin all companies" on companies;
drop policy if exists "employer own company" on companies;
drop policy if exists "admin employees" on employees;
drop policy if exists "employer employees" on employees;
drop policy if exists "employee self" on employees;
drop policy if exists "admin wage" on wage_requests;
drop policy if exists "employer company wage" on wage_requests;
drop policy if exists "employee own wage" on wage_requests;
drop policy if exists "admin payroll" on payroll_financing;
drop policy if exists "employer own payroll" on payroll_financing;
drop policy if exists "admin tx" on transactions;
drop policy if exists "employer tx" on transactions;
drop policy if exists "employee tx" on transactions;

-- COMPANIES policies
create policy "admin all companies" on companies
  for all using (current_role() = 'admin');

create policy "employer own company" on companies
  for all using (current_role() = 'employer' and id = current_company());

-- EMPLOYEES policies
create policy "admin employees" on employees
  for all using (current_role() = 'admin');

create policy "employer employees" on employees
  for all using (current_role() = 'employer' and company_id = current_company());

create policy "employee self" on employees
  for select using (current_role() = 'employee' and auth_id = auth.uid());

-- WAGE REQUESTS policies
create policy "admin wage" on wage_requests
  for all using (current_role() = 'admin');

create policy "employer company wage" on wage_requests
  for all using (
    current_role() = 'employer' 
    and employee_id in (
      select id from employees where company_id = current_company()
    )
  );

create policy "employee own wage" on wage_requests
  for all using (
    current_role() = 'employee' 
    and employee_id = (
      select id from employees where auth_id = auth.uid()
    )
  );

-- PAYROLL FINANCING policies
create policy "admin payroll" on payroll_financing
  for all using (current_role() = 'admin');

create policy "employer own payroll" on payroll_financing
  for all using (current_role() = 'employer' and company_id = current_company());

-- TRANSACTIONS policies
create policy "admin tx" on transactions
  for all using (current_role() = 'admin');

create policy "employer tx" on transactions
  for select using (
    current_role() = 'employer' 
    and ref_id in (
      select id from wage_requests 
      where employee_id in (
        select id from employees where company_id = current_company()
      )
      union
      select id from payroll_financing 
      where company_id = current_company()
    )
  );

create policy "employee tx" on transactions
  for select using (
    current_role() = 'employee' 
    and ref_id in (
      select id from wage_requests 
      where employee_id = (
        select id from employees where auth_id = auth.uid()
      )
    )
  ); 
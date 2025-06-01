-- === USERS (Supabase Auth) =========================================================
alter table auth.users
  add column role text check (role in ('admin','employer','employee')) default 'employee',
  add column company_id uuid;

-- === COMPANIES =====================================================================
create table public.companies (
  id            uuid primary key default gen_random_uuid(),
  name          text not null unique,
  email         text not null unique,
  contact_phone text,
  status        text default 'draft' check (status in ('draft','pending_verification','verified','disabled')),
  payroll_limit numeric(12,2) default 0,
  mpesa_paybill text,
  created_at    timestamptz default now()
);

-- === EMPLOYEES =====================================================================
create table public.employees (
  id            uuid primary key default gen_random_uuid(),
  company_id    uuid not null references public.companies(id) on delete cascade,
  auth_id       uuid references auth.users(id) on delete cascade,
  first_name    text, last_name text, national_id text,
  phone         text, email text,
  salary        numeric(12,2),
  limit_pct     numeric(5,2) default 0.5,
  status        text default 'active' check (status in ('active','disabled','archived')),
  created_at    timestamptz default now()
);

-- === ENUMS ========================================================================
create type wage_request_status as enum ('pending','approved','declined','disbursed','repaid');
create type payroll_status      as enum ('pending_docs','under_review','approved','declined','disbursed');
create type tx_type             as enum ('advance','loan','payroll');
create type tx_status           as enum ('ready','processing','success','failed');

-- === WAGE REQUESTS =================================================================
create table public.wage_requests (
  id             uuid primary key default gen_random_uuid(),
  employee_id    uuid not null references public.employees(id) on delete cascade,
  amount         numeric(12,2) not null,
  status         wage_request_status default 'pending',
  limit_snapshot numeric(12,2),
  decline_reason text,
  disbursed_at   timestamptz,
  created_at     timestamptz default now()
);

-- === PAYROLL FINANCING =============================================================
create table public.payroll_financing (
  id            uuid primary key default gen_random_uuid(),
  company_id    uuid not null references public.companies(id) on delete cascade,
  range_min     numeric(12,2),
  range_max     numeric(12,2),
  status        payroll_status default 'pending_docs',
  docs_urls     text[],
  created_at    timestamptz default now()
);

-- === TRANSACTIONS & AUDIT ==========================================================
create table public.transactions (
  id         uuid primary key default gen_random_uuid(),
  ref_id     uuid,               -- wage_requests.id or payroll_financing.id
  tx_type    tx_type,
  mpesa_ref  text,
  amount     numeric(12,2),
  status     tx_status default 'ready',
  meta       jsonb,
  created_at timestamptz default now()
);

create table public.audit_logs (
  id          uuid primary key default gen_random_uuid(),
  actor_id    uuid,
  actor_role  text,
  entity      text,
  entity_id   uuid,
  action      text,
  delta       jsonb,
  created_at  timestamptz default now()
); 
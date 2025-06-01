-- Test data setup
begin;

-- Create test users with different roles
insert into auth.users (id, email, role, company_id)
values 
  ('11111111-1111-1111-1111-111111111111', 'admin@test.com', 'admin', null),
  ('22222222-2222-2222-2222-222222222222', 'employer@test.com', 'employer', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
  ('33333333-3333-3333-3333-333333333333', 'employee@test.com', 'employee', null);

-- Create test company
insert into companies (id, name, email, status, payroll_limit)
values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Test Company', 'company@test.com', 'verified', 1000000);

-- Create test employee
insert into employees (id, company_id, auth_id, first_name, last_name, email, status)
values ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'Test', 'Employee', 'employee@test.com', 'active');

-- Create test wage request
insert into wage_requests (id, employee_id, amount, status)
values ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 1000, 'pending');

-- Create test payroll financing
insert into payroll_financing (id, company_id, status, docs_urls)
values ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'pending_docs', array['https://example.com/doc1.pdf']);

-- Create test transaction
insert into transactions (id, ref_id, tx_type, amount, status)
values ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'advance', 1000, 'ready');

-- Test queries
do $$
declare
  admin_id uuid := '11111111-1111-1111-1111-111111111111';
  employer_id uuid := '22222222-2222-2222-2222-222222222222';
  employee_id uuid := '33333333-3333-3333-3333-333333333333';
  company_id uuid := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
  employee_record_id uuid := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
  wage_request_id uuid := 'cccccccc-cccc-cccc-cccc-cccccccccccc';
  payroll_id uuid := 'dddddddd-dddd-dddd-dddd-dddddddddddd';
  transaction_id uuid := 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee';
begin
  -- Test admin access
  set local role authenticated;
  set local "request.jwt.claims" to jsonb_build_object(
    'sub', admin_id,
    'role', 'admin'
  );

  -- Admin should see all companies
  assert (
    select count(*) from companies
  ) = 1, 'Admin should see all companies';

  -- Admin should see all employees
  assert (
    select count(*) from employees
  ) = 1, 'Admin should see all employees';

  -- Admin should see all wage requests
  assert (
    select count(*) from wage_requests
  ) = 1, 'Admin should see all wage requests';

  -- Admin should see all payroll financing
  assert (
    select count(*) from payroll_financing
  ) = 1, 'Admin should see all payroll financing';

  -- Admin should see all transactions
  assert (
    select count(*) from transactions
  ) = 1, 'Admin should see all transactions';

  -- Test employer access
  set local "request.jwt.claims" to jsonb_build_object(
    'sub', employer_id,
    'role', 'employer',
    'company_id', company_id
  );

  -- Employer should only see their company
  assert (
    select count(*) from companies
  ) = 1, 'Employer should see their company';

  -- Employer should see their company's employees
  assert (
    select count(*) from employees
  ) = 1, 'Employer should see their company''s employees';

  -- Employer should see their company's wage requests
  assert (
    select count(*) from wage_requests
  ) = 1, 'Employer should see their company''s wage requests';

  -- Employer should see their company's payroll financing
  assert (
    select count(*) from payroll_financing
  ) = 1, 'Employer should see their company''s payroll financing';

  -- Employer should see their company's transactions
  assert (
    select count(*) from transactions
  ) = 1, 'Employer should see their company''s transactions';

  -- Test employee access
  set local "request.jwt.claims" to jsonb_build_object(
    'sub', employee_id,
    'role', 'employee'
  );

  -- Employee should not see any companies
  assert (
    select count(*) from companies
  ) = 0, 'Employee should not see any companies';

  -- Employee should only see their own profile
  assert (
    select count(*) from employees
  ) = 1, 'Employee should see their own profile';

  -- Employee should only see their own wage requests
  assert (
    select count(*) from wage_requests
  ) = 1, 'Employee should see their own wage requests';

  -- Employee should not see any payroll financing
  assert (
    select count(*) from payroll_financing
  ) = 0, 'Employee should not see any payroll financing';

  -- Employee should only see their own transactions
  assert (
    select count(*) from transactions
  ) = 1, 'Employee should see their own transactions';

  raise notice 'All RLS policy tests passed!';
end;
$$;

-- Clean up test data
rollback; 
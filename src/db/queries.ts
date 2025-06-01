import { pool } from './client';
import type {
  Company,
  Employee,
  WageRequest,
  PayrollFinancing,
  Transaction,
  AuditLog,
} from '../types/database';

// Company Queries
export async function getCompany(id: string): Promise<Company | null> {
  const result = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function createCompany(company: Omit<Company, 'id' | 'created_at'>): Promise<Company> {
  const result = await pool.query(
    `INSERT INTO companies (name, email, contact_phone, status, payroll_limit, mpesa_paybill)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [company.name, company.email, company.contact_phone, company.status, company.payroll_limit, company.mpesa_paybill]
  );
  return result.rows[0];
}

// Employee Queries
export async function getEmployee(id: string): Promise<Employee | null> {
  const result = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getEmployeesByCompany(companyId: string): Promise<Employee[]> {
  const result = await pool.query('SELECT * FROM employees WHERE company_id = $1', [companyId]);
  return result.rows;
}

export async function createEmployee(employee: Omit<Employee, 'id' | 'created_at'>): Promise<Employee> {
  const result = await pool.query(
    `INSERT INTO employees (company_id, auth_id, first_name, last_name, national_id, phone, email, salary, limit_pct, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *`,
    [
      employee.company_id,
      employee.auth_id,
      employee.first_name,
      employee.last_name,
      employee.national_id,
      employee.phone,
      employee.email,
      employee.salary,
      employee.limit_pct,
      employee.status,
    ]
  );
  return result.rows[0];
}

// Wage Request Queries
export async function getWageRequest(id: string): Promise<WageRequest | null> {
  const result = await pool.query('SELECT * FROM wage_requests WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getWageRequestsByEmployee(employeeId: string): Promise<WageRequest[]> {
  const result = await pool.query('SELECT * FROM wage_requests WHERE employee_id = $1', [employeeId]);
  return result.rows;
}

export async function createWageRequest(request: Omit<WageRequest, 'id' | 'created_at'>): Promise<WageRequest> {
  const result = await pool.query(
    `INSERT INTO wage_requests (employee_id, amount, status, limit_snapshot)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [request.employee_id, request.amount, request.status, request.limit_snapshot]
  );
  return result.rows[0];
}

// Payroll Financing Queries
export async function getPayrollFinancing(id: string): Promise<PayrollFinancing | null> {
  const result = await pool.query('SELECT * FROM payroll_financing WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function getPayrollFinancingByCompany(companyId: string): Promise<PayrollFinancing[]> {
  const result = await pool.query('SELECT * FROM payroll_financing WHERE company_id = $1', [companyId]);
  return result.rows;
}

export async function createPayrollFinancing(
  financing: Omit<PayrollFinancing, 'id' | 'created_at'>
): Promise<PayrollFinancing> {
  const result = await pool.query(
    `INSERT INTO payroll_financing (company_id, range_min, range_max, status, docs_urls)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [financing.company_id, financing.range_min, financing.range_max, financing.status, financing.docs_urls]
  );
  return result.rows[0];
}

// Transaction Queries
export async function getTransaction(id: string): Promise<Transaction | null> {
  const result = await pool.query('SELECT * FROM transactions WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function createTransaction(transaction: Omit<Transaction, 'id' | 'created_at'>): Promise<Transaction> {
  const result = await pool.query(
    `INSERT INTO transactions (ref_id, tx_type, mpesa_ref, amount, status, meta)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [transaction.ref_id, transaction.tx_type, transaction.mpesa_ref, transaction.amount, transaction.status, transaction.meta]
  );
  return result.rows[0];
}

// Audit Log Queries
export async function createAuditLog(log: Omit<AuditLog, 'id' | 'created_at'>): Promise<AuditLog> {
  const result = await pool.query(
    `INSERT INTO audit_logs (actor_id, actor_role, entity, entity_id, action, delta)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [log.actor_id, log.actor_role, log.entity, log.entity_id, log.action, log.delta]
  );
  return result.rows[0];
} 
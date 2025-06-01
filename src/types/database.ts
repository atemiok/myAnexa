export type UserRole = 'admin' | 'employer' | 'employee';
export type CompanyStatus = 'draft' | 'pending_verification' | 'verified' | 'disabled';
export type EmployeeStatus = 'active' | 'disabled' | 'archived';
export type WageRequestStatus = 'pending' | 'approved' | 'declined' | 'disbursed' | 'repaid';
export type PayrollStatus = 'pending_docs' | 'under_review' | 'approved' | 'declined' | 'disbursed';
export type TransactionType = 'advance' | 'loan' | 'payroll';
export type TransactionStatus = 'ready' | 'processing' | 'success' | 'failed';

export interface Company {
  id: string;
  name: string;
  email: string;
  contact_phone?: string;
  status: CompanyStatus;
  payroll_limit: number;
  mpesa_paybill?: string;
  created_at: string;
}

export interface Employee {
  id: string;
  company_id: string;
  auth_id?: string;
  first_name?: string;
  last_name?: string;
  national_id?: string;
  phone?: string;
  email?: string;
  salary?: number;
  limit_pct: number;
  status: EmployeeStatus;
  created_at: string;
}

export interface WageRequest {
  id: string;
  employee_id: string;
  amount: number;
  status: WageRequestStatus;
  limit_snapshot?: number;
  decline_reason?: string;
  disbursed_at?: string;
  created_at: string;
}

export interface PayrollFinancing {
  id: string;
  company_id: string;
  range_min?: number;
  range_max?: number;
  status: PayrollStatus;
  docs_urls: string[];
  created_at: string;
}

export interface Transaction {
  id: string;
  ref_id?: string;
  tx_type: TransactionType;
  mpesa_ref?: string;
  amount: number;
  status: TransactionStatus;
  meta?: Record<string, unknown>;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id?: string;
  actor_role?: string;
  entity: string;
  entity_id?: string;
  action: string;
  delta?: Record<string, unknown>;
  created_at: string;
} 
import { z } from 'zod';
import { createEmployee, getEmployee, getEmployeesByCompany } from '../db/queries';
import { createResponse, createErrorResponse, validateRequest } from './utils';
import { requireRole } from './middleware';
import type { Employee } from '../types/database';

// Validation schemas
const createEmployeeSchema = z.object({
  company_id: z.string().uuid(),
  auth_id: z.string().uuid().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  national_id: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  salary: z.number().min(0).optional(),
  limit_pct: z.number().min(0).max(1).default(0.5),
  status: z.enum(['active', 'disabled', 'archived'] as const).default('active'),
}) as z.ZodType<Omit<Employee, 'id' | 'created_at'>>;

// API handler
export async function handleRequest(request: Request) {
  try {
    const url = new URL(request.url);
    const method = request.method;

    // GET /api/employees/:id
    if (method === 'GET' && url.pathname.match(/^\/api\/employees\/[^/]+$/)) {
      // Require admin, employer, or employee role
      const user = await requireRole(['admin', 'employer', 'employee'])(request);
      
      const id = url.pathname.split('/').pop()!;
      const employee = await getEmployee(id);
      
      if (!employee) {
        return createErrorResponse(new Error('Employee not found'), 404);
      }

      // If employee, only allow access to their own profile
      if (user.user_metadata?.role === 'employee' && employee.auth_id !== user.id) {
        return createErrorResponse(new Error('Access denied'), 403);
      }

      // If employer, only allow access to employees in their company
      if (user.user_metadata?.role === 'employer' && employee.company_id !== user.user_metadata?.company_id) {
        return createErrorResponse(new Error('Access denied'), 403);
      }

      return createResponse(employee);
    }

    // GET /api/employees/company/:companyId
    if (method === 'GET' && url.pathname.match(/^\/api\/employees\/company\/[^/]+$/)) {
      // Require admin or employer role
      const user = await requireRole(['admin', 'employer'])(request);
      
      const companyId = url.pathname.split('/').pop()!;

      // If employer, only allow access to their own company
      if (user.user_metadata?.role === 'employer' && companyId !== user.user_metadata?.company_id) {
        return createErrorResponse(new Error('Access denied'), 403);
      }

      const employees = await getEmployeesByCompany(companyId);
      return createResponse(employees);
    }

    // POST /api/employees
    if (method === 'POST' && url.pathname === '/api/employees') {
      // Require admin or employer role
      const user = await requireRole(['admin', 'employer'])(request);
      
      const body = await request.json();
      const data = validateRequest(createEmployeeSchema, body);

      // If employer, only allow creating employees in their company
      if (user.user_metadata?.role === 'employer' && data.company_id !== user.user_metadata?.company_id) {
        return createErrorResponse(new Error('Access denied'), 403);
      }

      const employee = await createEmployee(data);
      return createResponse(employee, 201);
    }

    return createErrorResponse(new Error('Not found'), 404);
  } catch (error) {
    return createErrorResponse(error);
  }
} 
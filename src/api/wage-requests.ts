import { z } from 'zod';
import { createWageRequest, getWageRequest, getWageRequestsByEmployee, getEmployee } from '../db/queries';
import { createResponse, createErrorResponse, validateRequest } from './utils';
import { requireRole } from './middleware';
import type { WageRequest } from '../types/database';

// Validation schemas
const createWageRequestSchema = z.object({
  employee_id: z.string().uuid(),
  amount: z.number().min(0),
  status: z.enum(['pending', 'approved', 'declined', 'disbursed', 'repaid'] as const).default('pending'),
  limit_snapshot: z.number().optional(),
  decline_reason: z.string().optional(),
  disbursed_at: z.string().datetime().optional(),
}) as z.ZodType<Omit<WageRequest, 'id' | 'created_at'>>;

// API handler
export async function handleRequest(request: Request) {
  try {
    const url = new URL(request.url);
    const method = request.method;

    // GET /api/wage-requests/:id
    if (method === 'GET' && url.pathname.match(/^\/api\/wage-requests\/[^/]+$/)) {
      const user = await requireRole(['admin', 'employer', 'employee'])(request);
      const id = url.pathname.split('/').pop()!;
      const wageRequest = await getWageRequest(id);
      
      if (!wageRequest) {
        return createErrorResponse(new Error('Wage request not found'), 404);
      }

      // If employee, only allow access to their own requests
      if (user.user_metadata?.role === 'employee') {
        const employee = await getEmployee(wageRequest.employee_id);
        if (employee?.auth_id !== user.id) {
          return createErrorResponse(new Error('Access denied'), 403);
        }
      }

      // If employer, only allow access to requests from their company
      if (user.user_metadata?.role === 'employer') {
        const employee = await getEmployee(wageRequest.employee_id);
        if (employee?.company_id !== user.user_metadata?.company_id) {
          return createErrorResponse(new Error('Access denied'), 403);
        }
      }

      return createResponse(wageRequest);
    }

    // GET /api/wage-requests/employee/:employeeId
    if (method === 'GET' && url.pathname.match(/^\/api\/wage-requests\/employee\/[^/]+$/)) {
      const user = await requireRole(['admin', 'employer', 'employee'])(request);
      const employeeId = url.pathname.split('/').pop()!;

      // If employee, only allow access to their own requests
      if (user.user_metadata?.role === 'employee') {
        const employee = await getEmployee(employeeId);
        if (employee?.auth_id !== user.id) {
          return createErrorResponse(new Error('Access denied'), 403);
        }
      }

      // If employer, only allow access to requests from their company
      if (user.user_metadata?.role === 'employer') {
        const employee = await getEmployee(employeeId);
        if (employee?.company_id !== user.user_metadata?.company_id) {
          return createErrorResponse(new Error('Access denied'), 403);
        }
      }

      const requests = await getWageRequestsByEmployee(employeeId);
      return createResponse(requests);
    }

    // POST /api/wage-requests
    if (method === 'POST' && url.pathname === '/api/wage-requests') {
      const user = await requireRole(['employee'])(request);
      const body = await request.json();
      const data = validateRequest(createWageRequestSchema, body);

      // Verify the employee is creating a request for themselves
      const employee = await getEmployee(data.employee_id);
      if (!employee || employee.auth_id !== user.id) {
        return createErrorResponse(new Error('Access denied'), 403);
      }

      const wageRequest = await createWageRequest(data);
      return createResponse(wageRequest, 201);
    }

    return createErrorResponse(new Error('Not found'), 404);
  } catch (error) {
    return createErrorResponse(error);
  }
} 
import { z } from 'zod';
import { createPayrollFinancing, getPayrollFinancing, getPayrollFinancingByCompany } from '../db/queries';
import { createResponse, createErrorResponse, validateRequest } from './utils';
import { requireRole } from './middleware';
import type { PayrollFinancing, PayrollStatus } from '../types/database';

// Validation schemas
const createPayrollFinancingSchema = z.object({
  company_id: z.string().uuid(),
  range_min: z.number().min(0).optional(),
  range_max: z.number().min(0).optional(),
  status: z.enum(['pending_docs', 'under_review', 'approved', 'declined', 'disbursed'] as const).default('pending_docs'),
  docs_urls: z.array(z.string().url()),
}) as z.ZodType<Omit<PayrollFinancing, 'id' | 'created_at'>>;

// API handler
export async function handleRequest(request: Request) {
  try {
    const url = new URL(request.url);
    const method = request.method;

    // GET /api/payroll-financing/:id
    if (method === 'GET' && url.pathname.match(/^\/api\/payroll-financing\/[^/]+$/)) {
      // Require admin or employer role
      const user = await requireRole(['admin', 'employer'])(request);
      
      const id = url.pathname.split('/').pop()!;
      const financing = await getPayrollFinancing(id);
      
      if (!financing) {
        return createErrorResponse(new Error('Payroll financing not found'), 404);
      }

      // If employer, only allow access to their own company's financing
      if (user.user_metadata?.role === 'employer' && financing.company_id !== user.user_metadata?.company_id) {
        return createErrorResponse(new Error('Access denied'), 403);
      }

      return createResponse(financing);
    }

    // GET /api/payroll-financing/company/:companyId
    if (method === 'GET' && url.pathname.match(/^\/api\/payroll-financing\/company\/[^/]+$/)) {
      // Require admin or employer role
      const user = await requireRole(['admin', 'employer'])(request);
      
      const companyId = url.pathname.split('/').pop()!;

      // If employer, only allow access to their own company
      if (user.user_metadata?.role === 'employer' && companyId !== user.user_metadata?.company_id) {
        return createErrorResponse(new Error('Access denied'), 403);
      }

      const financing = await getPayrollFinancingByCompany(companyId);
      return createResponse(financing);
    }

    // POST /api/payroll-financing
    if (method === 'POST' && url.pathname === '/api/payroll-financing') {
      // Require admin or employer role
      const user = await requireRole(['admin', 'employer'])(request);
      
      const body = await request.json();
      const data = validateRequest(createPayrollFinancingSchema, body);

      // If employer, only allow creating financing for their company
      if (user.user_metadata?.role === 'employer' && data.company_id !== user.user_metadata?.company_id) {
        return createErrorResponse(new Error('Access denied'), 403);
      }

      const financing = await createPayrollFinancing(data);
      return createResponse(financing, 201);
    }

    return createErrorResponse(new Error('Not found'), 404);
  } catch (error) {
    return createErrorResponse(error);
  }
} 
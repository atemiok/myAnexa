import { z } from 'zod';
import { createCompany, getCompany } from '../db/queries';
import { createResponse, createErrorResponse, validateRequest } from './utils';
import { requireRole } from './middleware';
import type { Company } from '../types/database';

// Validation schemas
const createCompanySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  contact_phone: z.string().optional(),
  status: z.enum(['draft', 'pending_verification', 'verified', 'disabled'] as const).default('draft'),
  payroll_limit: z.number().min(0).default(0),
  mpesa_paybill: z.string().optional(),
}) as z.ZodType<Omit<Company, 'id' | 'created_at'>>;

// API handler
export async function handleRequest(request: Request) {
  try {
    const url = new URL(request.url);
    const method = request.method;

    // GET /api/companies/:id
    if (method === 'GET' && url.pathname.match(/^\/api\/companies\/[^/]+$/)) {
      // Require admin or employer role
      await requireRole(['admin', 'employer'])(request);
      
      const id = url.pathname.split('/').pop()!;
      const company = await getCompany(id);
      
      if (!company) {
        return createErrorResponse(new Error('Company not found'), 404);
      }

      return createResponse(company);
    }

    // POST /api/companies
    if (method === 'POST' && url.pathname === '/api/companies') {
      // Require admin role
      await requireRole(['admin'])(request);
      
      const body = await request.json();
      const data = validateRequest(createCompanySchema, body);
      const company = await createCompany(data);
      return createResponse(company, 201);
    }

    return createErrorResponse(new Error('Not found'), 404);
  } catch (error) {
    return createErrorResponse(error);
  }
} 
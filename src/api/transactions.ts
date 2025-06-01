import { z } from 'zod';
import { createTransaction, getTransaction } from '../db/queries';
import { createResponse, createErrorResponse, validateRequest } from './utils';
import { requireRole } from './middleware';
import type { Transaction } from '../types/database';

// Validation schemas
const createTransactionSchema = z.object({
  ref_id: z.string().uuid().optional(),
  tx_type: z.enum(['advance', 'loan', 'payroll'] as const),
  mpesa_ref: z.string().optional(),
  amount: z.number().min(0),
  status: z.enum(['ready', 'processing', 'success', 'failed'] as const).default('ready'),
  meta: z.record(z.unknown()).optional(),
}) as z.ZodType<Omit<Transaction, 'id' | 'created_at'>>;

// API handler
export async function handleRequest(request: Request) {
  try {
    const url = new URL(request.url);
    const method = request.method;

    // GET /api/transactions/:id
    if (method === 'GET' && url.pathname.match(/^\/api\/transactions\/[^/]+$/)) {
      // Require admin role
      await requireRole(['admin'])(request);
      
      const id = url.pathname.split('/').pop()!;
      const transaction = await getTransaction(id);
      
      if (!transaction) {
        return createErrorResponse(new Error('Transaction not found'), 404);
      }

      return createResponse(transaction);
    }

    // POST /api/transactions
    if (method === 'POST' && url.pathname === '/api/transactions') {
      // Require admin role
      await requireRole(['admin'])(request);
      
      const body = await request.json();
      const data = validateRequest(createTransactionSchema, body);
      const transaction = await createTransaction(data);
      return createResponse(transaction, 201);
    }

    return createErrorResponse(new Error('Not found'), 404);
  } catch (error) {
    return createErrorResponse(error);
  }
} 
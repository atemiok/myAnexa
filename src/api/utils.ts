import { z } from 'zod';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function createResponse<T>(data: T, status = 200) {
  return new Response(JSON.stringify({ data }), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function createErrorResponse(error: unknown, status = 500) {
  const message = error instanceof Error ? error.message : 'Internal Server Error';
  const details = error instanceof ApiError ? error.details : undefined;

  return new Response(
    JSON.stringify({
      error: {
        message,
        details,
      },
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError(400, 'Invalid request data', error.errors);
    }
    throw error;
  }
} 
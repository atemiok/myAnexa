import { supabase } from '../db/config';
import { ApiError } from './utils';

export async function authenticateRequest(request: Request) {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    throw new ApiError(401, 'Missing or invalid authorization header');
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      throw new ApiError(401, 'Invalid token');
    }

    return user;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(401, 'Authentication failed');
  }
}

export function requireRole(roles: string[]) {
  return async (request: Request) => {
    const user = await authenticateRequest(request);
    
    if (!user.user_metadata?.role || !roles.includes(user.user_metadata.role)) {
      throw new ApiError(403, 'Insufficient permissions');
    }

    return user;
  };
} 
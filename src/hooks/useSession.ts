import { useAuth } from '../context/AuthContext';

export function useSession() {
  const { user, role, companyId } = useAuth();
  return { user, role, companyId };
} 
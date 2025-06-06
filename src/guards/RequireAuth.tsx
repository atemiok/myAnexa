import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Spinner } from '../components/Spinner';

interface RequireAuthProps {
  children: React.ReactNode;
  role?: 'admin' | 'employer' | 'employee';
}

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
} 
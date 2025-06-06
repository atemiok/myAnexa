import { Navigate, useLocation } from 'react-router-dom';
import { useSession } from '../hooks/useSession';

interface RequireAuthProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function RequireAuth({ children, allowedRoles }: RequireAuthProps) {
  const { user, role } = useSession();
  const location = useLocation();
  const userRole = role || '';

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // Check route-based access
  const path = location.pathname;
  if (path.startsWith('/admin') && userRole !== 'admin') {
    return <Navigate to="/403" replace />;
  }
  if (path.startsWith('/employer') && userRole !== 'employer') {
    return <Navigate to="/403" replace />;
  }
  if (path.startsWith('/employee') && userRole !== 'employee') {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
} 
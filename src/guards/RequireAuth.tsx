import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RequireAuthProps {
  children: React.ReactNode;
  role?: string;
}

export default function RequireAuth({ children, role }: RequireAuthProps) {
  const { user, role: userRole } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && userRole !== role) {
    // Redirect to appropriate dashboard based on role
    return <Navigate to={`/${userRole?.toLowerCase()}/dashboard`} replace />;
  }

  return <>{children}</>;
} 
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Spinner } from '../components/Spinner';

interface RequireAuthProps {
  children: React.ReactNode;
  role?: 'admin' | 'employer' | 'employee';
}

export default function RequireAuth({ children, role }: RequireAuthProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    // Redirect to appropriate dashboard based on role
    return <Navigate to={`/${user.role.toLowerCase()}/dashboard`} replace />;
  }

  return <>{children}</>;
} 
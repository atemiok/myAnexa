import { createBrowserRouter, Navigate } from 'react-router-dom';
import RequireAuth from './guards/RequireAuth';
import { EmployeeLayout } from './layouts/EmployeeLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { EmployerLayout } from './layouts/EmployerLayout';
import { Dashboard as EmployeeDashboard, RequestAdvance, History } from './employee';
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard';
import { Dashboard as EmployerDashboard } from './pages/employer/Dashboard';
import { Login as AdminLogin } from './pages/Login';
import { EmployeeLogin } from './pages/employee/Login';
import { EmployerLogin } from './pages/employer/Login';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useAuth } from './hooks/useAuth';

// Landing page component
function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Welcome to MyAnexa</h1>
        <p className="mt-2 text-lg text-gray-600">Choose your login portal</p>
        <div className="mt-8 space-y-4">
          <a
            href="/employer/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Employer Login
          </a>
          <a
            href="/employee/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Employee Login
          </a>
          <a
            href="/admin/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Admin Login
          </a>
        </div>
      </div>
    </div>
  );
}

// Root route component to handle initial routing
function RootRoute() {
  const { user, role } = useAuth();
  
  if (!user) {
    return <LandingPage />;
  }

  return <Navigate to={`/${role?.toLowerCase()}/dashboard`} replace />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/employer/login',
    element: <EmployerLogin />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/employee/login',
    element: <EmployeeLogin />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/employee',
    element: (
      <RequireAuth role="employee">
        <EmployeeLayout />
      </RequireAuth>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <EmployeeDashboard /> },
      { path: 'request', element: <RequestAdvance /> },
      { path: 'history', element: <History /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <RequireAuth role="admin">
        <AdminLayout />
      </RequireAuth>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboard /> },
    ],
  },
  {
    path: '/employer',
    element: (
      <RequireAuth role="employer">
        <EmployerLayout />
      </RequireAuth>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <EmployerDashboard /> },
    ],
  },
  {
    path: '*',
    element: <ErrorBoundary />,
  },
]); 
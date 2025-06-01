import { createBrowserRouter, Navigate } from 'react-router-dom';
import RequireAuth from './guards/RequireAuth';
import { EmployeeLayout } from './layouts/EmployeeLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { EmployerLayout } from './layouts/EmployerLayout';
import { Dashboard as EmployeeDashboard, RequestAdvance, History } from './employee';
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard';
import { Dashboard as EmployerDashboard } from './pages/employer/Dashboard';
import { Login } from './pages/Login';
import { ErrorBoundary } from './components/ErrorBoundary';
// ... import other layouts and pages as needed ...

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/login',
    element: <Login />,
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
  // ... other routes ...
]); 
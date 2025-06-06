import { createBrowserRouter, Navigate } from 'react-router-dom';
import { EmployeeLayout } from './layouts/EmployeeLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { EmployerLayout } from './layouts/EmployerLayout';
import { Dashboard as EmployeeDashboard, RequestAdvance, History, Documents, Settings } from './employee';
import { Dashboard as AdminDashboard } from './pages/admin/Dashboard';
import { Companies, LoanRequests, Invoices, ChangeRequests, Settings as AdminSettings } from './pages/admin';
import { Dashboard as EmployerDashboard } from './pages/employer/Dashboard';
import { Requests, EmployeeList, PayrollFinancing, Invoices as EmployerInvoices, Settings as EmployerSettings } from './pages/employer';
import { ErrorBoundary } from './components/ErrorBoundary';

// Root route component to handle initial routing
function RootRoute() {
  // Always redirect to employee dashboard for public access
  return <Navigate to="/employee/dashboard" replace />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/employee',
    element: <EmployeeLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <EmployeeDashboard /> },
      { path: 'request', element: <RequestAdvance /> },
      { path: 'history', element: <History /> },
      { path: 'documents', element: <Documents /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'companies', element: <Companies /> },
      { path: 'loan-requests', element: <LoanRequests /> },
      { path: 'invoices', element: <Invoices /> },
      { path: 'change-requests', element: <ChangeRequests /> },
      { path: 'settings', element: <AdminSettings /> },
    ],
  },
  {
    path: '/employer',
    element: <EmployerLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <EmployerDashboard /> },
      { path: 'requests', element: <Requests /> },
      { path: 'employee-list', element: <EmployeeList /> },
      { path: 'payroll-financing', element: <PayrollFinancing /> },
      { path: 'invoices', element: <EmployerInvoices /> },
      { path: 'settings', element: <EmployerSettings /> },
    ],
  },
  {
    path: '*',
    element: <ErrorBoundary />,
  },
]); 
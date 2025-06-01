import { createBrowserRouter } from 'react-router-dom';
import RequireAuth from './guards/RequireAuth';
import { EmployeeLayout } from './layouts/EmployeeLayout';
import { Dashboard as EmployeeDashboard, RequestAdvance, History } from './employee';
// ... import other layouts and pages as needed ...

export const router = createBrowserRouter([
  // ... other routes ...
  {
    path: '/employee',
    element: (
      <RequireAuth role="employee">
        <EmployeeLayout />
      </RequireAuth>
    ),
    children: [
      { path: 'dashboard', element: <EmployeeDashboard /> },
      { path: 'request', element: <RequestAdvance /> },
      { path: 'history', element: <History /> },
    ],
  },
  // ... other routes ...
]); 
import { Outlet } from 'react-router-dom';
import { Sidebar, Topbar } from '../components';
import {
  HomeIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const routes = [
  { path: '/employer/dashboard', label: 'Dashboard', icon: HomeIcon, roles: ['employer'] },
  { path: '/employer/employees', label: 'Employees', icon: BuildingOfficeIcon, roles: ['employer'] },
  { path: '/employer/loan-requests', label: 'Loan Requests', icon: ClipboardDocumentListIcon, roles: ['employer'] },
  { path: '/employer/documents', label: 'Documents', icon: DocumentTextIcon, roles: ['employer'] },
  { path: '/employer/settings', label: 'Settings', icon: Cog6ToothIcon, roles: ['employer'] },
];

export function EmployerLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar items={routes} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
} 
import { Outlet } from 'react-router-dom';
import { Sidebar, Topbar } from '../components';
import {
  HomeIcon,
  BuildingOfficeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const routes = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: HomeIcon, roles: ['admin'] },
  { path: '/admin/companies', label: 'Companies', icon: BuildingOfficeIcon, roles: ['admin'] },
  { path: '/admin/loan-requests', label: 'Loan Requests', icon: ClipboardDocumentListIcon, roles: ['admin'] },
  { path: '/admin/invoices', label: 'Invoices', icon: DocumentTextIcon, roles: ['admin'] },
  { path: '/admin/change-requests', label: 'Change Requests', icon: ArrowPathIcon, roles: ['admin'] },
  { path: '/admin/settings', label: 'Settings', icon: Cog6ToothIcon, roles: ['admin'] },
];

export function AdminLayout() {
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
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, Topbar } from '../components';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const routes = [
  { path: '/employee/dashboard', label: 'Dashboard', icon: HomeIcon, roles: ['employee'] },
  { path: '/employee/history', label: 'History', icon: ClipboardDocumentListIcon, roles: ['employee'] },
  { path: '/employee/documents', label: 'Documents', icon: DocumentTextIcon, roles: ['employee'] },
  { path: '/employee/settings', label: 'Settings', icon: Cog6ToothIcon, roles: ['employee'] },
];

export default function EmployeeLayout() {
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
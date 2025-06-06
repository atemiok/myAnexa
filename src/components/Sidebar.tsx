import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSession } from '../hooks/useSession';

interface MenuItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

interface SidebarProps {
  items: MenuItem[];
}

export function Sidebar({ items }: SidebarProps) {
  const { role } = useSession();
  const userRole = role || '';
  const location = useLocation();

  const filteredItems = userRole
    ? items.filter(item => item.roles.includes(userRole))
    : items;

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen">
      <div className="flex flex-col h-full">
        <div className="flex-1 py-4">
          <nav className="space-y-1">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
} 
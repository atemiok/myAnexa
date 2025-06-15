import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEmployerDashboard } from '../../hooks/employer/useEmployerDashboard';
import { StatusPill } from '../../components/StatusPill';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FILTERS = [
  { label: 'Month', value: 'month' },
  { label: 'Week', value: 'week' },
  { label: '3 Months', value: '3months' },
  { label: '6 Months', value: '6months' },
  { label: 'Year', value: 'year' },
];

function formatCurrency(val: number) {
  return `KSh ${val.toLocaleString()}`;
}

export function Dashboard() {
  const { data, isLoading } = useEmployerDashboard();
  const [filter, setFilter] = useState(FILTERS[0].value);
  const [showDropdown, setShowDropdown] = useState(false);

  if (isLoading || !data) {
    return (
      <div className="h-screen min-h-screen max-h-screen bg-gray-50 py-6 px-2 md:px-6 font-sans flex flex-col justify-center items-center">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                <div className="h-4 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-4 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { metrics, requestsChart, financingChart, employeeChart, activeRequests } = data;

  const stats = [
    { label: 'Total Employees', value: metrics.totalEmployees, color: 'text-indigo-600' },
    { label: 'Active Employees', value: metrics.activeEmployees || 0, color: 'text-green-600' },
    { label: 'Inactive Employees', value: metrics.inactiveEmployees || 0, color: 'text-gray-400' },
    { label: 'Total Requests', value: metrics.totalRequests || 0, color: 'text-indigo-600' },
    { label: 'Active Requests', value: metrics.activeRequests, color: 'text-green-600' },
    { label: 'Pending Approvals', value: metrics.pendingApprovals, color: 'text-yellow-600' },
    { label: 'Total Financed', value: metrics.totalFinanced, color: 'text-indigo-600', isCurrency: true },
    { label: 'Monthly Growth', value: metrics.monthlyGrowth || 0, color: 'text-green-600', isPercentage: true },
  ];

  return (
    <div className="h-screen min-h-screen max-h-screen bg-gray-50 py-6 px-2 md:px-6 font-sans flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full max-w-6xl h-full flex flex-col gap-4">
        {/* Filter Button */}
        <div className="flex justify-end mb-2 relative">
          <button
            className="px-4 py-2 bg-white rounded-xl shadow text-gray-700 font-medium flex items-center gap-2 hover:bg-gray-100 border border-gray-200"
            onClick={() => setShowDropdown((v) => !v)}
          >
            Filter: <span className="text-indigo-600">{FILTERS.find(f => f.value === filter)?.label}</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-12 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 ${filter === f.value ? 'bg-indigo-100 font-semibold text-indigo-700' : ''}`}
                  onClick={() => { setFilter(f.value); setShowDropdown(false); }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 min-h-0">
          {/* 1. Statistics Summary */}
          <div className="bg-white rounded-2xl shadow p-3 flex flex-col items-center min-w-[220px] w-full h-full justify-center">
            <h2 className="text-base font-bold text-gray-800 mb-1">Statistics Summary</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full text-xs">
              {stats.map((stat) => (
                <React.Fragment key={stat.label}>
                  <span className="text-gray-500 text-right pr-2 whitespace-nowrap">{stat.label}:</span>
                  <span className={`font-semibold ${stat.color} text-left pl-2`}>
                    {stat.isCurrency ? formatCurrency(stat.value) : 
                     stat.isPercentage ? `${stat.value}%` : 
                     stat.value.toLocaleString()}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 2. Request Trends */}
          <div className="bg-white rounded-2xl shadow p-3 flex flex-col h-full">
            <h3 className="text-base font-semibold text-gray-700 mb-1">Request Trends <span className="ml-2 text-xs text-indigo-500">[{FILTERS.find(f => f.value === filter)?.label}]</span></h3>
            <div className="flex-1 min-h-0">
              <Bar 
                data={requestsChart} 
                options={{ 
                  maintainAspectRatio: false, 
                  plugins: { legend: { position: 'top' }, tooltip: { enabled: true } }, 
                  scales: { y: { beginAtZero: true } } 
                }} 
                height={120} 
              />
            </div>
          </div>

          {/* 3. Financing Overview */}
          <div className="bg-white rounded-2xl shadow p-3 flex flex-col h-full">
            <h3 className="text-base font-semibold text-gray-700 mb-1">Financing Overview <span className="ml-2 text-xs text-indigo-500">[{FILTERS.find(f => f.value === filter)?.label}]</span></h3>
            <div className="flex-1 min-h-0">
              <Bar 
                data={financingChart} 
                options={{ 
                  maintainAspectRatio: false, 
                  plugins: { legend: { position: 'top' }, tooltip: { enabled: true } }, 
                  scales: { y: { beginAtZero: true } } 
                }} 
                height={120} 
              />
            </div>
          </div>

          {/* 4. Employee Growth */}
          <div className="bg-white rounded-2xl shadow p-3 flex flex-col h-full">
            <h3 className="text-base font-semibold text-gray-700 mb-1">Employee Growth <span className="ml-2 text-xs text-indigo-500">[{FILTERS.find(f => f.value === filter)?.label}]</span></h3>
            <div className="flex-1 min-h-0">
              <Bar 
                data={employeeChart} 
                options={{ 
                  maintainAspectRatio: false, 
                  plugins: { legend: { position: 'top' }, tooltip: { enabled: true } }, 
                  scales: { y: { beginAtZero: true } } 
                }} 
                height={120} 
              />
            </div>
          </div>

          {/* 5. Active Requests */}
          <div className="bg-white rounded-2xl shadow p-3 flex flex-col h-full md:col-span-2">
            <h3 className="text-base font-semibold text-gray-700 mb-1">Active Requests</h3>
            <div className="flex-1 min-h-0 overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{request.employeeName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize">{request.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatCurrency(request.amount)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusPill status={request.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(request.requestDate).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 
import * as React from 'react';
import { useEmployeeDashboard, EmployeeRequest } from '../hooks/employee/useEmployeeDashboard';
import { StatusPill } from '../components/StatusPill';
import { Status } from '../components/StatusPill';

export function Dashboard() {
  const { data, isLoading } = useEmployeeDashboard();

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const { metrics, recentRequests } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Remaining Limit</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">${metrics.remainingLimit}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Outstanding</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">${metrics.outstanding}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Next Due Date</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{new Date(metrics.nextDueDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Requests</h3>
        </div>
        <div className="border-t border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentRequests.map((req: EmployeeRequest) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{req.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusPill status={req.status as Status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{new Date(req.requestDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{req.purpose}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 
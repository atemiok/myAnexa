import { useEmployerDashboard, ActiveRequest } from '../../hooks/employer/useEmployerDashboard';
import { ChartCard } from '../../components/ChartCard';
import { StatusPill } from '../../components/StatusPill';

export function Dashboard() {
  const { data, isLoading } = useEmployerDashboard();

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const { metrics, requestsChart, financingChart, employeeChart, activeRequests } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Employees</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{metrics.totalEmployees}</p>
          <div className="mt-2">
            <StatusPill status="active" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Requests</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{metrics.activeRequests}</p>
          <div className="mt-2">
            <StatusPill status="pending" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending Approvals</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{metrics.pendingApprovals}</p>
          <div className="mt-2">
            <StatusPill status="pending" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Financed</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">${metrics.totalFinanced.toLocaleString()}</p>
          <div className="mt-2">
            <StatusPill status="active" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Request Trends"
          data={requestsChart}
          type="line"
        />
        <ChartCard
          title="Financing Overview"
          data={financingChart}
          type="line"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Employee Growth"
          data={employeeChart}
          type="bar"
        />
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Active Requests</h3>
          </div>
          <div className="border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activeRequests.map((request: ActiveRequest) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{request.employeeName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{request.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${request.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusPill status={request.status === 'declined' ? 'rejected' : request.status} />
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
      </div>
    </div>
  );
} 
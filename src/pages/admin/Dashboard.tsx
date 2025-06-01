import { useAdminDashboard } from '../../hooks/admin/useAdminDashboard';
import { ChartCard } from '../../components/ChartCard';
import { StatusPill } from '../../components/StatusPill';

export function Dashboard() {
  const { data, isLoading } = useAdminDashboard();

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const { metrics, revenueChart, loansChart, companiesChart, requestsChart } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Companies</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{metrics.totalCompanies}</p>
          <div className="mt-2">
            <StatusPill status="active" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Loans</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{metrics.activeLoans}</p>
          <div className="mt-2">
            <StatusPill status="active" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{metrics.pendingRequests}</p>
          <div className="mt-2">
            <StatusPill status="pending" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">${metrics.totalRevenue.toLocaleString()}</p>
          <div className="mt-2">
            <StatusPill status="active" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Loan Distribution"
          data={loansChart}
          type="pie"
        />
        <ChartCard
          title="Revenue Trend"
          data={revenueChart}
          type="line"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Company Growth"
          data={companiesChart}
          type="bar"
        />
        <ChartCard
          title="Request Status"
          data={requestsChart}
          type="doughnut"
        />
      </div>
    </div>
  );
} 
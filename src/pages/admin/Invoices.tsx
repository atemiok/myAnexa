import { useState } from 'react';
import { useInvoices, InvoiceStatus } from '../../hooks/admin/useInvoices';
import { StatusPill } from '../../components/StatusPill';

export function Invoices() {
  const [status, setStatus] = useState<InvoiceStatus | undefined>();
  const [groupByCompany, setGroupByCompany] = useState(false);

  const { data, isLoading } = useInvoices(status, groupByCompany);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const { invoices, stats } = data;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Invoices</h1>
        <div className="flex gap-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={status || ''}
            onChange={(e) => setStatus(e.target.value as InvoiceStatus || undefined)}
          >
            <option value="">All Status</option>
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="late">Late</option>
            <option value="partial">Partial</option>
            <option value="bad_debt">Bad Debt</option>
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={groupByCompany}
              onChange={(e) => setGroupByCompany(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Group by Company</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Unpaid</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.unpaid}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Paid</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.paid}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Late</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.late}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Partial</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.partial}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Bad Debt</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.badDebt}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paid Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remaining
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{invoice.invoiceNumber}</div>
                  <div className="text-sm text-gray-500">{invoice.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{invoice.companyName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${invoice.amount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusPill status={invoice.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${invoice.paidAmount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${invoice.remainingAmount.toLocaleString()}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 
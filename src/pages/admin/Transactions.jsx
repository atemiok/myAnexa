import React, { useState } from 'react';
// Import shadcn UI components as needed (replace with your actual imports)
// import { Card, Select, Input, Checkbox, Calendar, Pagination, Avatar } from 'shadcn-ui';

const FEATURES = [
  'Advance Request',
  'Utility Payment',
  'Wagelyft Wallet',
  'Loan Request',
  'Advance Repayment',
];
const COMPANIES = ['All Companies', 'Acme Corp', 'Beta Ltd'];
const USERS = ['All Users', 'John Doe', 'Jane Smith'];
const STATUSES = ['All', 'Paid', 'Pending', 'Failed'];

const TABLE_COLUMNS = [
  { key: 'employeeName', label: 'Employee Name' },
  { key: 'company', label: 'Company' },
  { key: 'feature', label: 'Feature' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'createdAt', label: 'Created At' },
];

const MOCK_TRANSACTIONS = [
  { id: '1', employeeName: 'John Doe', company: 'Acme Corp', feature: 'Advance Request', amount: 12000, status: 'Paid', createdAt: '2024-06-01' },
  { id: '2', employeeName: 'Jane Smith', company: 'Beta Ltd', feature: 'Utility Payment', amount: 8000, status: 'Pending', createdAt: '2024-06-02' },
  { id: '3', employeeName: 'Mike Johnson', company: 'Gamma Inc', feature: 'Wagelyft Wallet', amount: 5000, status: 'Paid', createdAt: '2024-06-03' },
  { id: '4', employeeName: 'Sarah Wilson', company: 'Delta Group', feature: 'Loan Request', amount: 20000, status: 'Failed', createdAt: '2024-06-04' },
  { id: '5', employeeName: 'David Brown', company: 'Acme Corp', feature: 'Advance Repayment', amount: 7000, status: 'Paid', createdAt: '2024-06-05' },
  { id: '6', employeeName: 'Alice Blue', company: 'Beta Ltd', feature: 'Advance Request', amount: 9000, status: 'Paid', createdAt: '2024-06-06' },
  { id: '7', employeeName: 'Bob Green', company: 'Gamma Inc', feature: 'Utility Payment', amount: 11000, status: 'Pending', createdAt: '2024-06-07' },
  { id: '8', employeeName: 'Carol Red', company: 'Delta Group', feature: 'Wagelyft Wallet', amount: 6000, status: 'Paid', createdAt: '2024-06-08' },
  { id: '9', employeeName: 'Eve White', company: 'Acme Corp', feature: 'Loan Request', amount: 15000, status: 'Failed', createdAt: '2024-06-09' },
  { id: '10', employeeName: 'Frank Black', company: 'Beta Ltd', feature: 'Advance Repayment', amount: 7500, status: 'Paid', createdAt: '2024-06-10' },
];

export default function Transactions() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = Math.ceil(MOCK_TRANSACTIONS.length / pageSize) || 1;

  // Pagination
  const paginated = MOCK_TRANSACTIONS.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-blue-light flex flex-col animate-fade-in">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-navy tracking-tight">Transactions</h1>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full border-2 border-sky-blue bg-gradient-to-br from-sky-blue to-mint flex items-center justify-center text-white font-bold text-lg shadow">
            WA
          </div>
          <span className="font-semibold text-navy text-base">William Atemi</span>
        </div>
      </header>
      <main className="flex-1 flex flex-col md:flex-row gap-8 px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">
        {/* Table Section */}
        <section className="flex-1 flex flex-col gap-6">
          {/* Total Amount Card */}
          <div className="rounded-xl bg-gradient-to-r from-sky-blue to-mint shadow-lg px-8 py-5 flex items-center mb-2">
            <span className="text-xl font-extrabold text-white tracking-wide uppercase">Total Amount</span>
            <span className="ml-4 text-3xl font-extrabold text-white">KSh 0</span>
          </div>
          <div className="card p-0 overflow-x-auto shadow-lg rounded-2xl">
            <table className="min-w-full divide-y divide-gray-200 rounded-2xl">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {TABLE_COLUMNS.map(col => (
                    <th
                      key={col.key}
                      className="px-6 py-3 text-left text-xs font-semibold text-slate tracking-wider uppercase"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate text-lg">No Transactions</td>
                  </tr>
                ) : (
                  paginated.map(tx => (
                    <tr key={tx.id} className="hover:bg-indigo-50 cursor-pointer transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.employeeName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.feature}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">KSh {tx.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={
                            (tx.status === 'Paid'
                              ? 'bg-green-100 text-green-800'
                              : tx.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800') +
                            ' inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium'
                          }
                          style={{ minWidth: '90px', display: 'inline-block', textAlign: 'center' }}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tx.createdAt}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-4 border-t bg-gray-50 rounded-b-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate">Rows per page:</span>
                <select
                  className="input w-20 focus:ring-2 focus:ring-sky-blue focus:border-sky-blue hover:border-sky-blue"
                  value={pageSize}
                  onChange={e => setPageSize(Number(e.target.value))}
                >
                  {[10, 20, 50].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate">Page No:</span>
                <span className="text-xs text-navy font-semibold">{page}</span>
                <span className="text-xs text-slate">of {totalPages}</span>
                <button
                  className="btn btn-secondary px-2 rounded-full hover:bg-sky-blue/10"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  &lt;
                </button>
                <button
                  className="btn btn-secondary px-2 rounded-full hover:bg-sky-blue/10"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Filters Section */}
        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="card p-6 space-y-6 sticky top-8 shadow-lg rounded-2xl border border-slate/10 bg-white/90">
            <h2 className="text-lg font-bold mb-2 text-navy">Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="label mb-1">Company</label>
                <select className="input w-full focus:ring-2 focus:ring-sky-blue focus:border-sky-blue hover:border-sky-blue" value={filters.company || ''} onChange={e => setFilters({ ...filters, company: e.target.value })}>
                  {COMPANIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label mb-1">User</label>
                <select className="input w-full focus:ring-2 focus:ring-sky-blue focus:border-sky-blue hover:border-sky-blue" value={filters.user || ''} onChange={e => setFilters({ ...filters, user: e.target.value })}>
                  {USERS.map(u => <option key={u}>{u}</option>)}
                </select>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="label mb-1">Min Amount</label>
                  <input type="number" className="input w-full focus:ring-2 focus:ring-sky-blue focus:border-sky-blue hover:border-sky-blue" placeholder="Min" value={filters.minAmount || ''} onChange={e => setFilters({ ...filters, minAmount: e.target.value })} />
                </div>
                <div className="flex-1">
                  <label className="label mb-1">Max Amount</label>
                  <input type="number" className="input w-full focus:ring-2 focus:ring-sky-blue focus:border-sky-blue hover:border-sky-blue" placeholder="Max" value={filters.maxAmount || ''} onChange={e => setFilters({ ...filters, maxAmount: e.target.value })} />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="label mb-1">From</label>
                  <input type="date" className="input w-full focus:ring-2 focus:ring-sky-blue focus:border-sky-blue hover:border-sky-blue" value={filters.from || ''} onChange={e => setFilters({ ...filters, from: e.target.value })} />
                </div>
                <div className="flex-1">
                  <label className="label mb-1">To</label>
                  <input type="date" className="input w-full focus:ring-2 focus:ring-sky-blue focus:border-sky-blue hover:border-sky-blue" value={filters.to || ''} onChange={e => setFilters({ ...filters, to: e.target.value })} />
                </div>
              </div>
              <div className="border-t border-slate/10 pt-4">
                <label className="label mb-1">Feature</label>
                <div className="flex flex-col gap-1">
                  {FEATURES.map(f => (
                    <label key={f} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={filters.feature === f}
                        onChange={() => setFilters({ ...filters, feature: filters.feature === f ? '' : f })}
                        className="rounded border-gray-300 text-sky-blue focus:ring-sky-blue"
                      />
                      {f}
                    </label>
                  ))}
                </div>
              </div>
              <div className="border-t border-slate/10 pt-4">
                <label className="label mb-1">Payment Status</label>
                <select className="input w-full focus:ring-2 focus:ring-sky-blue focus:border-sky-blue hover:border-sky-blue" value={filters.status || ''} onChange={e => setFilters({ ...filters, status: e.target.value })}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
} 
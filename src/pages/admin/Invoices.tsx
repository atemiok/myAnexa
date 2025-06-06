import React, { useState, useMemo } from 'react';
import { EllipsisVerticalIcon, FunnelIcon } from '@heroicons/react/24/outline';

const TABS = [
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Paid', value: 'paid' },
  { label: 'Late Payment', value: 'late' },
  { label: 'Partial Paid', value: 'partial' },
  { label: 'Bad Debt', value: 'baddebt' },
];

const MONTHS = [
  'All Months', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MOCK_INVOICES = [
  {
    id: 'INV-001', company: 'Acme Corp', generated: '2024-06-01', due: '2024-06-15', followup: '2024-06-10', amount: 120000, lateFee: 0, overdue: '2 days', status: 'unpaid',
  },
  {
    id: 'INV-002', company: 'Beta Ltd', generated: '2024-05-20', due: '2024-06-05', followup: '2024-06-06', amount: 45000, lateFee: 2000, overdue: '1 day', status: 'late',
  },
  {
    id: 'INV-003', company: 'Gamma Inc', generated: '2024-05-10', due: '2024-05-25', followup: '2024-05-30', amount: 50000, lateFee: 0, overdue: 'N/A', status: 'paid',
  },
  {
    id: 'INV-004', company: 'Delta Group', generated: '2024-04-15', due: '2024-05-01', followup: '2024-05-10', amount: 200000, lateFee: 5000, overdue: '10 days', status: 'late',
  },
  {
    id: 'INV-005', company: 'Epsilon LLC', generated: '2024-06-01', due: '2024-06-10', followup: '2024-06-09', amount: 60000, lateFee: 0, overdue: 'N/A', status: 'partial',
  },
  {
    id: 'INV-006', company: 'Zeta Holdings', generated: '2024-05-01', due: '2024-05-15', followup: '2024-05-20', amount: 90000, lateFee: 0, overdue: 'N/A', status: 'paid',
  },
  {
    id: 'INV-007', company: 'Eta Solutions', generated: '2024-04-10', due: '2024-04-25', followup: '2024-05-01', amount: 77000, lateFee: 0, overdue: 'N/A', status: 'baddebt',
  },
  {
    id: 'INV-008', company: 'Theta Partners', generated: '2024-06-01', due: '2024-06-15', followup: '2024-06-12', amount: 150000, lateFee: 0, overdue: 'N/A', status: 'unpaid',
  },
  {
    id: 'INV-009', company: 'Iota Ventures', generated: '2024-05-10', due: '2024-05-25', followup: '2024-05-28', amount: 30000, lateFee: 0, overdue: 'N/A', status: 'partial',
  },
  {
    id: 'INV-010', company: 'Kappa Group', generated: '2024-04-01', due: '2024-04-15', followup: '2024-04-20', amount: 110000, lateFee: 0, overdue: 'N/A', status: 'paid',
  },
  {
    id: 'INV-011', company: 'Lambda Inc', generated: '2024-03-10', due: '2024-03-25', followup: '2024-03-30', amount: 80000, lateFee: 0, overdue: 'N/A', status: 'paid',
  },
  {
    id: 'INV-012', company: 'Mu Ltd', generated: '2024-02-01', due: '2024-02-15', followup: '2024-02-20', amount: 95000, lateFee: 0, overdue: 'N/A', status: 'baddebt',
  },
  {
    id: 'INV-013', company: 'Nu Partners', generated: '2024-01-10', due: '2024-01-25', followup: '2024-01-30', amount: 67000, lateFee: 0, overdue: 'N/A', status: 'paid',
  },
  {
    id: 'INV-014', company: 'Xi Ventures', generated: '2024-06-01', due: '2024-06-15', followup: '2024-06-13', amount: 120000, lateFee: 0, overdue: 'N/A', status: 'unpaid',
  },
];

const PAGE_SIZE = 7;

function formatCurrency(val) {
  return val == null ? 'N/A' : `KSh ${val.toLocaleString()}`;
}

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-CA', { month: '2-digit', day: '2-digit', year: 'numeric' });
}

export function Invoices() {
  const [tab, setTab] = useState('unpaid');
  const [search, setSearch] = useState('');
  const [groupBy, setGroupBy] = useState(false);
  const [page, setPage] = useState(1);
  const [monthFilter, setMonthFilter] = useState('All Months');
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // for 3-dot menu

  const filtered = useMemo(() => {
    let data = MOCK_INVOICES;
    if (tab !== 'all') {
      data = data.filter(inv => inv.status === tab);
    }
    if (monthFilter !== 'All Months') {
      data = data.filter(inv => {
        const d = new Date(inv.generated);
        return d.toLocaleString('en-US', { month: 'long' }) === monthFilter;
      });
    }
    if (search.trim()) {
      data = data.filter(inv =>
        inv.company.toLowerCase().includes(search.trim().toLowerCase()) ||
        inv.id.toLowerCase().includes(search.trim().toLowerCase())
      );
    }
    return data;
  }, [tab, search, groupBy, monthFilter]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
        <div className="flex gap-2 items-center">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 font-medium">Download Invoices List</button>
          <label className="flex items-center gap-2 ml-4 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={groupBy}
              onChange={e => setGroupBy(e.target.checked)}
              className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
            />
            <span className="text-sm text-gray-700">Group by company name</span>
          </label>
        </div>
      </div>
      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow p-6">
        {/* Table Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
          <h2 className="text-lg font-semibold text-gray-800">Recent Invoices</h2>
          <div className="flex gap-2 items-center w-full md:w-auto relative">
            <div className="relative w-full max-w-xs">
              <input
                className="w-full px-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                placeholder="Search by Company Name or Invoice ID"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
              <button
                type="button"
                className="absolute right-2 top-2.5 p-1 rounded hover:bg-indigo-50"
                onClick={() => setShowMonthDropdown(v => !v)}
              >
                <FunnelIcon className="w-5 h-5 text-gray-400" />
              </button>
              {showMonthDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
                  {MONTHS.map(m => (
                    <button
                      key={m}
                      className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 ${monthFilter === m ? 'bg-indigo-100 font-semibold text-indigo-700' : ''}`}
                      onClick={() => { setMonthFilter(m); setShowMonthDropdown(false); setPage(1); }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500 ml-2">{monthFilter}</span>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-2 mb-4 border-b border-gray-100">
          {TABS.map(t => (
            <button
              key={t.value}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition focus:outline-none ${tab === t.value ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-600'}`}
              onClick={() => { setTab(t.value); setPage(1); }}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Invoice ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Company Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Invoice Generated For</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Due Date</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Last Follow-up</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Payable Amount</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Late Fee</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Overdue Time</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {paged.map((inv, idx) => (
                <tr key={inv.id + idx} className="hover:bg-indigo-50 transition">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{inv.id}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{inv.company}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{formatDate(inv.generated)}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{formatDate(inv.due)}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{formatDate(inv.followup)}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{formatCurrency(inv.amount)}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{inv.lateFee ? formatCurrency(inv.lateFee) : 'N/A'}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{inv.overdue || 'N/A'}</td>
                  <td className="px-4 py-3 text-right relative">
                    <button onClick={() => setOpenMenu(openMenu === inv.id ? null : inv.id)}>
                      <EllipsisVerticalIcon className="w-5 h-5 text-gray-400 cursor-pointer" />
                    </button>
                    {openMenu === inv.id && (
                      <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-gray-200 z-20">
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50" onClick={() => { setOpenMenu(null); alert('Resend clicked!'); }}>Resend</button>
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50" onClick={() => { setOpenMenu(null); alert('View clicked!'); }}>View</button>
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50" onClick={() => { setOpenMenu(null); alert('Mark as Paid clicked!'); }}>Mark as Paid</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-400">No invoices found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>
            {filtered.length === 0
              ? '0 results'
              : `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 rounded-lg border border-gray-200 bg-white shadow-sm disabled:opacity-50"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <button
              className="px-3 py-1 rounded-lg border border-gray-200 bg-white shadow-sm disabled:opacity-50"
              onClick={() => setPage(p => Math.min(pageCount, p + 1))}
              disabled={page === pageCount || pageCount === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
import React, { useState, useMemo } from 'react';

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Drafts', value: 'drafts' },
  { label: 'Unverified', value: 'unverified' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Disabled', value: 'disabled' },
  { label: 'Deactivated', value: 'deactivated' },
];

const MOCK_COMPANIES = [
  {
    name: 'Acme Corp', employees: 120, adminEmail: 'admin@acme.com', adminPhone: '0712345678', status: 'Verified', lastInvoice: 120000, paymentStatus: 'Paid', activationStatus: 'Active', joinDate: '2023-01-15',
  },
  {
    name: 'Beta Ltd', employees: 45, adminEmail: 'beta@beta.com', adminPhone: '0723456789', status: 'Unverified', lastInvoice: null, paymentStatus: 'Pending', activationStatus: 'Active', joinDate: '2022-11-10',
  },
  {
    name: 'Gamma Inc', employees: 80, adminEmail: 'gamma@gamma.com', adminPhone: '0734567890', status: 'Rejected', lastInvoice: 50000, paymentStatus: 'Paid', activationStatus: 'Deactivated', joinDate: '2021-06-22',
  },
  {
    name: 'Delta Group', employees: 200, adminEmail: 'delta@delta.com', adminPhone: '0745678901', status: 'Verified', lastInvoice: 200000, paymentStatus: 'Pending', activationStatus: 'Active', joinDate: '2020-09-30',
  },
  {
    name: 'Epsilon LLC', employees: 60, adminEmail: 'epsilon@epsilon.com', adminPhone: '0756789012', status: 'Unverified', lastInvoice: null, paymentStatus: 'Pending', activationStatus: 'Disabled', joinDate: '2023-03-12',
  },
  {
    name: 'Zeta Holdings', employees: 33, adminEmail: 'zeta@zeta.com', adminPhone: '0767890123', status: 'Verified', lastInvoice: 90000, paymentStatus: 'Paid', activationStatus: 'Active', joinDate: '2022-07-19',
  },
  {
    name: 'Eta Solutions', employees: 77, adminEmail: 'eta@eta.com', adminPhone: '0778901234', status: 'Drafts', lastInvoice: null, paymentStatus: 'Pending', activationStatus: 'Deactivated', joinDate: '2021-12-01',
  },
  {
    name: 'Theta Partners', employees: 150, adminEmail: 'theta@theta.com', adminPhone: '0789012345', status: 'Verified', lastInvoice: 150000, paymentStatus: 'Paid', activationStatus: 'Active', joinDate: '2022-02-28',
  },
  {
    name: 'Iota Ventures', employees: 20, adminEmail: 'iota@iota.com', adminPhone: '0790123456', status: 'Unpaid', lastInvoice: 30000, paymentStatus: 'Pending', activationStatus: 'Disabled', joinDate: '2023-05-05',
  },
];

const PAGE_SIZE = 5;

function formatCurrency(val) {
  return val == null ? 'N/A' : `KSh ${val.toLocaleString()}`;
}

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString('en-CA', { month: '2-digit', day: '2-digit', year: 'numeric' });
}

export function Companies() {
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Filtered companies
  const filtered = useMemo(() => {
    let data = MOCK_COMPANIES;
    if (tab !== 'all') {
      data = data.filter(c => (c.status || '').toLowerCase() === tab);
    }
    if (search.trim()) {
      data = data.filter(c => c.name.toLowerCase().includes(search.trim().toLowerCase()));
    }
    return data;
  }, [tab, search]);

  const totalCompanies = filtered.length;
  const totalEmployees = filtered.reduce((sum, c) => sum + c.employees, 0);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Companies</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 font-medium">Add Company</button>
          <button className="px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-xl shadow hover:bg-indigo-50 font-medium">Employees Quick Search</button>
        </div>
      </div>
      {/* Tabs and Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
        <div className="flex gap-2 flex-wrap">
          {TABS.map(t => (
            <button
              key={t.value}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition ${tab === t.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-indigo-50'}`}
              onClick={() => { setTab(t.value); setPage(1); }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex gap-4 items-center text-sm text-gray-500">
          <span>Total Companies: <span className="font-semibold text-gray-800">{totalCompanies}</span></span>
          <span>Total Employees: <span className="font-semibold text-gray-800">{totalEmployees}</span></span>
        </div>
      </div>
      {/* Search */}
      <div className="mb-4 flex justify-between items-center">
        <input
          className="w-full max-w-xs px-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
          placeholder="Search by Company Name"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>
      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-0 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Company Name</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">No. of Employees</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Admin Email</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Admin Phone Number</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Last Invoice</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Payment Status</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Activation Status</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Join Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paged.map((c, idx) => (
              <tr key={c.name + idx} className="hover:bg-indigo-50 transition">
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{c.name}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{c.employees}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{c.adminEmail}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{c.adminPhone}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    c.status === 'Verified' ? 'bg-green-100 text-green-700' :
                    c.status === 'Unverified' ? 'bg-yellow-100 text-yellow-700' :
                    c.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    c.status === 'Drafts' ? 'bg-gray-100 text-gray-500' :
                    c.status === 'Unpaid' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>{c.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{formatCurrency(c.lastInvoice)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    c.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                    c.paymentStatus === 'Pending' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>{c.paymentStatus}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    c.activationStatus === 'Active' ? 'bg-green-100 text-green-700' :
                    c.activationStatus === 'Deactivated' ? 'bg-red-100 text-red-700' :
                    c.activationStatus === 'Disabled' ? 'bg-gray-100 text-gray-500' :
                    'bg-gray-100 text-gray-700'
                  }`}>{c.activationStatus}</span>
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{formatDate(c.joinDate)}</td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-gray-400">No companies found.</td>
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
  );
} 
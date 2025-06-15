import React, { useMemo, useState } from 'react';

interface Transaction {
  id: string;
  employeeName: string;
  company: string;
  feature: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface TransactionsTableProps {
  filters: any;
  onRowClick: (transaction: Transaction) => void;
}

// Mock data for demo
const transactions: Transaction[] = [
  {
    id: '1',
    employeeName: 'John Doe',
    company: 'Acme Corp',
    feature: 'Advance Request',
    amount: 12000,
    status: 'Paid',
    createdAt: '2024-06-01',
  },
  {
    id: '2',
    employeeName: 'Jane Smith',
    company: 'Beta Ltd',
    feature: 'Utility Payment',
    amount: 8000,
    status: 'Pending',
    createdAt: '2024-06-02',
  },
  {
    id: '3',
    employeeName: 'Mike Johnson',
    company: 'Gamma Inc',
    feature: 'Wallet',
    amount: 5000,
    status: 'Paid',
    createdAt: '2024-06-03',
  },
  {
    id: '4',
    employeeName: 'Sarah Wilson',
    company: 'Delta Group',
    feature: 'Loan Request',
    amount: 20000,
    status: 'Failed',
    createdAt: '2024-06-04',
  },
  {
    id: '5',
    employeeName: 'David Brown',
    company: 'Acme Corp',
    feature: 'Advance Repayment',
    amount: 7000,
    status: 'Paid',
    createdAt: '2024-06-05',
  },
  {
    id: '6',
    employeeName: 'Alice Blue',
    company: 'Beta Ltd',
    feature: 'Advance Request',
    amount: 9000,
    status: 'Paid',
    createdAt: '2024-06-06',
  },
  {
    id: '7',
    employeeName: 'Bob Green',
    company: 'Gamma Inc',
    feature: 'Utility Payment',
    amount: 11000,
    status: 'Pending',
    createdAt: '2024-06-07',
  },
  {
    id: '8',
    employeeName: 'Carol Red',
    company: 'Delta Group',
    feature: 'Wallet',
    amount: 6000,
    status: 'Paid',
    createdAt: '2024-06-08',
  },
  {
    id: '9',
    employeeName: 'Eve White',
    company: 'Acme Corp',
    feature: 'Loan Request',
    amount: 15000,
    status: 'Failed',
    createdAt: '2024-06-09',
  },
  {
    id: '10',
    employeeName: 'Frank Black',
    company: 'Beta Ltd',
    feature: 'Advance Repayment',
    amount: 7500,
    status: 'Paid',
    createdAt: '2024-06-10',
  },
];

const PAGE_SIZE_OPTIONS = [5, 10, 20];

export function TransactionsTable({ filters, onRowClick }: TransactionsTableProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Filtering logic
  const filtered = useMemo(() => {
    return transactions.filter(tx => {
      if (filters.company && filters.company !== 'All Companies' && tx.company !== filters.company) return false;
      if (filters.user && filters.user !== 'All Users' && tx.employeeName !== filters.user) return false;
      if (filters.feature && filters.feature !== '' && tx.feature !== filters.feature) return false;
      if (filters.status && filters.status !== 'All' && tx.status !== filters.status) return false;
      if (filters.minAmount && tx.amount < Number(filters.minAmount)) return false;
      if (filters.maxAmount && tx.amount > Number(filters.maxAmount)) return false;
      if (filters.from && tx.createdAt < filters.from) return false;
      if (filters.to && tx.createdAt > filters.to) return false;
      return true;
    });
  }, [filters]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Reset page if filters or pageSize change
  React.useEffect(() => {
    setPage(1);
  }, [filters, pageSize]);

  return (
    <div className="card">
      <div className="card-body p-0">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">No transactions found.</td>
              </tr>
            ) : (
              paginated.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-indigo-50 cursor-pointer transition"
                  onClick={() => onRowClick(tx)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.employeeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.feature}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">KSh {tx.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`badge ${tx.status === 'Paid' ? 'badge-success' : tx.status === 'Pending' ? 'badge-info' : 'badge-error'}`}>{tx.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.createdAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Pagination controls */}
        <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Rows per page:</span>
            <select
              className="input w-20"
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
            >
              {PAGE_SIZE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-secondary px-2"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              &lt;
            </button>
            <span className="text-xs text-gray-500">
              Page {page} of {totalPages}
            </span>
            <button
              className="btn btn-secondary px-2"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
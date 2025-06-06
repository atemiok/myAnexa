import React, { useState, useMemo } from 'react';

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Running', value: 'running' },
];

type LoanStatus = 'Confirmed' | 'Running' | 'Fully Paid' | 'Declined';

type LoanRequest = {
  id: string;
  employee: string;
  nationalId: string;
  company: string;
  amount: number;
  monthlyInterest: number; // percent
  monthlyInterestAmount: number;
  repaymentDuration: number; // months
  monthlyInstallment: number;
  processingFee: number; // percent
  processingFeeAmount: number;
  status: LoanStatus;
  declineReason: string | null;
  disbursedAt: string | null;
  createdAt: string;
  details: string;
  idCardFrontUrl: string;
  idCardBackUrl: string;
  payslips: string[]; // URLs
  kycApproved?: boolean; // for demo
};

const MOCK_REQUESTS: LoanRequest[] = [
  {
    id: 'REQ-001', employee: 'Julius Kiplagat', nationalId: '13633780', company: 'UWEPO SACCO', amount: 20202, monthlyInterest: 5, monthlyInterestAmount: 1010, repaymentDuration: 3, monthlyInstallment: 7744, processingFee: 1, processingFeeAmount: 202, status: 'Confirmed', declineReason: null, disbursedAt: null, createdAt: '2024-05-20', details: 'Loan for medical emergency.', idCardFrontUrl: 'https://placehold.co/80x50?text=ID+Front', idCardBackUrl: 'https://placehold.co/80x50?text=ID+Back', payslips: ['https://placehold.co/32x32?text=P1', 'https://placehold.co/32x32?text=P2', 'https://placehold.co/32x32?text=P3'], kycApproved: false,
  },
  {
    id: 'REQ-002', employee: 'Jane Smith', nationalId: '12345678', company: 'Beta Ltd', amount: 30000, monthlyInterest: 4, monthlyInterestAmount: 1200, repaymentDuration: 6, monthlyInstallment: 5200, processingFee: 1, processingFeeAmount: 300, status: 'Running', declineReason: null, disbursedAt: '2024-05-15', createdAt: '2024-05-01', details: 'Loan for school fees.', idCardFrontUrl: 'https://placehold.co/80x50?text=ID+Front', idCardBackUrl: 'https://placehold.co/80x50?text=ID+Back', payslips: ['https://placehold.co/32x32?text=P1', 'https://placehold.co/32x32?text=P2', 'https://placehold.co/32x32?text=P3'], kycApproved: true,
  },
  {
    id: 'REQ-003', employee: 'Alice Johnson', nationalId: '87654321', company: 'Gamma Inc', amount: 20000, monthlyInterest: 3, monthlyInterestAmount: 600, repaymentDuration: 4, monthlyInstallment: 5400, processingFee: 1, processingFeeAmount: 200, status: 'Fully Paid', declineReason: null, disbursedAt: '2024-04-10', createdAt: '2024-03-10', details: 'Loan for rent.', idCardFrontUrl: 'https://placehold.co/80x50?text=ID+Front', idCardBackUrl: 'https://placehold.co/80x50?text=ID+Back', payslips: ['https://placehold.co/32x32?text=P1', 'https://placehold.co/32x32?text=P2', 'https://placehold.co/32x32?text=P3'], kycApproved: true,
  },
  {
    id: 'REQ-004', employee: 'Bob Lee', company: 'Delta Group', amount: 45000, status: 'Running', declineReason: null, disbursedAt: '2024-06-05', createdAt: '2024-05-25', details: 'Loan for car repair.',
  },
  {
    id: 'REQ-005', employee: 'Carol King', company: 'Epsilon LLC', amount: 15000, status: 'Confirmed', declineReason: null, disbursedAt: '2024-05-10', createdAt: '2024-04-28', details: 'Loan for home improvement.',
  },
  {
    id: 'REQ-006', employee: 'David Kim', company: 'Zeta Holdings', amount: 60000, status: 'Running', declineReason: null, disbursedAt: '2024-06-10', createdAt: '2024-05-30', details: 'Loan for business expansion.',
  },
  {
    id: 'REQ-007', employee: 'Eva Green', company: 'Eta Solutions', amount: 25000, status: 'Declined', declineReason: 'Low credit score', disbursedAt: null, createdAt: '2024-04-15', details: 'Loan for travel.',
  },
  {
    id: 'REQ-008', employee: 'Frank White', company: 'Theta Partners', amount: 40000, status: 'Confirmed', declineReason: null, disbursedAt: '2024-05-20', createdAt: '2024-05-05', details: 'Loan for education.',
  },
  {
    id: 'REQ-009', employee: 'Grace Black', company: 'Iota Ventures', amount: 35000, status: 'Running', declineReason: null, disbursedAt: '2024-06-12', createdAt: '2024-05-22', details: 'Loan for wedding.',
  },
];

const PAGE_SIZE = 5;

function formatCurrency(val: number | null): string {
  return val == null ? 'N/A' : `KSh ${val.toLocaleString()}`;
}

function formatDate(date: string | null): string {
  if (!date) return 'N/A';
  const d = new Date(date);
  return d.toLocaleDateString('en-CA', { month: '2-digit', day: '2-digit', year: 'numeric' });
}

export function LoanRequests() {
  const [tab, setTab] = useState<'all' | 'confirmed' | 'running'>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showDetails, setShowDetails] = useState<LoanRequest | null>(null);
  const [modalState, setModalState] = useState<{kycApproved?: boolean, declined?: boolean, disbursed?: boolean, paid?: boolean}>({});

  const filtered = useMemo(() => {
    let data = MOCK_REQUESTS;
    if (tab !== 'all') {
      data = data.filter(r => r.status.toLowerCase() === tab);
    }
    if (search.trim()) {
      data = data.filter(r => r.employee.toLowerCase().includes(search.trim().toLowerCase()));
    }
    return data;
  }, [tab, search]);

  const totalRequests = filtered.length;
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Loan Requests</h1>
      </div>
      {/* Filter/Search Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-lg font-semibold text-gray-800">Loan Requests</h2>
        <div className="flex gap-2 items-center w-full md:w-auto">
          <input
            className="w-full max-w-xs px-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
            placeholder="Search by Employee Name"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
          <div className="flex gap-2 ml-auto">
            {TABS.map(t => (
              <button
                key={t.value}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition focus:outline-none ${tab === t.value ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-600'}`}
                onClick={() => { setTab(t.value as typeof tab); setPage(1); }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Meta Info */}
      <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
        <span>Total Requests: <span className="font-semibold text-gray-800">{totalRequests}</span></span>
        <span>
          {filtered.length === 0
            ? '0 results'
            : `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
        </span>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm bg-white rounded-2xl shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Employee Name</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Company</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Amount</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Decline Reason</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Disbursed At</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Created At</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paged.map((r, idx) => (
              <tr key={r.id + idx} className="hover:bg-indigo-50 transition">
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{r.employee}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.company}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{formatCurrency(r.amount)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow ${
                    r.status === 'Running' ? 'bg-blue-100 text-blue-700' :
                    r.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    r.status === 'Fully Paid' ? 'bg-indigo-100 text-indigo-700' :
                    r.status === 'Declined' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>{r.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.declineReason || 'N/A'}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{formatDate(r.disbursedAt)}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{formatDate(r.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    className="px-3 py-1 bg-indigo-600 text-white rounded-lg shadow font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    onClick={() => setShowDetails(r)}
                  >
                    Show Details
                  </button>
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-400">No loan requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <div />
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
      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
              onClick={() => { setShowDetails(null); setModalState({}); }}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-6">Loan Request Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
              <div>
                <div className="text-xs text-gray-500 font-medium">Employee Name</div>
                <div className="font-semibold text-gray-800">{showDetails.employee}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">National ID</div>
                <div className="font-semibold text-gray-800">{showDetails.nationalId}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Company</div>
                <div className="font-semibold text-gray-800">{showDetails.company}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Loan Amount</div>
                <div className="font-semibold text-gray-800">{formatCurrency(showDetails.amount)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Monthly Interest</div>
                <div className="font-semibold text-gray-800">{showDetails.monthlyInterest.toFixed(2)}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Monthly Interest Amount</div>
                <div className="font-semibold text-gray-800">{formatCurrency(showDetails.monthlyInterestAmount)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Repayment Duration</div>
                <div className="font-semibold text-gray-800">{showDetails.repaymentDuration} months</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Monthly Installment Amount</div>
                <div className="font-semibold text-gray-800">{formatCurrency(showDetails.monthlyInstallment)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Processing Fee</div>
                <div className="font-semibold text-gray-800">{showDetails.processingFee.toFixed(2)}%</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Processing Fee Amount</div>
                <div className="font-semibold text-gray-800">{formatCurrency(showDetails.processingFeeAmount)}</div>
              </div>
            </div>
            {/* Document Section */}
            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-700 mb-2">Documents</div>
              <div className="flex flex-wrap gap-6">
                <div className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">ID Card Front</div>
                  <img src={showDetails.idCardFrontUrl} alt="ID Card Front" className="w-20 h-12 object-cover rounded shadow border" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">ID Card Back</div>
                  <img src={showDetails.idCardBackUrl} alt="ID Card Back" className="w-20 h-12 object-cover rounded shadow border" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xs text-gray-500 mb-1">Payslips (3 months)</div>
                  <div className="flex gap-2">
                    {showDetails.payslips.map((url, i) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded shadow border hover:bg-indigo-50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Footer with actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t">
              <div>
                <span className={`font-bold text-base ${
                  showDetails.status === 'Running' ? 'text-blue-600' :
                  showDetails.status === 'Confirmed' ? 'text-green-600' :
                  showDetails.status === 'Fully Paid' ? 'text-indigo-600' :
                  showDetails.status === 'Declined' ? 'text-red-600' :
                  'text-gray-700'
                }`}>
                  {showDetails.status}
                </span>
              </div>
              <div className="flex gap-2 ml-auto">
                {/* KYC Actions for Confirmed */}
                {showDetails.status === 'Confirmed' && !modalState.kycApproved && !modalState.declined && (
                  <>
                    <button
                      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                      onClick={() => setModalState(s => ({ ...s, kycApproved: true }))}
                    >
                      Approve KYC
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-lg shadow font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                      onClick={() => setModalState(s => ({ ...s, declined: true }))}
                    >
                      Decline
                    </button>
                  </>
                )}
                {/* Disburse after KYC approved */}
                {showDetails.status === 'Confirmed' && modalState.kycApproved && !modalState.disbursed && (
                  <button
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => setModalState(s => ({ ...s, disbursed: true }))}
                  >
                    Disburse
                  </button>
                )}
                {/* Mark as Paid for Running */}
                {showDetails.status === 'Running' && !modalState.paid && (
                  <button
                    className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    onClick={() => setModalState(s => ({ ...s, paid: true }))}
                  >
                    Mark as Paid
                  </button>
                )}
                {/* Fully Paid - no actions */}
                {showDetails.status === 'Fully Paid' && (
                  <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg font-semibold">No actions</span>
                )}
                {/* Declined - no actions */}
                {showDetails.status === 'Declined' && (
                  <span className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg font-semibold">Declined</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
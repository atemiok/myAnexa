import React, { useState, useMemo } from 'react';

const TOGGLES = [
  { label: 'By Admins', value: 'admins' },
  { label: 'By Employees', value: 'employees' },
];

type ApprovalStatus = 'Accepted' | 'Pending' | 'Rejected';

type ChangeRequest = {
  id: string;
  requestAdmin: string;
  company: string;
  requestType: string;
  approvalStatus: ApprovalStatus;
  createdAt: string;
  updatedAt: string;
  employeeName: string;
  nationalId: string;
  employeeId: string;
  contact: string;
  department: string;
  designation: string;
  currentSalary: number;
  updatedSalary: number;
  currentMonthlyLimit: number;
  updatedMonthlyLimit: number;
  approvalHistory: { approver: string; status: ApprovalStatus; date: string }[];
  requestedBy: 'admins' | 'employees';
};

const MOCK_CHANGE_REQUESTS: ChangeRequest[] = [
  {
    id: 'CR-001', requestAdmin: 'Mary Wanjiku', company: 'UWEPO SACCO', requestType: 'Salary Update', approvalStatus: 'Pending', createdAt: '2024-06-10', updatedAt: '2024-06-11', employeeName: 'Julius Kiplagat', nationalId: '13633780', employeeId: 'EMP-001', contact: '0712345678', department: 'Finance', designation: 'Accountant', currentSalary: 50000, updatedSalary: 60000, currentMonthlyLimit: 20000, updatedMonthlyLimit: 25000, approvalHistory: [ { approver: 'Wagefyft', status: 'Accepted', date: '2024-06-10' }, { approver: 'Main Admin', status: 'Pending', date: '' } ], requestedBy: 'admins',
  },
  {
    id: 'CR-002', requestAdmin: 'Samuel Otieno', company: 'Beta Ltd', requestType: 'Monthly Limit Update', approvalStatus: 'Accepted', createdAt: '2024-06-09', updatedAt: '2024-06-10', employeeName: 'Jane Smith', nationalId: '12345678', employeeId: 'EMP-002', contact: '0722333444', department: 'HR', designation: 'HR Manager', currentSalary: 70000, updatedSalary: 70000, currentMonthlyLimit: 30000, updatedMonthlyLimit: 35000, approvalHistory: [ { approver: 'Wagefyft', status: 'Accepted', date: '2024-06-09' }, { approver: 'Main Admin', status: 'Accepted', date: '2024-06-10' } ], requestedBy: 'admins',
  },
  {
    id: 'CR-003', requestAdmin: 'N/A', company: 'Gamma Inc', requestType: 'Salary Update', approvalStatus: 'Rejected', createdAt: '2024-06-08', updatedAt: '2024-06-09', employeeName: 'Alice Johnson', nationalId: '87654321', employeeId: 'EMP-003', contact: '0733444555', department: 'IT', designation: 'Developer', currentSalary: 80000, updatedSalary: 85000, currentMonthlyLimit: 40000, updatedMonthlyLimit: 40000, approvalHistory: [ { approver: 'Wagefyft', status: 'Accepted', date: '2024-06-08' }, { approver: 'Main Admin', status: 'Rejected', date: '2024-06-09' } ], requestedBy: 'employees',
  },
];

function formatCurrency(val: number): string {
  return `KSh ${val.toLocaleString()}`;
}

export function ChangeRequests() {
  const [toggle, setToggle] = useState<'admins' | 'employees'>('admins');
  const [showDetails, setShowDetails] = useState<ChangeRequest | null>(null);
  const [modalStatus, setModalStatus] = useState<'Accepted' | 'Rejected' | null>(null);
  const [modalHistory, setModalHistory] = useState<{ approver: string; status: ApprovalStatus; date: string }[] | null>(null);
  const [localRequests, setLocalRequests] = useState<ChangeRequest[]>(MOCK_CHANGE_REQUESTS);

  const filtered = useMemo(() => {
    return localRequests.filter((r: ChangeRequest) => r.requestedBy === toggle);
  }, [toggle, localRequests]);

  function handleShowDetails(request: ChangeRequest) {
    setShowDetails(request);
    setModalStatus(null);
    setModalHistory(null);
  }

  function handleApprove() {
    if (!showDetails) return;
    const updated: ChangeRequest = {
      ...showDetails,
      approvalStatus: 'Accepted',
      approvalHistory: [
        ...showDetails.approvalHistory,
        { approver: 'Main Admin', status: 'Accepted', date: new Date().toISOString().slice(0, 10) },
      ],
    };
    setShowDetails(updated);
    setModalStatus('Accepted');
    setModalHistory(updated.approvalHistory);
    setLocalRequests(reqs => reqs.map(r => r.id === updated.id ? updated : r));
  }

  function handleReject() {
    if (!showDetails) return;
    const updated: ChangeRequest = {
      ...showDetails,
      approvalStatus: 'Rejected',
      approvalHistory: [
        ...showDetails.approvalHistory,
        { approver: 'Main Admin', status: 'Rejected', date: new Date().toISOString().slice(0, 10) },
      ],
    };
    setShowDetails(updated);
    setModalStatus('Rejected');
    setModalHistory(updated.approvalHistory);
    setLocalRequests(reqs => reqs.map(r => r.id === updated.id ? updated : r));
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 font-sans">
      {/* Header & Toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Change Requests</h1>
        <div className="flex gap-2">
          {TOGGLES.map(t => (
            <button
              key={t.value}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition focus:outline-none ${toggle === t.value ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-600'}`}
              onClick={() => setToggle(t.value as typeof toggle)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm bg-white rounded-2xl shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Request Admin</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Company</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Request Type</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Approval Status</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Created At</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">Updated At</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filtered.map((r: ChangeRequest, idx: number) => (
              <tr key={r.id + idx} className="hover:bg-indigo-50 transition">
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{r.requestAdmin}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.company}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.requestType}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow ${
                    r.approvalStatus === 'Accepted' ? 'bg-green-100 text-green-700' :
                    r.approvalStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    r.approvalStatus === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {r.approvalStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.createdAt}</td>
                <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.updatedAt}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    className="px-3 py-1 bg-indigo-600 text-white rounded-lg shadow font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    onClick={() => handleShowDetails(r)}
                  >
                    Show Details
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">No change requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
              onClick={() => { setShowDetails(null); setModalStatus(null); setModalHistory(null); }}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-6">Change Request Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
              <div>
                <div className="text-xs text-gray-500 font-medium">Employee Name</div>
                <div className="font-semibold text-gray-800">{showDetails.employeeName}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">National ID</div>
                <div className="font-semibold text-gray-800">{showDetails.nationalId}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Employee ID</div>
                <div className="font-semibold text-gray-800">{showDetails.employeeId}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Contact</div>
                <div className="font-semibold text-gray-800">{showDetails.contact}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Department</div>
                <div className="font-semibold text-gray-800">{showDetails.department}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Designation</div>
                <div className="font-semibold text-gray-800">{showDetails.designation}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Current Salary</div>
                <div className="font-semibold text-red-600">{formatCurrency(showDetails.currentSalary)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Updated Salary</div>
                <div className="font-semibold text-green-600">{formatCurrency(showDetails.updatedSalary)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Current Monthly Limit</div>
                <div className="font-semibold text-red-600">{formatCurrency(showDetails.currentMonthlyLimit)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 font-medium">Updated Monthly Limit</div>
                <div className="font-semibold text-green-600">{formatCurrency(showDetails.updatedMonthlyLimit)}</div>
              </div>
            </div>
            {/* Approval History */}
            <div className="mb-6">
              <div className="text-sm font-semibold text-gray-700 mb-2">Approval History</div>
              <div className="space-y-2">
                {(modalHistory || showDetails.approvalHistory).map((h, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="font-medium text-gray-700 w-24">{h.approver}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow ${
                      h.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                      h.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      h.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {h.status}
                    </span>
                    <span className="text-xs text-gray-500">{h.date}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Approve/Reject Buttons */}
            {((modalStatus ?? showDetails.approvalStatus) === 'Pending') && (
              <div className="flex gap-4 justify-end mt-4">
                <button
                  className="px-5 py-2 bg-green-600 text-white rounded-lg shadow font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                  onClick={handleApprove}
                >
                  Approve
                </button>
                <button
                  className="px-5 py-2 bg-red-600 text-white rounded-lg shadow font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={handleReject}
                >
                  Reject
                </button>
              </div>
            )}
            {/* Show status if not pending */}
            {((modalStatus ?? showDetails.approvalStatus) !== 'Pending') && (
              <div className="flex justify-end mt-4">
                <span className={`px-4 py-2 rounded-lg font-semibold ${
                  (modalStatus ?? showDetails.approvalStatus) === 'Accepted' ? 'bg-green-100 text-green-700' :
                  (modalStatus ?? showDetails.approvalStatus) === 'Rejected' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {(modalStatus ?? showDetails.approvalStatus)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 
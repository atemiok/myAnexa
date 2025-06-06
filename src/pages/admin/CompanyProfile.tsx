import React, { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const MOCK_COMPANY = {
  name: 'UWEPO SACCO',
  adminEmail: 'admin@uwepo.co.ke',
  phone: '+254 712 345678',
  hrEmail: 'hr@uwepo.co.ke',
  salaryDate: '5th of every month',
  address: 'Nairobi, Kenya',
  maxLimit: 1000000,
  approval: 'Approved',
};

const MOCK_MONTHLY_USAGE = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  data: [12000, 18000, 22000, 25000, 30471, 0],
  total: 30471,
  asOf: '5th June',
};

const MOCK_PAYABLE = {
  advance: 25000,
  serviceFee: 5471,
  total: 30471,
};

const MOCK_AVG_USAGE = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  data: [2, 2.5, 2.8, 3, 3, 0],
  avg: 3,
  asOf: '5th June',
};

const GROUPS = ['Department', 'Designation', 'Status'] as const;
type GroupTab = typeof GROUPS[number];
const GROUP_DATA: Record<GroupTab, { labels: string[]; data: number[] }> = {
  Department: {
    labels: ['Sales', 'Operations', 'Executive', 'Marketing', 'Finance', 'GM'],
    data: [30, 20, 10, 15, 18, 7],
  },
  Designation: {
    labels: ['Manager', 'Officer', 'Executive', 'Assistant'],
    data: [15, 25, 30, 10],
  },
  Status: {
    labels: ['Active', 'Inactive', 'Suspended'],
    data: [60, 10, 5],
  },
};

export function CompanyProfile() {
  const [groupTab, setGroupTab] = useState<GroupTab>('Department');

  // Chart data
  const monthlyUsageData = {
    labels: MOCK_MONTHLY_USAGE.labels,
    datasets: [
      {
        label: 'Monthly Usage (KSh)',
        data: MOCK_MONTHLY_USAGE.data,
        backgroundColor: '#6366f1',
        borderRadius: 6,
      },
    ],
  };
  const avgUsageData = {
    labels: MOCK_AVG_USAGE.labels,
    datasets: [
      {
        label: 'Avg. Usage (%)',
        data: MOCK_AVG_USAGE.data,
        backgroundColor: '#10b981',
        borderRadius: 6,
      },
    ],
  };
  const groupData = {
    labels: GROUP_DATA[groupTab].labels,
    datasets: [
      {
        label: `Usage by ${groupTab}`,
        data: GROUP_DATA[groupTab].data,
        backgroundColor: '#f59e42',
        borderRadius: 6,
      },
    ],
  };
  const donutData = {
    labels: ['Advance', 'Service Fee'],
    datasets: [
      {
        data: [MOCK_PAYABLE.advance, MOCK_PAYABLE.serviceFee],
        backgroundColor: ['#6366f1', '#f59e42'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* User Profile */}
      <div className="flex justify-end items-center p-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-700">William Atemi</span>
          <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center font-bold text-indigo-700">W</div>
        </div>
      </div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-8 mt-2 mb-6 gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>General Details</span>
          <span className="mx-1">&gt;</span>
          <span className="font-semibold text-gray-700">{MOCK_COMPANY.name}</span>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">Generate Invoice</button>
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-200">Filter Data</button>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-8">
        {/* Left Panel - Company Details */}
        <div className="bg-white rounded-2xl shadow p-6 w-full lg:w-1/4 flex flex-col gap-4 min-w-[260px]">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-800">Company Details</h2>
            <button className="text-indigo-500 hover:text-indigo-700" title="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3zm0 0v3a1 1 0 001 1h3" /></svg>
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div><span className="font-semibold text-gray-700">Name:</span> {MOCK_COMPANY.name}</div>
            <div><span className="font-semibold text-gray-700">Admin Email:</span> {MOCK_COMPANY.adminEmail}</div>
            <div><span className="font-semibold text-gray-700">Phone:</span> {MOCK_COMPANY.phone}</div>
            <div><span className="font-semibold text-gray-700">HR Email:</span> {MOCK_COMPANY.hrEmail}</div>
            <div><span className="font-semibold text-gray-700">Salary Date:</span> {MOCK_COMPANY.salaryDate}</div>
            <div><span className="font-semibold text-gray-700">Company Address:</span> {MOCK_COMPANY.address}</div>
            <div><span className="font-semibold text-gray-700">Maximum Limit:</span> KSh {MOCK_COMPANY.maxLimit.toLocaleString()}</div>
            <div><span className="font-semibold text-gray-700">Approval:</span> <span className="text-green-600 font-semibold">{MOCK_COMPANY.approval}</span></div>
          </div>
        </div>
        {/* Center Panels */}
        <div className="flex-1 flex flex-col gap-6 min-w-[320px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Advance Usage (Bar Chart) */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-2">
                <h3 className="font-semibold text-gray-700">Monthly Advance Usage</h3>
                <span className="text-xs text-gray-500">KSh {MOCK_MONTHLY_USAGE.total.toLocaleString()} as of {MOCK_MONTHLY_USAGE.asOf}</span>
              </div>
              <Bar data={monthlyUsageData} options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }} height={180} />
            </div>
            {/* Total Payable (Donut Chart) */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-2">
                <h3 className="font-semibold text-gray-700">Total Payable</h3>
                <span className="text-xs text-gray-500">KSh {MOCK_PAYABLE.total.toLocaleString()}</span>
              </div>
              <Doughnut data={donutData} options={{ plugins: { legend: { position: 'bottom' } }, cutout: '70%', responsive: true, maintainAspectRatio: false }} height={180} />
            </div>
          </div>
        </div>
        {/* Right Panel - Usage Stats */}
        <div className="w-full lg:w-1/4 flex flex-col gap-6 min-w-[260px]">
          {/* Monthly Avg. Limit Usage (Bar Chart) */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-2">
              <h3 className="font-semibold text-gray-700">Monthly Avg. Limit Usage</h3>
              <span className="text-xs text-gray-500">{MOCK_AVG_USAGE.avg}% as of {MOCK_AVG_USAGE.asOf}</span>
            </div>
            <Bar data={avgUsageData} options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 10 } } }} height={120} />
          </div>
          {/* Group-wise Average Usage (Bar Graph) */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">Group-wise Average Usage</h3>
              <div className="flex gap-2">
                {GROUPS.map(g => (
                  <button
                    key={g}
                    className={`px-3 py-1 text-xs rounded-lg font-semibold border ${groupTab === g ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200'} transition`}
                    onClick={() => setGroupTab(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <Bar data={groupData} options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }} height={120} />
          </div>
        </div>
      </div>
      {/* Bottom Section - Contract & Documentation */}
      <div className="max-w-5xl mx-auto mt-8 px-4 md:px-0">
        <div className="bg-green-100 border border-green-300 rounded-xl p-4 flex items-center gap-3 shadow">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          <span className="font-semibold text-green-700">All documents are submitted and verified</span>
        </div>
      </div>
    </div>
  );
} 
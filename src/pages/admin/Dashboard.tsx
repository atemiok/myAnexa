import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const stats = [
  { label: 'Total Companies', value: 48, color: 'text-indigo-600' },
  { label: 'Active Companies', value: 41, color: 'text-green-600' },
  { label: 'Inactive Companies', value: 7, color: 'text-gray-400' },
  { label: 'Total Employees', value: 1665, color: 'text-indigo-600' },
  { label: 'Active Employees', value: 897, color: 'text-green-600' },
  { label: 'Inactive Employees', value: 768, color: 'text-gray-400' },
  { label: 'Total Transactions', value: 17886, color: 'text-indigo-600' },
  { label: 'Total Amount Disbursed', value: 37211196, color: 'text-green-600', isCurrency: true },
];

const advancesDisbursedData = {
  labels: ['April', 'May', 'June'],
  datasets: [
    {
      label: 'Advances Disbursed',
      data: [250000, 276653, 250000],
      backgroundColor: '#6366f1',
      borderRadius: 8,
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
    {
      label: 'Service Charges',
      data: [15000, 18000, 17000],
      backgroundColor: '#fbbf24',
      borderRadius: 8,
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
  ],
};

const loansDisbursedData = {
  labels: ['April', 'May', 'June'],
  datasets: [
    {
      label: 'Loans Disbursed',
      data: [2000000, 2156311, 2000000],
      backgroundColor: '#34d399',
      borderRadius: 8,
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
    {
      label: 'Processing Fees',
      data: [50000, 60000, 50000],
      backgroundColor: '#f472b6',
      borderRadius: 8,
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
  ],
};

const expectedInterestData = {
  labels: ['April', 'May', 'June'],
  datasets: [
    {
      label: 'Expected Interest',
      data: [120000, 130000, 141135],
      backgroundColor: '#818cf8',
      borderRadius: 8,
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
  ],
};

const topCompaniesAdvance = {
  labels: [
    'Company A', 'Company B', 'Company C', 'Company D', 'Company E',
    'Company F', 'Company G', 'Company H', 'Company I', 'Company J',
  ],
  datasets: [
    {
      label: 'Advance Amount',
      data: [200000, 180000, 170000, 160000, 150000, 140000, 130000, 120000, 110000, 100000],
      backgroundColor: '#6366f1',
      borderRadius: 8,
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
  ],
};

const topCompaniesLoans = {
  labels: [
    'Company A', 'Company B', 'Company C', 'Company D', 'Company E',
    'Company F', 'Company G', 'Company H', 'Company I', 'Company J',
  ],
  datasets: [
    {
      label: 'Loans Disbursed',
      data: [180000, 170000, 160000, 150000, 140000, 130000, 120000, 110000, 100000, 90000],
      backgroundColor: '#34d399',
      borderRadius: 8,
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
  ],
};

const FILTERS = [
  { label: 'Month', value: 'month' },
  { label: 'Week', value: 'week' },
  { label: '3 Months', value: '3months' },
  { label: '6 Months', value: '6months' },
  { label: 'Year', value: 'year' },
];

function formatCurrency(val: number) {
  return `KSh ${val.toLocaleString()}`;
}

export function Dashboard() {
  const [filter, setFilter] = useState(FILTERS[0].value);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="h-screen min-h-screen max-h-screen bg-gray-50 py-6 px-2 md:px-6 font-sans flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full max-w-6xl h-full flex flex-col gap-4">
        {/* Filter Button */}
        <div className="flex justify-end mb-2 relative">
          <button
            className="px-4 py-2 bg-white rounded-xl shadow text-gray-700 font-medium flex items-center gap-2 hover:bg-gray-100 border border-gray-200"
            onClick={() => setShowDropdown((v) => !v)}
          >
            Filter: <span className="text-indigo-600">{FILTERS.find(f => f.value === filter)?.label}</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-12 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 ${filter === f.value ? 'bg-indigo-100 font-semibold text-indigo-700' : ''}`}
                  onClick={() => { setFilter(f.value); setShowDropdown(false); }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* 3-column, 2-row grid for 6 cards */}
        <section className="grid grid-cols-3 grid-rows-2 gap-4 w-full h-full">
          {/* 1. Statistics Summary */}
          <div className="bg-white rounded-2xl shadow p-3 flex flex-col items-center min-w-[220px] w-full h-full justify-center">
            <h2 className="text-base font-bold text-gray-800 mb-1">Statistics Summary</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full text-xs">
              {stats.map((stat) => (
                <React.Fragment key={stat.label}>
                  <span className="text-gray-500 text-right pr-2 whitespace-nowrap">{stat.label}:</span>
                  <span className={`font-semibold ${stat.color} text-left pl-2`}>{stat.isCurrency ? formatCurrency(stat.value) : stat.value.toLocaleString()}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* 2. Advances Disbursed */}
          <div className="bg-white rounded-2xl shadow p-3 flex flex-col h-full">
            <h3 className="text-base font-semibold text-gray-700 mb-1">Advances Disbursed <span className="text-xs text-gray-400">(+ Service Charges)</span> <span className="ml-2 text-xs text-indigo-500">[{FILTERS.find(f => f.value === filter)?.label}]</span></h3>
            <div className="flex-1 min-h-0">
              <Bar data={advancesDisbursedData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'top' }, tooltip: { enabled: true } }, scales: { y: { beginAtZero: true } } }} height={120} />
            </div>
          </div>
          {/* 3. Loans Disbursed */}
          <div className="bg-white rounded-2xl shadow p-3 flex flex-col h-full">
            <h3 className="text-base font-semibold text-gray-700 mb-1">Loans Disbursed <span className="text-xs text-gray-400">(+ Processing Fees)</span> <span className="ml-2 text-xs text-indigo-500">[{FILTERS.find(f => f.value === filter)?.label}]</span></h3>
            <div className="flex-1 min-h-0">
              <Bar data={loansDisbursedData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'top' }, tooltip: { enabled: true } }, scales: { y: { beginAtZero: true } } }} height={120} />
            </div>
          </div>
          {/* 4. Expected Interest Income */}
          <div className="bg-white rounded-2xl shadow p-3 flex flex-col h-full">
            <h3 className="text-base font-semibold text-gray-700 mb-1">Expected Interest Income <span className="ml-2 text-xs text-indigo-500">[{FILTERS.find(f => f.value === filter)?.label}]</span></h3>
            <div className="flex-1 min-h-0">
              <Bar data={expectedInterestData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'top' }, tooltip: { enabled: true } }, scales: { y: { beginAtZero: true } } }} height={120} />
            </div>
          </div>
          {/* 5. Top Companies by Advance Amount */}
          <div className="bg-white rounded-2xl shadow p-3 flex flex-col h-full">
            <h3 className="text-base font-semibold text-gray-700 mb-1">Top Companies by Advance Amount <span className="text-xs text-gray-400">(Last 3 months)</span> <span className="ml-2 text-xs text-indigo-500">[{FILTERS.find(f => f.value === filter)?.label}]</span></h3>
            <div className="flex-1 min-h-0">
              <Bar data={topCompaniesAdvance} options={{ maintainAspectRatio: false, responsive: true, indexAxis: 'y', plugins: { legend: { display: false }, tooltip: { enabled: true } }, scales: { x: { beginAtZero: true } } }} height={120} />
            </div>
          </div>
          {/* 6. Top Companies by Loans Disbursed */}
          <div className="bg-white rounded-2xl shadow p-3 flex flex-col h-full">
            <h3 className="text-base font-semibold text-gray-700 mb-1">Top Companies by Loans Disbursed <span className="text-xs text-gray-400">(Last 3 months)</span> <span className="ml-2 text-xs text-indigo-500">[{FILTERS.find(f => f.value === filter)?.label}]</span></h3>
            <div className="flex-1 min-h-0">
              <Bar data={topCompaniesLoans} options={{ maintainAspectRatio: false, responsive: true, indexAxis: 'y', plugins: { legend: { display: false }, tooltip: { enabled: true } }, scales: { x: { beginAtZero: true } } }} height={120} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 
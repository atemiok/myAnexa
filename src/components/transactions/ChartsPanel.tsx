import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsPanelProps {
  filters: any;
}

export function ChartsPanel({ filters }: ChartsPanelProps) {
  // Dummy data for illustration
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Payments',
        data: [12000, 15000, 18000, 14000, 16000, 20000],
        borderColor: '#3DA9FC',
        backgroundColor: 'rgba(61, 169, 252, 0.2)',
        tension: 0.4,
      },
    ],
  };
  const pieData = {
    labels: ['Advance Request', 'Utility Payment', 'Wallet', 'Loan Request', 'Advance Repayment'],
    datasets: [
      {
        label: 'Payments by Feature',
        data: [30, 20, 15, 25, 10],
        backgroundColor: [
          '#3DA9FC',
          '#00C48C',
          '#6B7280',
          '#818cf8',
          '#f59e42',
        ],
      },
    ],
  };
  const barData = {
    labels: ['Acme Corp', 'Beta Ltd', 'Gamma Inc', 'Delta Group'],
    datasets: [
      {
        label: 'Payments by Company',
        data: [50000, 30000, 20000, 10000],
        backgroundColor: '#3DA9FC',
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="card">
        <div className="card-body">
          <h3 className="text-base font-semibold mb-2">Total Payments Over Time</h3>
          <div className="h-48">
            <Line data={lineData} options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="text-base font-semibold mb-2">Payments by Feature</h3>
          <div className="h-48">
            <Pie data={pieData} options={{ plugins: { legend: { position: 'bottom' } }, responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h3 className="text-base font-semibold mb-2">Payments by Company</h3>
          <div className="h-48">
            <Bar data={barData} options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false, indexAxis: 'y' }} />
          </div>
        </div>
      </div>
    </div>
  );
} 
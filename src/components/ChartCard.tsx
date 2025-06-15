import React from 'react';
import { Pie, Line, Bar, Doughnut } from 'react-chartjs-2';
import type { ChartOptions } from 'chart.js';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: any;
  type: 'pie' | 'line' | 'bar' | 'doughnut';
}

export function ChartCard({ title, subtitle, data, type }: ChartCardProps) {
  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, system-ui, sans-serif',
          },
          color: 'var(--color-neutral-700)',
        },
      },
      tooltip: {
        backgroundColor: 'var(--color-neutral-800)',
        titleFont: {
          size: 14,
          family: 'Inter, system-ui, sans-serif',
        },
        bodyFont: {
          size: 13,
          family: 'Inter, system-ui, sans-serif',
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4,
      },
    },
    animation: {
      duration: 750,
      easing: 'easeInOutQuad',
    },
  };

  const renderChart = () => {
    switch (type) {
      case 'pie':
        return <Pie data={data} options={chartOptions} />;
      case 'line':
        return <Line data={data} options={chartOptions} />;
      case 'bar':
        return <Bar data={data} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={chartOptions} />;
      default:
        return null;
    }
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-header">
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>}
      </div>
      <div className="card-body h-80 transition-all duration-200 hover:shadow-lg">
        {renderChart()}
      </div>
    </div>
  );
} 
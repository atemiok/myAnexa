import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface MonthlyUsageData {
  month: string;
  amount: number;
}

interface MonthlyUsageChartProps {
  data: MonthlyUsageData[];
}

const MonthlyUsageChart: React.FC<MonthlyUsageChartProps> = ({ data }) => {
  return (
    <div className="h-[150px] animate-fade-in">
      <h3 className="text-sm font-semibold text-neutral-900 mb-3">Monthly Usage</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-neutral-200)" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: 'var(--color-neutral-600)' }}
            axisLine={{ stroke: 'var(--color-neutral-200)' }}
            tickLine={{ stroke: 'var(--color-neutral-200)' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: 'var(--color-neutral-600)' }}
            axisLine={{ stroke: 'var(--color-neutral-200)' }}
            tickLine={{ stroke: 'var(--color-neutral-200)' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-neutral-800)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-neutral-100)',
              fontSize: '12px',
              padding: '8px 12px',
            }}
            cursor={{ fill: 'var(--color-neutral-100)' }}
          />
          <Bar 
            dataKey="amount" 
            fill="var(--color-primary-500)" 
            radius={[4, 4, 0, 0]}
            animationDuration={750}
            animationBegin={0}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyUsageChart; 
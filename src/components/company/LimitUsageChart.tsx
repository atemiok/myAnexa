import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface LimitUsageData {
  month: string;
  used: number;
  limit: number;
}

interface LimitUsageChartProps {
  data: LimitUsageData[];
}

const LimitUsageChart: React.FC<LimitUsageChartProps> = ({ data }) => {
  return (
    <div className="h-[150px] animate-fade-in">
      <h3 className="text-sm font-semibold text-neutral-900 mb-3">Limit Usage</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
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
          <Line 
            type="monotone" 
            dataKey="used" 
            stroke="var(--color-primary-500)" 
            strokeWidth={2} 
            dot={{ r: 3, fill: 'var(--color-primary-500)' }}
            animationDuration={750}
            animationBegin={0}
          />
          <Line 
            type="monotone" 
            dataKey="limit" 
            stroke="var(--color-error)" 
            strokeWidth={2} 
            strokeDasharray="5 5" 
            dot={false}
            animationDuration={750}
            animationBegin={150}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LimitUsageChart; 
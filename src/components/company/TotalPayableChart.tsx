import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface TotalPayableData {
  advance: number;
  serviceFee: number;
  total: number;
}

interface TotalPayableChartProps {
  data: TotalPayableData;
}

const TotalPayableChart: React.FC<TotalPayableChartProps> = ({ data }) => {
  const pieData = [
    { name: 'Advance', value: data.advance },
    { name: 'Service Fee', value: data.serviceFee },
  ];

  const COLORS = ['var(--color-primary-500)', 'var(--color-error)'];

  return (
    <div className="h-[150px] animate-fade-in">
      <h3 className="text-sm font-semibold text-neutral-900 mb-3">Total Payable</h3>
      <div className="flex items-center justify-between h-full">
        <div className="w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={45}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                animationDuration={750}
                animationBegin={0}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-neutral-800)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-neutral-100)',
                  fontSize: '12px',
                  padding: '8px 12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 pl-4">
          <div className="space-y-2">
            <div>
              <div className="text-xs text-neutral-500">Advance</div>
              <div className="text-sm font-semibold text-neutral-900">KSh {data.advance.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-neutral-500">Service Fee</div>
              <div className="text-sm font-semibold text-neutral-900">KSh {data.serviceFee.toLocaleString()}</div>
            </div>
            <div className="pt-2 border-t border-neutral-200">
              <div className="text-xs text-neutral-500">Total</div>
              <div className="text-base font-bold text-neutral-900">KSh {data.total.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalPayableChart; 
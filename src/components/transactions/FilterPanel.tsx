import React from 'react';

interface FilterPanelProps {
  filters: any;
  setFilters: (filters: any) => void;
}

export function FilterPanel({ filters, setFilters }: FilterPanelProps) {
  // Dummy options for illustration
  const companies = ['All Companies', 'Acme Corp', 'Beta Ltd'];
  const users = ['All Users', 'John Doe', 'Jane Smith'];
  const features = ['Advance Request', 'Utility Payment', 'Wallet', 'Loan Request', 'Advance Repayment'];
  const statuses = ['All', 'Paid', 'Pending', 'Failed'];

  return (
    <div className="card">
      <div className="card-body space-y-4">
        <h2 className="text-lg font-semibold mb-2">Filters</h2>
        <div className="space-y-2">
          <select className="input" value={filters.company || ''} onChange={e => setFilters({ ...filters, company: e.target.value })}>
            {companies.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="input" value={filters.user || ''} onChange={e => setFilters({ ...filters, user: e.target.value })}>
            {users.map(u => <option key={u}>{u}</option>)}
          </select>
          <div className="flex gap-2">
            <input type="number" className="input" placeholder="Min Amount" value={filters.minAmount || ''} onChange={e => setFilters({ ...filters, minAmount: e.target.value })} />
            <input type="number" className="input" placeholder="Max Amount" value={filters.maxAmount || ''} onChange={e => setFilters({ ...filters, maxAmount: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <input type="date" className="input" value={filters.from || ''} onChange={e => setFilters({ ...filters, from: e.target.value })} />
            <input type="date" className="input" value={filters.to || ''} onChange={e => setFilters({ ...filters, to: e.target.value })} />
          </div>
          <select className="input" value={filters.feature || ''} onChange={e => setFilters({ ...filters, feature: e.target.value })}>
            {features.map(f => <option key={f}>{f}</option>)}
          </select>
          <select className="input" value={filters.status || ''} onChange={e => setFilters({ ...filters, status: e.target.value })}>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
} 
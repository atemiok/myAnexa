import React, { useState } from 'react';
import { TransactionsTable } from '../../components/transactions/TransactionsTable';
import { FilterPanel } from '../../components/transactions/FilterPanel';
import { ChartsPanel } from '../../components/transactions/ChartsPanel';
import { TransactionModal } from '../../components/transactions/TransactionModal';
import { Spinner } from '../../components/Spinner';

export default function Transactions() {
  const [filters, setFilters] = useState({});
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Placeholder for data fetching logic
  // const { data, isLoading } = useTransactions(filters);

  const handleRowClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleExportCSV = () => {
    // Implement CSV export logic
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button
          className="btn btn-primary"
          onClick={handleExportCSV}
        >
          Export CSV
        </button>
      </div>
      <ChartsPanel filters={filters} />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>
        <div className="w-full md:w-3/4">
          {loading ? (
            <Spinner />
          ) : (
            <TransactionsTable
              filters={filters}
              onRowClick={handleRowClick}
            />
          )}
        </div>
      </div>
      {showModal && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
} 
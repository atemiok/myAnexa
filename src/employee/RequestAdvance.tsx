import React, { useState } from 'react';
import { useRequestAdvance } from '../hooks/employee/useRequestAdvance';

export function RequestAdvance() {
  const { maxAmount, submitting, submitAdvance } = useRequestAdvance();
  const [amount, setAmount] = useState(0);
  const [purpose, setPurpose] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (amount > maxAmount) {
      setError(`Amount cannot exceed $${maxAmount}`);
      return;
    }
    if (amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    if (!purpose.trim()) {
      setError('Purpose is required');
      return;
    }
    await submitAdvance();
    setSuccess(true);
    setAmount(0);
    setPurpose('');
  };

  return (
    <form className="max-w-lg mx-auto bg-white shadow rounded-lg p-8 space-y-6" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold text-gray-900">Request Advance</h1>
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={amount}
          max={maxAmount}
          min={1}
          onChange={(e) => setAmount(Number(e.target.value))}
          disabled={submitting}
        />
        <p className="text-xs text-gray-500 mt-1">Max: ${maxAmount}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Purpose</label>
        <textarea
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          rows={3}
          disabled={submitting}
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">Advance request submitted!</div>}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
} 
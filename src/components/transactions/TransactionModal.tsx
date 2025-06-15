import React from 'react';

interface TransactionModalProps {
  transaction: any;
  onClose: () => void;
}

export function TransactionModal({ transaction, onClose }: TransactionModalProps) {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-fade-in">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="text-2xl">&times;</span>
        </button>
        <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
        <div className="space-y-3">
          <div>
            <span className="font-medium text-gray-700">Employee Name:</span>
            <span className="ml-2 text-gray-900">{transaction.employeeName}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Company:</span>
            <span className="ml-2 text-gray-900">{transaction.company}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Feature:</span>
            <span className="ml-2 text-gray-900">{transaction.feature}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Amount:</span>
            <span className="ml-2 text-gray-900">KSh {transaction.amount?.toLocaleString()}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Status:</span>
            <span className="ml-2 text-gray-900">{transaction.status}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Created At:</span>
            <span className="ml-2 text-gray-900">{transaction.createdAt}</span>
          </div>
        </div>
        {/* Add edit functionality here if needed */}
      </div>
    </div>
  );
} 
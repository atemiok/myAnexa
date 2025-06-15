import React from 'react';
import { FiEdit2 } from 'react-icons/fi';

interface CompanyDetailsPanelProps {
  email: React.ReactNode;
  phone: React.ReactNode;
  address: React.ReactNode;
  employees: React.ReactNode;
  status: React.ReactNode;
  joinDate: React.ReactNode;
  lastInvoice: React.ReactNode;
  paymentStatus: React.ReactNode;
  activationStatus: React.ReactNode;
  onEdit?: () => void;
}

const CompanyDetailsPanel: React.FC<CompanyDetailsPanelProps> = ({
  email,
  phone,
  address,
  employees,
  status,
  joinDate,
  lastInvoice,
  paymentStatus,
  activationStatus,
  onEdit,
}) => {
  return (
    <div className="relative animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-neutral-900">Company Details</h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-all duration-200"
            aria-label="Edit company details"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-3">
          <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-neutral-500">Email</label>
              <div className="text-sm text-neutral-900">{email}</div>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-neutral-500">Phone</label>
              <div className="text-sm text-neutral-900">{phone}</div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-neutral-500">Address</label>
            <div className="text-sm text-neutral-900">{address}</div>
          </div>
        </div>

        {/* Company Status */}
        <div className="space-y-3">
          <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Company Status</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-neutral-500">Employees</label>
              <div className="text-sm text-neutral-900">{employees}</div>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-neutral-500">Status</label>
              <div className="text-sm text-neutral-900">{status}</div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-3">
          <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Additional Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-neutral-500">Join Date</label>
              <div className="text-sm text-neutral-900">{joinDate}</div>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-neutral-500">Last Invoice</label>
              <div className="text-sm text-neutral-900">{lastInvoice}</div>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-neutral-500">Payment Status</label>
              <div className="text-sm text-neutral-900">{paymentStatus}</div>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-neutral-500">Activation Status</label>
              <div className="text-sm text-neutral-900">{activationStatus}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsPanel; 
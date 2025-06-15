import React, { useState } from 'react';
import { FiX, FiEdit2, FiCheck, FiXCircle } from 'react-icons/fi';
import CompanyDetailsPanel from './company/CompanyDetailsPanel';
import MonthlyUsageChart from './company/MonthlyUsageChart';
import LimitUsageChart from './company/LimitUsageChart';
import TotalPayableChart from './company/TotalPayableChart';
import DepartmentUsage from './company/DepartmentUsage';

interface CompanyData {
  email: string;
  phone: string;
  address: string;
  employees: number;
  status: string;
  joinDate: string;
  lastInvoice: string;
  paymentStatus: string;
  activationStatus: string;
}

interface CompanyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  monthlyUsageData: any;
  limitUsageData: any;
  totalPayableData: any;
  departments: any[];
}

const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({
  isOpen,
  onClose,
  companyName,
  monthlyUsageData,
  limitUsageData,
  totalPayableData,
  departments,
}) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<string>('');
  const [companyData, setCompanyData] = useState<CompanyData>({
    email: 'contact@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, Suite 100, City, State 12345',
    employees: 150,
    status: 'Active',
    joinDate: '2023-01-15',
    lastInvoice: '2024-02-01',
    paymentStatus: 'Paid',
    activationStatus: 'Active',
  });

  const handleEdit = (field: string) => {
    setEditingField(field);
    setEditedValue(companyData[field as keyof CompanyData].toString());
  };

  const handleSave = (field: string) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: editedValue
    }));
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const renderEditableField = (field: string, label: string) => {
    const isEditing = editingField === field;
    const value = companyData[field as keyof CompanyData];

    return (
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
          ) : (
            <span className="text-gray-900">{value}</span>
          )}
        </div>
        <div className="ml-2">
          {isEditing ? (
            <div className="flex space-x-1">
              <button
                onClick={() => handleSave(field)}
                className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full transition-colors duration-200"
              >
                <FiCheck className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200"
              >
                <FiXCircle className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleEdit(field)}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-navy/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-xl animate-scale-in">
        {/* Header - Fixed */}
        <div className="flex justify-between items-center p-6 border-b border-slate/10 flex-shrink-0">
          <h2 className="text-xl font-semibold text-navy gradient-text">{companyName}</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate hover:text-navy hover:bg-slate/10 rounded-full transition-all duration-200 hover-lift"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Details Card */}
              <div className="card hover-lift">
                <div className="card-body">
                  <CompanyDetailsPanel
                    email={renderEditableField('email', 'Email')}
                    phone={renderEditableField('phone', 'Phone')}
                    address={renderEditableField('address', 'Address')}
                    employees={renderEditableField('employees', 'Employees')}
                    status={renderEditableField('status', 'Status')}
                    joinDate={renderEditableField('joinDate', 'Join Date')}
                    lastInvoice={renderEditableField('lastInvoice', 'Last Invoice')}
                    paymentStatus={renderEditableField('paymentStatus', 'Payment Status')}
                    activationStatus={renderEditableField('activationStatus', 'Activation Status')}
                  />
                </div>
              </div>

              {/* Monthly Usage Chart */}
              <div className="card hover-lift">
                <div className="card-body">
                  <MonthlyUsageChart data={monthlyUsageData} />
                </div>
              </div>

              {/* Limit Usage Chart */}
              <div className="card hover-lift">
                <div className="card-body">
                  <LimitUsageChart data={limitUsageData} />
                </div>
              </div>

              {/* Total Payable Chart */}
              <div className="card hover-lift">
                <div className="card-body">
                  <TotalPayableChart data={totalPayableData} />
                </div>
              </div>

              {/* Department Usage Chart */}
              <div className="card md:col-span-2 hover-lift">
                <div className="card-body">
                  <DepartmentUsage data={departments} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsModal; 
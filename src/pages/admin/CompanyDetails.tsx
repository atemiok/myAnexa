import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiUser, FiFilter, FiFileText } from 'react-icons/fi';
import CompanyDetailsPanel from '../../components/company/CompanyDetailsPanel';
import MonthlyUsageChart from '../../components/company/MonthlyUsageChart';
import LimitUsageChart from '../../components/company/LimitUsageChart';
import TotalPayableChart from '../../components/company/TotalPayableChart';
import DepartmentUsage from '../../components/company/DepartmentUsage';

// Mock data - Replace with actual API calls
const mockCompanyData = {
  name: "Tech Solutions Ltd",
  adminEmail: "admin@techsolutions.com",
  phone: "+254 712 345 678",
  hrEmail: "hr@techsolutions.com",
  salaryDate: "25th",
  address: "123 Business Park, Nairobi",
  maxLimit: 75,
  approvalMethod: "Automatic",
  monthlyUsage: [
    { month: "Apr", amount: 25000 },
    { month: "May", amount: 30471 },
    { month: "Jun", amount: 28000 }
  ],
  limitUsage: [
    { date: "1 Jun", usage: 2 },
    { date: "2 Jun", usage: 3 },
    { date: "3 Jun", usage: 2.5 },
    { date: "4 Jun", usage: 3.2 },
    { date: "5 Jun", usage: 2.8 },
    { date: "6 Jun", usage: 3 }
  ],
  totalPayable: {
    advance: 25000,
    serviceFee: 5000,
    total: 30000
  },
  departments: [
    { name: "Sales", usage: 75 },
    { name: "Operations", usage: 60 },
    { name: "Executive", usage: 45 },
    { name: "Marketing", usage: 80 },
    { name: "Finance", usage: 55 },
    { name: "GM", usage: 40 }
  ]
};

const CompanyDetails: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [companyData, setCompanyData] = useState(mockCompanyData);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch company data based on companyId
    // setCompanyData(data);
  }, [companyId]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2 text-gray-600">
          <span>General Details</span>
          <span>/</span>
          <span className="font-semibold">{companyData.name}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FiFileText className="mr-2" />
            Generate Invoice
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FiFilter className="mr-2" />
            Filter Data
          </button>
          <div className="flex items-center space-x-2">
            <FiUser className="text-gray-600" />
            <span className="text-gray-600">Admin User</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Company Details Panel */}
        <div className="col-span-3">
          <CompanyDetailsPanel
            companyData={companyData}
            onEdit={() => setIsEditing(true)}
          />
        </div>

        {/* Monthly Advance Usage */}
        <div className="col-span-4">
          <MonthlyUsageChart data={companyData.monthlyUsage} />
        </div>

        {/* Monthly Avg. Limit Usage */}
        <div className="col-span-5">
          <LimitUsageChart data={companyData.limitUsage} />
        </div>

        {/* Contract & Documentation */}
        <div className="col-span-3 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Contract & Documentation</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700">All documents are submitted and verified!</p>
          </div>
        </div>

        {/* Total Payable */}
        <div className="col-span-4">
          <TotalPayableChart data={companyData.totalPayable} />
        </div>

        {/* Group-wise Average Usage */}
        <div className="col-span-5">
          <DepartmentUsage departments={companyData.departments} />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails; 
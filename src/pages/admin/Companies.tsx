import React, { useState, useMemo } from 'react';
import { FiSearch, FiFilter, FiPlus, FiEye } from 'react-icons/fi';
import CompanyDetailsModal from '../../components/CompanyDetailsModal';
import AddCompany from './AddCompany';

const TABS = [
  { id: 'all', label: 'All Companies' },
  { id: 'active', label: 'Active' },
  { id: 'pending', label: 'Pending' },
  { id: 'suspended', label: 'Suspended' },
] as const;

const PAGE_SIZE = 10;

interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  employees: number;
  joinDate: string;
}

export const Companies = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Sample data - replace with actual API call
  const companies: Company[] = [
    {
      id: '1',
      name: 'Tech Solutions Ltd',
      email: 'contact@techsolutions.com',
      phone: '+1 (555) 123-4567',
      status: 'Active',
      employees: 150,
      joinDate: '2023-01-15',
    },
    {
      id: '2',
      name: 'Global Innovations Inc',
      email: 'info@globalinnovations.com',
      phone: '+1 (555) 987-6543',
      status: 'Active',
      employees: 200,
      joinDate: '2023-03-20',
    },
    // Add more sample companies as needed
  ];

  // Filtered companies
  const filtered = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.email.toLowerCase().includes(search.toLowerCase());
      const matchesTab = activeTab === 'all' || company.status.toLowerCase() === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [companies, search, activeTab]);

  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => setIsAddModalOpen(true)}
        >
          <FiPlus className="w-5 h-5" />
          Add Company
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
        <div className="flex gap-2">
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center gap-2">
                <FiFilter className="w-5 h-5" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex gap-4 mb-4">
            {TABS.map((tab) => (
            <button
                key={tab.id}
                className={`px-4 py-2 rounded-md ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(tab.id)}
            >
                {tab.label}
            </button>
          ))}
        </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paged.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50 cursor-pointer transition-colors duration-150" onClick={() => handleCompanyClick(company)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{company.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{company.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{company.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        company.status === 'Active' ? 'bg-green-100 text-green-800' :
                        company.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{company.employees}</div>
                </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{company.joinDate}</div>
                </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1 ml-auto"
                      >
                        <FiEye className="w-4 h-4" />
                        Show Details
                      </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

          {paged.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No companies found</p>
            </div>
          )}

      {/* Pagination */}
          {pageCount > 1 && (
            <div className="flex justify-center mt-4">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
                  onClick={() => setPage(page - 1)}
            disabled={page === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
                  Previous
                </button>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === pageNum
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
          </button>
                ))}
          <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === pageCount}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Company Details Modal */}
      {selectedCompany && (
        <CompanyDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          companyName={selectedCompany.name}
        />
      )}

      {/* Add Company Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl mx-auto relative min-h-[80vh] border-4 border-red-500 overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10"
              onClick={() => setIsAddModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <AddCompany />
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies; 
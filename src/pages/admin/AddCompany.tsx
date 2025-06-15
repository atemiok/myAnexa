import React, { useState } from 'react';
import { HiOutlineDocumentAdd, HiCheckCircle, HiUser, HiMail, HiPhone, HiOfficeBuilding, HiUsers, HiCalendar, HiIdentification, HiLocationMarker } from 'react-icons/hi';

const industries = ['Finance', 'Healthcare', 'Technology', 'Education'];
const companyTypes = ['Private', 'Public', 'Non-Profit', 'Government'];

const uploadLabels = [
  { key: 'kra', label: 'KRA PIN' },
  { key: 'cr12', label: 'CR12' },
  { key: 'cert', label: 'Company Registration Certificate' },
  { key: 'other', label: 'Other' },
];

const inputIcons: { [key: string]: React.ReactNode } = {
  companyName: <HiOfficeBuilding className="text-blue-400 w-5 h-5" />, // Company
  industry: <HiIdentification className="text-blue-400 w-5 h-5" />, // Industry
  employees: <HiUsers className="text-blue-400 w-5 h-5" />, // Employees
  companyType: <HiIdentification className="text-blue-400 w-5 h-5" />, // Type
  contactNumber: <HiPhone className="text-blue-400 w-5 h-5" />, // Phone
  email: <HiMail className="text-blue-400 w-5 h-5" />, // Email
  address: <HiLocationMarker className="text-blue-400 w-5 h-5" />, // Address
  salaryDate: <HiCalendar className="text-blue-400 w-5 h-5" />, // Date
  managerFirstName: <HiUser className="text-blue-400 w-5 h-5" />, // First Name
  managerLastName: <HiUser className="text-blue-400 w-5 h-5" />, // Last Name
  managerContact: <HiPhone className="text-blue-400 w-5 h-5" />, // Phone
  managerEmail: <HiMail className="text-blue-400 w-5 h-5" />, // Email
};

const AddCompany: React.FC = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    companyName: '',
    industry: '',
    employees: '',
    companyType: '',
    contactNumber: '',
    email: '',
    address: '',
    salaryDate: '',
    monthlyLimit: 50,
    serviceCharges: 2,
    autoApproval: false,
    managerFirstName: '',
    managerLastName: '',
    managerContact: '',
    managerEmail: '',
  });
  const [uploads, setUploads] = useState<{ [key: string]: File | null }>({
    kra: null,
    cr12: null,
    cert: null,
    other: null,
  });
  const [showSalaryDropdown, setShowSalaryDropdown] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (key: string, file: File | null) => {
    setUploads((prev) => ({ ...prev, [key]: file }));
  };

  // --- Step 1: Company Details Form ---
  if (step === 1) {
    return (
      <div className="w-full p-0">
        {/* Header */}
        <div className="flex items-center px-8 pt-8 pb-4">
          <span className="text-blue-600 text-3xl mr-3"><HiOutlineDocumentAdd /></span>
          <h1 className="text-3xl font-bold text-blue-700">Add Company</h1>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-gray-700">
            <span className="font-medium">William Atemi</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-2 pb-4">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* General Details */}
            <div className="md:col-span-2 bg-blue-50/40 rounded-2xl shadow-lg p-8 border border-blue-100">
              <h2 className="text-xl font-bold text-blue-700 mb-6 flex items-center gap-2">
                <HiOutlineDocumentAdd className="text-blue-400 w-6 h-6" /> General Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                {/* Company Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="companyName">Company Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">{inputIcons.companyName}</span>
                    <input id="companyName" name="companyName" value={form.companyName} onChange={handleChange} className="input pl-10" />
                  </div>
                </div>
                {/* Industry */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="industry">Industry</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">{inputIcons.industry}</span>
                    <select id="industry" name="industry" value={form.industry} onChange={handleChange} className="input pl-10">
                      <option value="">Select Industry</option>
                      {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                  </div>
                </div>
                {/* Employees */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="employees">Number of Employees</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">{inputIcons.employees}</span>
                    <input id="employees" name="employees" value={form.employees} onChange={handleChange} className="input pl-10" />
                  </div>
                </div>
                {/* Company Type */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="companyType">Company Type</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">{inputIcons.companyType}</span>
                    <select id="companyType" name="companyType" value={form.companyType} onChange={handleChange} className="input pl-10">
                      <option value="">Company Type</option>
                      {companyTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                </div>
                {/* Contact Number */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="contactNumber">Official Contact Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">{inputIcons.contactNumber}</span>
                    <input id="contactNumber" name="contactNumber" value={form.contactNumber} onChange={handleChange} className="input pl-10" />
                  </div>
                </div>
                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Official Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">{inputIcons.email}</span>
                    <input id="email" name="email" value={form.email} onChange={handleChange} className="input pl-10" />
                  </div>
                </div>
                {/* Address */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="address">Head Office Address</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">{inputIcons.address}</span>
                    <input id="address" name="address" value={form.address} onChange={handleChange} className="input pl-10" />
                  </div>
                </div>
                {/* Salary Date */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="salaryDate">Salary Date</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">{inputIcons.salaryDate}</span>
                    <button
                      type="button"
                      className={`input pl-10 flex items-center justify-between cursor-pointer ${showSalaryDropdown ? 'border-blue-500' : ''}`}
                      onClick={() => setShowSalaryDropdown((v) => !v)}
                    >
                      <span>{form.salaryDate ? `Day ${form.salaryDate}` : 'Select Day'}</span>
                      <HiCalendar className="ml-2 text-blue-400 w-5 h-5" />
                    </button>
                    {showSalaryDropdown && (
                      <div className="absolute left-0 right-0 mt-1 bg-white border-2 border-blue-400 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                        {[...Array(30)].map((_, i) => (
                          <div
                            key={i + 1}
                            className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${form.salaryDate === String(i + 1) ? 'bg-blue-100 font-bold' : ''}`}
                            onClick={() => {
                              setForm((prev) => ({ ...prev, salaryDate: String(i + 1) }));
                              setShowSalaryDropdown(false);
                            }}
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mt-2">
                <div>
                  <label className="block text-gray-500 text-xs mb-1">Monthly Limit</label>
                  <div className="flex items-center gap-2">
                    <input type="range" name="monthlyLimit" min={0} max={100} value={form.monthlyLimit} onChange={handleChange} className="w-full accent-sky-400" />
                    <span className="text-blue-500 font-semibold text-sm w-10">{form.monthlyLimit} %</span>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-500 text-xs mb-1">Service Charges</label>
                  <div className="flex items-center gap-2">
                    <input type="range" name="serviceCharges" min={0} max={10} value={form.serviceCharges} onChange={handleChange} className="w-full accent-sky-400" />
                    <span className="text-blue-500 font-semibold text-sm w-10">{form.serviceCharges} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-6 md:mt-0">
                  <label className="text-gray-500 text-xs">Auto-Approval</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="autoApproval" checked={form.autoApproval} onChange={handleChange} className="sr-only peer" />
                    <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 transition-all duration-200"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow peer-checked:translate-x-4 transition-all duration-200"></div>
                  </label>
                </div>
              </div>
            </div>
            {/* Account Manager Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-50 flex flex-col justify-between">
              <h2 className="text-xl font-bold text-blue-700 mb-6 flex items-center gap-2">
                <HiOutlineDocumentAdd className="text-blue-400 w-6 h-6" /> Account Manager Details
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="managerFirstName">First Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">{inputIcons.managerFirstName}</span>
                    <input id="managerFirstName" name="managerFirstName" value={form.managerFirstName} onChange={handleChange} className="input pl-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="managerLastName">Last Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">{inputIcons.managerLastName}</span>
                    <input id="managerLastName" name="managerLastName" value={form.managerLastName} onChange={handleChange} className="input pl-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="managerContact">Contact Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">{inputIcons.managerContact}</span>
                    <input id="managerContact" name="managerContact" value={form.managerContact} onChange={handleChange} className="input pl-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="managerEmail">Company Email</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">{inputIcons.managerEmail}</span>
                    <input id="managerEmail" name="managerEmail" value={form.managerEmail} onChange={handleChange} className="input pl-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex flex-col items-center pb-2 pt-2">
          <div className="flex gap-2 mb-2">
            <div className="w-16 h-2 rounded-full bg-blue-300" />
            <div className="w-16 h-2 rounded-full bg-blue-100" />
            <div className="w-16 h-2 rounded-full bg-blue-100" />
          </div>
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full px-10 py-3 text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-blue-800 transition flex items-center gap-2"
            onClick={() => setStep(2)}
          >
            Next
          </button>
        </div>
        {/* Tailwind input style */}
        <style>{`
          .input {
            @apply w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder-gray-400 transition;
          }
          .input:focus {
            @apply border-blue-500 bg-blue-50;
          }
        `}</style>
      </div>
    );
  }

  // --- Step 2: Document Upload ---
  return (
    <div className="w-full p-0">
      <div className="flex items-center px-8 pt-8 pb-4">
        <span className="text-blue-600 text-3xl mr-3"><HiOutlineDocumentAdd /></span>
        <h1 className="text-3xl font-bold text-blue-700">Upload Company Documents</h1>
        <div className="flex-1" />
        <button
          className="text-blue-600 hover:text-blue-800 font-semibold text-base border border-blue-200 rounded-lg px-4 py-1 transition ml-4"
          onClick={() => setStep(1)}
        >
          &larr; Back
        </button>
      </div>
      <div className="flex flex-col items-center justify-center px-2 pb-4">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          {uploadLabels.map(({ key, label }) => (
            <div key={key} className="bg-white rounded-2xl shadow-lg p-8 border border-blue-50 flex flex-col items-center justify-center min-h-[200px]">
              <HiOutlineDocumentAdd className="text-blue-400 w-10 h-10 mb-2" />
              <div className="font-semibold text-gray-800 mb-2 text-lg">{label}</div>
              <label className="cursor-pointer flex flex-col items-center">
                <input
                  type="file"
                  className="hidden"
                  onChange={e => handleFileChange(key, e.target.files?.[0] || null)}
                />
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-blue-700 font-medium transition">
                  <HiOutlineDocumentAdd className="w-5 h-5" />
                  {uploads[key] ? 'Change File' : 'Upload File'}
                </div>
              </label>
              {uploads[key] && (
                <div className="mt-3 flex items-center gap-2 text-green-600 text-sm">
                  <HiCheckCircle className="w-5 h-5" />
                  <span>{uploads[key]?.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Footer */}
        <div className="flex flex-col items-center pb-2 pt-8">
          <div className="flex gap-2 mb-2">
            <div className="w-16 h-2 rounded-full bg-blue-300" />
            <div className="w-16 h-2 rounded-full bg-blue-300" />
            <div className="w-16 h-2 rounded-full bg-blue-100" />
          </div>
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full px-10 py-3 text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-blue-800 transition flex items-center gap-2"
            // onClick={handleSubmit} // Implement submission logic here
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompany; 
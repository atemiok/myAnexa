import React, { useState } from 'react';

interface SettingsForm {
  companyName: string;
  adminEmail: string;
  notificationEmail: string;
  maxLoanAmount: number;
  minLoanAmount: number;
  interestRate: number;
  processingFee: number;
  latePaymentFee: number;
  gracePeriod: number;
  autoApproveLoans: boolean;
  requireDocumentation: boolean;
  enableNotifications: boolean;
}

export function Settings() {
  const [form, setForm] = useState<SettingsForm>({
    companyName: 'MyAnexa',
    adminEmail: 'admin@myanexa.com',
    notificationEmail: 'notifications@myanexa.com',
    maxLoanAmount: 5000,
    minLoanAmount: 1000,
    interestRate: 5.5,
    processingFee: 2.5,
    latePaymentFee: 10,
    gracePeriod: 5,
    autoApproveLoans: false,
    requireDocumentation: true,
    enableNotifications: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement settings update
    console.log('Settings updated:', form);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <button
          type="submit"
          form="settings-form"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      <form id="settings-form" onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Admin Email</label>
              <input
                type="email"
                name="adminEmail"
                value={form.adminEmail}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notification Email</label>
              <input
                type="email"
                name="notificationEmail"
                value={form.notificationEmail}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Loan Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Maximum Loan Amount</label>
              <input
                type="number"
                name="maxLoanAmount"
                value={form.maxLoanAmount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Minimum Loan Amount</label>
              <input
                type="number"
                name="minLoanAmount"
                value={form.minLoanAmount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
              <input
                type="number"
                name="interestRate"
                value={form.interestRate}
                onChange={handleChange}
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Processing Fee (%)</label>
              <input
                type="number"
                name="processingFee"
                value={form.processingFee}
                onChange={handleChange}
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Late Payment Fee (%)</label>
              <input
                type="number"
                name="latePaymentFee"
                value={form.latePaymentFee}
                onChange={handleChange}
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Grace Period (days)</label>
              <input
                type="number"
                name="gracePeriod"
                value={form.gracePeriod}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">System Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="autoApproveLoans"
                checked={form.autoApproveLoans}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="ml-2 block text-sm text-gray-900">Auto-approve loans under maximum amount</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="requireDocumentation"
                checked={form.requireDocumentation}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="ml-2 block text-sm text-gray-900">Require documentation for all loans</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="enableNotifications"
                checked={form.enableNotifications}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="ml-2 block text-sm text-gray-900">Enable email notifications</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 
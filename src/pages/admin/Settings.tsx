import React, { useState } from 'react';

const TABS = [
  { label: 'General', value: 'general' },
  { label: 'Services', value: 'services' },
  { label: 'Paybill Vendors', value: 'paybill' },
];

const EMAIL_TEMPLATES = [
  { label: 'Account Made', value: 'account_made', content: `Hi [Client Name],\n\nYour account has been created at MyAnexa.\n\nYour password is: [Password]\n\nhttp://myanexa.co/employer-login\n\nRegards,  \nTeam MyAnexa` },
  { label: 'Employee Account Made', value: 'employee_account_made', content: 'Hi [Employee],\n\nYour employee account has been created.\n\nRegards,\nTeam MyAnexa' },
  { label: 'Email Changed', value: 'email_changed', content: 'Hi [User],\n\nYour email has been changed.\n\nIf this was not you, please contact support.' },
  { label: 'Account Verification', value: 'account_verification', content: 'Hi [User],\n\nPlease verify your account using the link below.' },
  { label: 'Documents Upload', value: 'documents_upload', content: 'Hi [User],\n\nYour documents have been uploaded.' },
  { label: 'Company Signup', value: 'company_signup', content: 'Hi [Admin],\n\nA new company has signed up.' },
  { label: 'Company Verification', value: 'company_verification', content: 'Hi [Admin],\n\nA company is pending verification.' },
  { label: 'New Advance Request', value: 'new_advance_request', content: 'Hi [Admin],\n\nA new advance request has been submitted.' },
  { label: 'Company Uploaded Documents', value: 'company_uploaded_documents', content: 'Hi [Admin],\n\nA company has uploaded new documents.' },
  { label: 'Payday Reminder', value: 'payday_reminder', content: 'Hi [Employee],\n\nThis is your payday reminder.' },
  { label: 'Reset Password', value: 'reset_password', content: 'Hi [User],\n\nYou can reset your password using the link below.' },
  { label: 'Notify Admin of Company Inquiry', value: 'notify_admin_company_inquiry', content: 'Hi Admin,\n\nA new company inquiry has been received.' },
  { label: 'Myanexa Monthly Email Reports', value: 'myanexa_monthly_email_reports', content: 'Hi [User],\n\nHere is your monthly email report.' },
  { label: 'Invoice Followup', value: 'invoice_followup', content: 'Hi [User],\n\nThis is a followup regarding your invoice.' },
  { label: 'Admin Invoice Followup Reminder', value: 'admin_invoice_followup_reminder', content: 'Hi Admin,\n\nThis is a reminder to follow up on an invoice.' },
  { label: 'OTP Verification', value: 'otp_verification', content: 'Hi [User],\n\nYour OTP code is: [OTP]' },
  { label: 'New Company Assigned', value: 'new_company_assigned', content: 'Hi [User],\n\nA new company has been assigned to you.' },
  { label: 'Employee Account Disabled', value: 'employee_account_disabled', content: 'Hi [Employee],\n\nYour account has been disabled.' },
  { label: 'Employee USSD Password Reset', value: 'employee_ussd_password_reset', content: 'Hi [Employee],\n\nYour USSD password has been reset.' },
  { label: 'Employee Wallet Addition', value: 'employee_wallet_addition', content: 'Hi [Employee],\n\nFunds have been added to your wallet.' },
  { label: 'Employee Wallet Creation', value: 'employee_wallet_creation', content: 'Hi [Employee],\n\nYour wallet has been created.' },
  { label: 'Company Sacco Setup', value: 'company_sacco_setup', content: 'Hi [Admin],\n\nYour company SACCO has been set up.' },
  { label: 'MPESA Low Balance', value: 'mpesa_low_balance', content: 'Hi [Admin],\n\nYour MPESA balance is low.' },
  { label: 'MPESA Invalid Initiator Information', value: 'mpesa_invalid_initiator_information', content: 'Hi [Admin],\n\nMPESA initiator information is invalid.' },
  { label: 'Payroll Financing Activation', value: 'payroll_financing_activation', content: 'Hi [User],\n\nPayroll financing has been activated.' },
  { label: 'Payroll Financing Activation Revision', value: 'payroll_financing_activation_revision', content: 'Hi [User],\n\nPayroll financing activation requires revision.' },
  { label: 'Payroll Financing Activation Revised', value: 'payroll_financing_activation_revised', content: 'Hi [User],\n\nPayroll financing activation has been revised.' },
  { label: 'Payroll Financing Activation Approved', value: 'payroll_financing_activation_approved', content: 'Hi [User],\n\nPayroll financing activation has been approved.' },
  { label: 'Payroll Financing Documentation Expired', value: 'payroll_financing_documentation_expired', content: 'Hi [User],\n\nPayroll financing documentation has expired.' },
  { label: 'New Payroll Financing Request', value: 'new_payroll_financing_request', content: 'Hi [Admin],\n\nA new payroll financing request has been submitted.' },
  { label: 'Payroll Financing Request Declined', value: 'payroll_financing_request_declined', content: 'Hi [User],\n\nYour payroll financing request has been declined.' },
  { label: 'Payroll Financing Request Incomplete', value: 'payroll_financing_request_incomplete', content: 'Hi [User],\n\nYour payroll financing request is incomplete.' },
  { label: 'Payroll Financing Request Success', value: 'payroll_financing_request_success', content: 'Hi [User],\n\nYour payroll financing request was successful.' },
  { label: 'Payroll Finance Request Review', value: 'payroll_finance_request_review', content: 'Hi [Admin],\n\nA payroll finance request needs review.' },
  { label: 'Payroll Finance Request Confirmed', value: 'payroll_finance_request_confirmed', content: 'Hi [User],\n\nYour payroll finance request has been confirmed.' },
  { label: 'Salary Advance Invoice - Paid', value: 'salary_advance_invoice_paid', content: 'Hi [User],\n\nYour salary advance invoice has been paid.' },
  { label: 'Payroll Finance Request Pricing Revision', value: 'payroll_finance_request_pricing_revision', content: 'Hi [User],\n\nPayroll finance request pricing requires revision.' },
  { label: 'Payroll Finance Invoice', value: 'payroll_finance_invoice', content: 'Hi [User],\n\nHere is your payroll finance invoice.' },
  { label: 'Multiple Unsuccessful Password Attempts', value: 'multiple_unsuccessful_password_attempts', content: 'Hi [User],\n\nThere have been multiple unsuccessful password attempts.' },
  { label: 'Multiple Unsuccessful Password Attempts Admin', value: 'multiple_unsuccessful_password_attempts_admin', content: 'Hi Admin,\n\nThere have been multiple unsuccessful password attempts.' },
  { label: 'New Loan Request', value: 'new_loan_request', content: 'Hi [Admin],\n\nA new loan request has been submitted.' },
  { label: 'Employee Loan Request Confirmed', value: 'employee_loan_request_confirmed', content: 'Hi [Employee],\n\nYour loan request has been confirmed.' },
  { label: 'Employee Loan Disburement Failure', value: 'employee_loan_disbursement_failure', content: 'Hi [Employee],\n\nYour loan disbursement has failed.' },
  { label: 'Loan Request Declined', value: 'loan_request_declined', content: 'Hi [Employee],\n\nYour loan request has been declined.' },
  { label: 'Invoice Late Penalty Fee', value: 'invoice_late_penalty_fee', content: 'Hi [User],\n\nA late penalty fee has been applied to your invoice.' },
];

function Switch({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <span className="text-gray-700 text-sm font-medium">{label}</span>
      <button
        type="button"
        className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${checked ? 'bg-indigo-600' : 'bg-gray-300'}`}
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
      >
        <span
          className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${checked ? 'translate-x-4' : ''}`}
        />
      </button>
    </label>
  );
}

export function Settings() {
  const [tab, setTab] = useState<'general' | 'services' | 'paybill'>('general');

  // General toggles
  const [notifySignup, setNotifySignup] = useState(true);
  const [notifyDocs, setNotifyDocs] = useState(false);
  const [monthlyReports, setMonthlyReports] = useState(true);
  const [followupReminders, setFollowupReminders] = useState(false);
  const [employeeLoansMax, setEmployeeLoansMax] = useState(300000);
  const [transactionFee, setTransactionFee] = useState(2);
  const [emailTemplate, setEmailTemplate] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [defaultCurrency, setDefaultCurrency] = useState('USD');
  const [timeZone, setTimeZone] = useState('UTC');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');

  // Services toggles
  const [salaryAdvance, setSalaryAdvance] = useState(true);
  const [paybill, setPaybill] = useState(true);
  const [earlyRepayment, setEarlyRepayment] = useState(false);
  const [wallet, setWallet] = useState(true);
  const [employeeLoans, setEmployeeLoans] = useState(true);

  // Handle email template change
  function handleTemplateChange(templateValue: string, content: string) {
    setEmailTemplate(templateValue);
    setEmailContent(content);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 font-sans">
      <div className="mb-6 flex gap-4 border-b">
        {TABS.map(t => (
          <button
            key={t.value}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition focus:outline-none ${tab === t.value ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-indigo-600'}`}
            onClick={() => setTab(t.value as typeof tab)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'general' && (
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Company Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
          </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Email</label>
            <input
                      type="email"
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Phone</label>
            <input
                      type="tel"
                      value={companyPhone}
                      onChange={(e) => setCompanyPhone(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Address</label>
                    <textarea
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">System Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Default Currency</label>
                    <select
                      value={defaultCurrency}
                      onChange={(e) => setDefaultCurrency(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time Zone</label>
                    <select
                      value={timeZone}
                      onChange={(e) => setTimeZone(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">EST</option>
                      <option value="PST">PST</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date Format</label>
            <select
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Email Templates</h3>
              <div className="space-y-4">
                {EMAIL_TEMPLATES.map((template) => (
                  <div key={template.value} className="border rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {template.label}
                    </label>
            <textarea
                      value={template.content}
                      onChange={(e) => handleTemplateChange(template.value, e.target.value)}
                      rows={4}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {tab === 'services' && (
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Service Management</h2>
                <p className="text-sm text-gray-500 mt-1">Configure and manage available services for your organization</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Reset to Default
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Save Changes
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Salary Advance Service */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">Salary Advance</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Allow employees to request salary advances before their payday. Configure limits and approval workflows.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Status: <span className={`font-medium ${salaryAdvance ? 'text-green-600' : 'text-red-600'}`}>{salaryAdvance ? 'Active' : 'Disabled'}</span></span>
                      <Switch checked={salaryAdvance} onChange={setSalaryAdvance} />
                    </div>
                  </div>
                  {salaryAdvance && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Advance Amount</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Processing Fee (%)</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                          placeholder="Enter percentage"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pay Bill Service */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">Pay Bill / Buy Goods</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Enable employees to pay bills and make purchases directly through the platform.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Status: <span className={`font-medium ${paybill ? 'text-green-600' : 'text-red-600'}`}>{paybill ? 'Active' : 'Disabled'}</span></span>
                      <Switch checked={paybill} onChange={setPaybill} />
                    </div>
                  </div>
                  {paybill && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Fee (%)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                        placeholder="Enter percentage"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Early Repayment Service */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">Early Advance Repayment</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Allow employees to repay their advances before the due date with adjusted interest rates.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Status: <span className={`font-medium ${earlyRepayment ? 'text-green-600' : 'text-red-600'}`}>{earlyRepayment ? 'Active' : 'Disabled'}</span></span>
                      <Switch checked={earlyRepayment} onChange={setEarlyRepayment} />
                    </div>
                  </div>
                  {earlyRepayment && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Early Repayment Discount (%)</label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                        placeholder="Enter discount percentage"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Wallet Service */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">Wagelyft Wallet</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Provide employees with a digital wallet for managing their finances and transactions.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Status: <span className={`font-medium ${wallet ? 'text-green-600' : 'text-red-600'}`}>{wallet ? 'Active' : 'Disabled'}</span></span>
                      <Switch checked={wallet} onChange={setWallet} />
                    </div>
                  </div>
                  {wallet && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Balance</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Limit</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Employee Loans Service */}
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">Employee Loans</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Enable long-term loan facilities for employees with customizable terms and conditions.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">Status: <span className={`font-medium ${employeeLoans ? 'text-green-600' : 'text-red-600'}`}>{employeeLoans ? 'Active' : 'Disabled'}</span></span>
                      <Switch checked={employeeLoans} onChange={setEmployeeLoans} />
                    </div>
                  </div>
                  {employeeLoans && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Loan Amount</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
                          placeholder="Enter percentage"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Service Status</h3>
                  <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {Object.values({ salaryAdvance, paybill, earlyRepayment, wallet, employeeLoans }).filter(Boolean).length} Services Enabled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {tab === 'paybill' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Paybill Vendors</h2>
            <div className="mt-4">Coming soon...</div>
          </div>
        </div>
      )}
    </div>
  );
} 
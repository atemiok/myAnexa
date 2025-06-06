import React, { useState } from 'react';

const TABS = [
  { label: 'General', value: 'general' },
  { label: 'Services', value: 'services' },
  { label: 'Paybill Vendors', value: 'paybill' },
];

const EMAIL_TEMPLATES = [
  { label: 'Account Made', value: 'account_made', content: `Hi [Client Name],\n\nYour account has been created at Wagelyft.\n\nYour password is: [Password]\n\nhttp://wagelyft.co/employer-login\n\nRegards,  \nTeam Wagelyft` },
  { label: 'Employee Account Made', value: 'employee_account_made', content: 'Hi [Employee],\n\nYour employee account has been created.\n\nRegards,\nTeam Wagelyft' },
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
  const [emailTemplate, setEmailTemplate] = useState(EMAIL_TEMPLATES[0].value);
  const [emailContent, setEmailContent] = useState(EMAIL_TEMPLATES[0].content);

  // Services toggles
  const [salaryAdvance, setSalaryAdvance] = useState(true);
  const [paybill, setPaybill] = useState(true);
  const [earlyRepayment, setEarlyRepayment] = useState(false);
  const [wallet, setWallet] = useState(true);
  const [employeeLoans, setEmployeeLoans] = useState(true);

  // Handle email template change
  function handleTemplateChange(val: string) {
    setEmailTemplate(val);
    const found = EMAIL_TEMPLATES.find(t => t.value === val);
    setEmailContent(found ? found.content : '');
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
          {/* General Settings */}
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2">General Settings</h2>
            <Switch checked={notifySignup} onChange={setNotifySignup} label="Notify when a company signs up" />
            <Switch checked={notifyDocs} onChange={setNotifyDocs} label="Notify when a company uploads documents" />
            <Switch checked={monthlyReports} onChange={setMonthlyReports} label="Receive Monthly Reports on Email" />
            <Switch checked={followupReminders} onChange={setFollowupReminders} label="Receive follow-up reminders" />
          </div>
          {/* Employee Loans Max */}
          <div className="bg-white rounded-xl shadow p-6 space-y-2">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Employee Loans Max</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (KSh)</label>
            <input
              type="number"
              className="w-40 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
              value={employeeLoansMax}
              min={0}
              onChange={e => setEmployeeLoansMax(Number(e.target.value))}
            />
          </div>
          {/* Service Rates */}
          <div className="bg-white rounded-xl shadow p-6 space-y-2">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Service Rates</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Fee (%)</label>
            <input
              type="number"
              className="w-32 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm"
              value={transactionFee}
              min={0}
              step={0.01}
              onChange={e => setTransactionFee(Number(e.target.value))}
            />
          </div>
          {/* Email Templates */}
          <div className="bg-white rounded-xl shadow p-6 space-y-2">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Email Templates</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Template</label>
            <select
              className="w-60 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm mb-2"
              value={emailTemplate}
              onChange={e => handleTemplateChange(e.target.value)}
            >
              {EMAIL_TEMPLATES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <textarea
              className="w-full min-h-[120px] px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-sm font-mono"
              value={emailContent}
              onChange={e => setEmailContent(e.target.value)}
            />
          </div>
        </div>
      )}
      {tab === 'services' && (
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Toggle Services Globally</h2>
            <Switch checked={salaryAdvance} onChange={setSalaryAdvance} label="Salary Advance" />
            <Switch checked={paybill} onChange={setPaybill} label="Pay Bill / Buy Goods" />
            <Switch checked={earlyRepayment} onChange={setEarlyRepayment} label="Early Advance Repayment" />
            <Switch checked={wallet} onChange={setWallet} label="Wagelyft Wallet" />
            <Switch checked={employeeLoans} onChange={setEmployeeLoans} label="Employee Loans" />
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
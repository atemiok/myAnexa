import React, { useState } from 'react';
import { usePayrollFinancing, PayrollFinancingData } from '../../hooks/employer/usePayrollFinancing';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';

export function PayrollFinancing() {
  const { data, isLoading } = usePayrollFinancing();
  const [termsAccepted, setTermsAccepted] = useState(false);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  const { isActivated, documents, settings } = data;

  return (
    <div className="space-y-6">
      {!isActivated && (
        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-indigo-700">
                Activation needed. Please complete the setup process to enable payroll financing.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Required Documents</h2>
            <div className="space-y-4">
              {documents.map((doc: PayrollFinancingData['documents'][0]) => (
                <div
                  key={doc.id}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
                >
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">{doc.name}</div>
                    <div className="text-sm font-medium text-gray-900">{doc.type}</div>
                    <div className="text-sm text-gray-500">Status: {doc.status}</div>
                    <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                      Upload Document
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Financing Range</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Range</label>
                <Listbox value={settings.minAmount} onChange={() => {}}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">${settings.minAmount} - ${settings.maxAmount}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                          }`
                        }
                        value={settings.minAmount}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              ${settings.minAmount} - ${settings.maxAmount}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Financing Terms</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Interest Rate</dt>
                <dd className="mt-1 text-sm text-gray-900">{settings.interestRate}%</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Processing Fee</dt>
                <dd className="mt-1 text-sm text-gray-900">${settings.processingFee}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Late Payment Fee</dt>
                <dd className="mt-1 text-sm text-gray-900">${settings.latePaymentFee}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Grace Period</dt>
                <dd className="mt-1 text-sm text-gray-900">{settings.gracePeriod} days</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    I agree to the terms and conditions
                  </label>
                  <p className="text-gray-500">
                    By checking this box, you agree to our financing terms and conditions.
                  </p>
                </div>
              </div>

              <button
                disabled={!termsAccepted}
                className={`w-full px-4 py-2 rounded-md text-white ${
                  termsAccepted
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Activate Payroll Financing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
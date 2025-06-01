import { useQuery } from '@tanstack/react-query';
import { db } from '../../api/supa';

export interface PayrollFinancingData {
  isActivated: boolean;
  documents: {
    id: string;
    name: string;
    type: string;
    status: 'pending' | 'uploaded' | 'verified';
    uploadDate?: string;
    verifiedDate?: string;
  }[];
  settings: {
    minAmount: number;
    maxAmount: number;
    interestRate: number;
    processingFee: number;
    latePaymentFee: number;
    gracePeriod: number;
  };
  stats: {
    totalFinanced: number;
    activeLoans: number;
    pendingRequests: number;
    overduePayments: number;
  };
}

export function usePayrollFinancing() {
  return useQuery({
    queryKey: ['employer_payroll_financing'],
    queryFn: async () => {
      if (import.meta.env.MODE === 'development') {
        return {
          isActivated: false,
          documents: [
            {
              id: 'doc-1',
              name: 'Business Registration',
              type: 'registration',
              status: 'pending',
            },
            {
              id: 'doc-2',
              name: 'Financial Statements',
              type: 'financial',
              status: 'pending',
            },
            {
              id: 'doc-3',
              name: 'Bank Statements',
              type: 'bank',
              status: 'pending',
            },
          ],
          settings: {
            minAmount: 1000,
            maxAmount: 5000,
            interestRate: 5.5,
            processingFee: 2.5,
            latePaymentFee: 10,
            gracePeriod: 5,
          },
          stats: {
            totalFinanced: 0,
            activeLoans: 0,
            pendingRequests: 0,
            overduePayments: 0,
          },
        };
      }
      const { data, error } = await db.from('payroll_financing').select('*').single();
      if (error) throw error;
      return data;
    },
  });
} 
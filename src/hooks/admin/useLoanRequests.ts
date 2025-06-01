import { useQuery } from '@tanstack/react-query';

export type LoanStatus = 'pending' | 'confirmed' | 'running' | 'completed' | 'rejected';

export interface LoanRequest {
  id: string;
  companyName: string;
  employeeName: string;
  amount: number;
  status: LoanStatus;
  requestDate: string;
  approvedDate?: string;
  startDate?: string;
  endDate?: string;
  monthlyPayment: number;
  totalPayments: number;
  paidAmount: number;
}

const dummyRequests: LoanRequest[] = Array.from({ length: 30 }, (_, i) => ({
  id: `loan-${i + 1}`,
  companyName: `Company ${Math.floor(i / 3) + 1}`,
  employeeName: `Employee ${i + 1}`,
  amount: Math.floor(Math.random() * 5000) + 1000,
  status: ['pending', 'confirmed', 'running', 'completed', 'rejected'][Math.floor(Math.random() * 5)] as LoanStatus,
  requestDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  approvedDate: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString() : undefined,
  startDate: Math.random() > 0.4 ? new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString() : undefined,
  endDate: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
  monthlyPayment: Math.floor(Math.random() * 500) + 100,
  totalPayments: Math.floor(Math.random() * 3000) + 1000,
  paidAmount: Math.floor(Math.random() * 2000) + 500,
}));

interface LoanRequestsResponse {
  requests: LoanRequest[];
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    running: number;
  };
}

export function useLoanRequests(status?: LoanStatus) {
  return useQuery({
    queryKey: ['admin_loan_requests', status],
    queryFn: () => {
      const filtered = status ? dummyRequests.filter(req => req.status === status) : dummyRequests;
      
      const stats = {
        total: dummyRequests.length,
        pending: dummyRequests.filter(req => req.status === 'pending').length,
        confirmed: dummyRequests.filter(req => req.status === 'confirmed').length,
        running: dummyRequests.filter(req => req.status === 'running').length,
      };
      
      return Promise.resolve({
        requests: filtered,
        stats,
      } as LoanRequestsResponse);
    },
  });
} 
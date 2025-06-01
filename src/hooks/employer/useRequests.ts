import { useQuery } from '@tanstack/react-query';
import { db } from '../../api/supa';

export type RequestType = 'advance' | 'loan';
export type RequestStatus = 'pending' | 'approved' | 'declined';

export interface Request {
  id: string;
  employeeName: string;
  type: RequestType;
  amount: number;
  status: RequestStatus;
  requestDate: string;
  approvedDate?: string;
  declinedDate?: string;
  reason?: string;
  monthlyPayment?: number;
  totalPayments?: number;
  paidAmount?: number;
}

export interface RequestsResponse {
  requests: Request[];
  stats: {
    total: number;
    pending: number;
    approved: number;
    declined: number;
  };
}

export function useRequests(status?: RequestStatus, type?: RequestType) {
  return useQuery({
    queryKey: ['employer_requests', status, type],
    queryFn: async () => {
      if (import.meta.env.MODE === 'development') {
        const dummyRequests: Request[] = Array.from({ length: 30 }, (_, i) => ({
          id: `req-${i + 1}`,
          employeeName: `Employee ${i + 1}`,
          type: Math.random() > 0.5 ? 'advance' : 'loan',
          amount: Math.floor(Math.random() * 5000) + 1000,
          status: ['pending', 'approved', 'declined'][Math.floor(Math.random() * 3)] as RequestStatus,
          requestDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          approvedDate: Math.random() > 0.6 ? new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString() : undefined,
          declinedDate: Math.random() > 0.7 ? new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString() : undefined,
          reason: Math.random() > 0.5 ? `Reason for request ${i + 1}` : undefined,
          monthlyPayment: Math.floor(Math.random() * 500) + 100,
          totalPayments: Math.floor(Math.random() * 3000) + 1000,
          paidAmount: Math.floor(Math.random() * 2000) + 500,
        }));

        let filtered = [...dummyRequests];
        
        if (status) {
          filtered = filtered.filter(req => req.status === status);
        }
        
        if (type) {
          filtered = filtered.filter(req => req.type === type);
        }
        
        const stats = {
          total: dummyRequests.length,
          pending: dummyRequests.filter(req => req.status === 'pending').length,
          approved: dummyRequests.filter(req => req.status === 'approved').length,
          declined: dummyRequests.filter(req => req.status === 'declined').length,
        };
        
        return { requests: filtered, stats };
      }

      let query = db.from('requests').select('*');
      
      if (status) {
        query = query.eq('status', status);
      }
      
      if (type) {
        query = query.eq('type', type);
      }
      
      const { data: requests, error } = await query;
      if (error) throw error;

      const stats = {
        total: requests.length,
        pending: requests.filter(req => req.status === 'pending').length,
        approved: requests.filter(req => req.status === 'approved').length,
        declined: requests.filter(req => req.status === 'declined').length,
      };

      return { requests, stats };
    },
  });
} 
import { useQuery } from '@tanstack/react-query';

export type ChangeRequestType = 'employee_info' | 'loan_terms' | 'payment_schedule' | 'company_info';
export type ChangeRequestStatus = 'pending' | 'approved' | 'rejected';

export interface ChangeRequest {
  id: string;
  companyName: string;
  employeeName: string;
  type: ChangeRequestType;
  status: ChangeRequestStatus;
  requestDate: string;
  processedDate?: string;
  description: string;
  currentValue: string;
  requestedValue: string;
  processedBy?: string;
  notes?: string;
}

const dummyRequests: ChangeRequest[] = Array.from({ length: 25 }, (_, i) => ({
  id: `change-${i + 1}`,
  companyName: `Company ${Math.floor(i / 3) + 1}`,
  employeeName: `Employee ${i + 1}`,
  type: ['employee_info', 'loan_terms', 'payment_schedule', 'company_info'][Math.floor(Math.random() * 4)] as ChangeRequestType,
  status: ['pending', 'approved', 'rejected'][Math.floor(Math.random() * 3)] as ChangeRequestStatus,
  requestDate: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString(),
  processedDate: Math.random() > 0.4 ? new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString() : undefined,
  description: `Request to update ${['employee information', 'loan terms', 'payment schedule', 'company information'][Math.floor(Math.random() * 4)]}`,
  currentValue: `Current value ${i + 1}`,
  requestedValue: `New value ${i + 1}`,
  processedBy: Math.random() > 0.4 ? `Admin ${Math.floor(Math.random() * 3) + 1}` : undefined,
  notes: Math.random() > 0.5 ? `Additional notes for request ${i + 1}` : undefined,
}));

interface ChangeRequestsResponse {
  requests: ChangeRequest[];
  stats: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
}

export function useChangeRequests(status?: ChangeRequestStatus, type?: ChangeRequestType) {
  return useQuery({
    queryKey: ['admin_change_requests', status, type],
    queryFn: () => {
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
        rejected: dummyRequests.filter(req => req.status === 'rejected').length,
      };
      
      return Promise.resolve({
        requests: filtered,
        stats,
      } as ChangeRequestsResponse);
    },
  });
} 
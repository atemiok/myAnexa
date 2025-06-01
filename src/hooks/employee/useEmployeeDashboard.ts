import { useQuery } from '@tanstack/react-query';
import { db } from '../../api/supa';

export interface EmployeeDashboardMetrics {
  remainingLimit: number;
  outstanding: number;
  nextDueDate: string;
}

export interface EmployeeRequest {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'declined';
  requestDate: string;
  purpose: string;
}

export interface EmployeeDashboardData {
  metrics: EmployeeDashboardMetrics;
  recentRequests: EmployeeRequest[];
}

export function useEmployeeDashboard() {
  return useQuery({
    queryKey: ['employee_dashboard'],
    queryFn: async () => {
      if (import.meta.env.MODE === 'development') {
        return {
          metrics: {
            remainingLimit: 3500,
            outstanding: 1200,
            nextDueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          },
          recentRequests: [
            {
              id: 'req-1',
              amount: 500,
              status: 'approved',
              requestDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
              purpose: 'Medical emergency',
            },
            {
              id: 'req-2',
              amount: 700,
              status: 'pending',
              requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              purpose: 'Car repair',
            },
          ],
        };
      }
      const { data, error } = await db.from('employee_dashboard').select('*').single();
      if (error) throw error;
      return data;
    },
  });
} 
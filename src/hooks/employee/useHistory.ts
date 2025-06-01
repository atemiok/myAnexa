import { useQuery } from '@tanstack/react-query';
import { db } from '../../api/supa';

export interface EmployeeHistoryItem {
  id: string;
  amount: number;
  status: 'pending' | 'approved' | 'declined';
  requestDate: string;
  purpose: string;
}

export interface HistoryResponse {
  history: EmployeeHistoryItem[];
  stats: {
    total: number;
    pending: number;
    approved: number;
    declined: number;
  };
}

export function useHistory() {
  return useQuery({
    queryKey: ['employee_history'],
    queryFn: async () => {
      if (import.meta.env.MODE === 'development') {
        const dummyHistory: EmployeeHistoryItem[] = Array.from({ length: 20 }, (_, i) => ({
          id: `req-${i + 1}`,
          amount: Math.floor(Math.random() * 5000) + 1000,
          status: ['pending', 'approved', 'declined'][Math.floor(Math.random() * 3)] as 'pending' | 'approved' | 'declined',
          requestDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
          purpose: ['Medical', 'Education', 'Home', 'Car', 'Other'][Math.floor(Math.random() * 5)],
        }));

        const stats = {
          total: dummyHistory.length,
          pending: dummyHistory.filter(item => item.status === 'pending').length,
          approved: dummyHistory.filter(item => item.status === 'approved').length,
          declined: dummyHistory.filter(item => item.status === 'declined').length,
        };

        return { history: dummyHistory, stats };
      }

      const { data: history, error } = await db.from('employee_history').select('*');
      if (error) throw error;

      const stats = {
        total: history.length,
        pending: history.filter(item => item.status === 'pending').length,
        approved: history.filter(item => item.status === 'approved').length,
        declined: history.filter(item => item.status === 'declined').length,
      };

      return { history, stats };
    },
  });
} 
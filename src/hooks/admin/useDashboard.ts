import { useQuery } from '@tanstack/react-query';
import { db } from '../../api/supa';

export interface DashboardMetrics {
  totalCompanies: number;
  activeLoans: number;
  pendingRequests: number;
  totalRevenue: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

export interface DashboardData {
  metrics: DashboardMetrics;
  chartData: ChartData;
}

export function useDashboard() {
  return useQuery({
    queryKey: ['admin_dashboard'],
    queryFn: async () => {
      if (import.meta.env.MODE === 'development') {
        return {
          metrics: {
            totalCompanies: 12,
            activeLoans: 8,
            pendingRequests: 3,
            totalRevenue: 120000,
          },
          chartData: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Companies',
                data: [2, 3, 2, 1, 2, 2],
                borderColor: '#4f46e5',
                backgroundColor: '#e0e7ff',
              },
            ],
          },
        };
      }
      const { data, error } = await db.from('admin_dashboard').select('*').single();
      if (error) throw error;
      return data;
    },
  });
} 
import { useQuery } from '@tanstack/react-query';
import { db } from '../../api/supa';

export interface DashboardMetrics {
  totalEmployees: number;
  activeRequests: number;
  pendingApprovals: number;
  totalFinanced: number;
  monthlyGrowth: number;
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

export interface ActiveRequest {
  id: string;
  employeeName: string;
  type: 'advance' | 'loan';
  amount: number;
  status: 'pending' | 'approved' | 'declined';
  requestDate: string;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  requestsChart: ChartData;
  financingChart: ChartData;
  employeeChart: ChartData;
  activeRequests: ActiveRequest[];
}

export function useEmployerDashboard() {
  return useQuery({
    queryKey: ['employer_dashboard'],
    queryFn: async () => {
      if (import.meta.env.MODE === 'development') {
        return {
          metrics: {
            totalEmployees: 45,
            activeRequests: 12,
            pendingApprovals: 5,
            totalFinanced: 75000,
            monthlyGrowth: 8.5,
          },
          requestsChart: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Requests',
              data: [15, 12, 18, 14, 16, 20],
              borderColor: '#4f46e5',
              backgroundColor: '#e0e7ff',
            }],
          },
          financingChart: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Financing',
              data: [12000, 15000, 18000, 14000, 16000, 20000],
              borderColor: '#059669',
              backgroundColor: '#d1fae5',
            }],
          },
          employeeChart: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Employees',
              data: [35, 38, 40, 42, 43, 45],
              borderColor: '#7c3aed',
              backgroundColor: '#ede9fe',
            }],
          },
          activeRequests: [
            {
              id: 'req-1',
              employeeName: 'John Doe',
              type: 'advance',
              amount: 1000,
              status: 'pending',
              requestDate: '2024-03-15',
            },
            {
              id: 'req-2',
              employeeName: 'Jane Smith',
              type: 'loan',
              amount: 5000,
              status: 'pending',
              requestDate: '2024-03-14',
            },
            {
              id: 'req-3',
              employeeName: 'Mike Johnson',
              type: 'advance',
              amount: 2000,
              status: 'pending',
              requestDate: '2024-03-13',
            },
          ],
        };
      }
      const { data, error } = await db.from('employer_dashboard').select('*').single();
      if (error) throw error;
      return data;
    },
  });
} 
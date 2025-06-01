import { useQuery } from '@tanstack/react-query';

interface DashboardMetrics {
  totalCompanies: number;
  activeLoans: number;
  pendingRequests: number;
  totalRevenue: number;
  monthlyGrowth: number;
  overduePayments: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

interface DashboardData {
  metrics: DashboardMetrics;
  revenueChart: ChartData;
  loansChart: ChartData;
  companiesChart: ChartData;
  requestsChart: ChartData;
}

const dummyData: DashboardData = {
  metrics: {
    totalCompanies: 156,
    activeLoans: 89,
    pendingRequests: 23,
    totalRevenue: 1250000,
    monthlyGrowth: 12.5,
    overduePayments: 7,
  },
  revenueChart: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [65000, 59000, 80000, 81000, 56000, 55000],
      borderColor: '#4f46e5',
      backgroundColor: '#e0e7ff',
    }],
  },
  loansChart: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Active Loans',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: '#059669',
      backgroundColor: '#d1fae5',
    }],
  },
  companiesChart: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'New Companies',
      data: [12, 19, 15, 17, 14, 13],
      borderColor: '#7c3aed',
      backgroundColor: '#ede9fe',
    }],
  },
  requestsChart: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Loan Requests',
      data: [25, 29, 35, 27, 24, 23],
      borderColor: '#ea580c',
      backgroundColor: '#ffedd5',
    }],
  },
};

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin_dashboard'],
    queryFn: () => Promise.resolve(dummyData),
  });
} 
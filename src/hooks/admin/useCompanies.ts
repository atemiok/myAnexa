import { useQuery } from '@tanstack/react-query';
import { db } from '@/api/supa';

export type CompanyStatus = 'draft' | 'unverified' | 'active' | 'suspended';

export interface Company {
  id: string;
  name: string;
  employeeCount: number;
  adminEmail: string;
  phone: string;
  status: CompanyStatus;
  lastInvoice: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  activationDate: string;
  joinedDate: string;
}

const mockCompanies = Array.from({ length: 10 }, (_, i) => ({
  id: `company-${i + 1}`,
  name: `Company ${i + 1}`,
  employeeCount: Math.floor(Math.random() * 100) + 10,
  adminEmail: `admin${i + 1}@company.com`,
  phone: '+1 234 567 8900',
  status: ['active', 'pending', 'suspended'][Math.floor(Math.random() * 3)],
  lastInvoice: '2024-06-01',
  paymentStatus: ['paid', 'unpaid'][Math.floor(Math.random() * 2)],
  activationDate: '2024-01-01',
  joinedDate: '2023-01-01',
}));

export function useCompanies() {
  return useQuery({
    queryKey: ['admin_companies'],
    queryFn: async () => {
      if (import.meta.env.MODE === 'development') {
        return { companies: mockCompanies, totalPages: 1 };
      }
      const { data, error } = await db.from('companies').select('*');
      if (error) throw error;
      return { companies: data, totalPages: 1 };
    },
  });
} 
import { useQuery } from '@tanstack/react-query';
import { db } from '../../api/supa';

export type EmployeeStatus = 'active' | 'disabled' | 'archived';

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  status: EmployeeStatus;
  joinDate: string;
  lastActive: string;
  salary: number;
  documents: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
  }[];
}

export interface EmployeesResponse {
  employees: Employee[];
  stats: {
    total: number;
    active: number;
    disabled: number;
    archived: number;
  };
}

export function useEmployees(status?: EmployeeStatus, search?: string) {
  return useQuery({
    queryKey: ['employer_employees', status, search],
    queryFn: async () => {
      if (import.meta.env.MODE === 'development') {
        const dummyEmployees: Employee[] = Array.from({ length: 50 }, (_, i) => ({
          id: `emp-${i + 1}`,
          name: `Employee ${i + 1}`,
          email: `employee${i + 1}@company.com`,
          department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][Math.floor(Math.random() * 5)],
          designation: ['Manager', 'Senior', 'Junior', 'Lead', 'Associate'][Math.floor(Math.random() * 5)],
          status: ['active', 'disabled', 'archived'][Math.floor(Math.random() * 3)] as EmployeeStatus,
          joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
          lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          salary: Math.floor(Math.random() * 50000) + 30000,
          documents: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
            id: `doc-${i}-${j}`,
            name: `Document ${j + 1}`,
            type: ['ID', 'Contract', 'Certificate'][Math.floor(Math.random() * 3)],
            uploadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          })),
        }));

        let filtered = [...dummyEmployees];
        
        if (status) {
          filtered = filtered.filter(emp => emp.status === status);
        }
        
        if (search) {
          const searchLower = search.toLowerCase();
          filtered = filtered.filter(
            emp =>
              emp.name.toLowerCase().includes(searchLower) ||
              emp.email.toLowerCase().includes(searchLower) ||
              emp.department.toLowerCase().includes(searchLower) ||
              emp.designation.toLowerCase().includes(searchLower)
          );
        }
        
        const stats = {
          total: dummyEmployees.length,
          active: dummyEmployees.filter(emp => emp.status === 'active').length,
          disabled: dummyEmployees.filter(emp => emp.status === 'disabled').length,
          archived: dummyEmployees.filter(emp => emp.status === 'archived').length,
        };
        
        return { employees: filtered, stats };
      }

      let query = db.from('employees').select('*');
      
      if (status) {
        query = query.eq('status', status);
      }
      
      if (search) {
        query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,department.ilike.%${search}%,designation.ilike.%${search}%`);
      }
      
      const { data: employees, error } = await query;
      if (error) throw error;

      const stats = {
        total: employees.length,
        active: employees.filter(emp => emp.status === 'active').length,
        disabled: employees.filter(emp => emp.status === 'disabled').length,
        archived: employees.filter(emp => emp.status === 'archived').length,
      };

      return { employees, stats };
    },
  });
} 
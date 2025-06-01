import { useQuery } from '@tanstack/react-query';

export type InvoiceStatus = 'unpaid' | 'paid';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  paidDate?: string;
  description: string;
  items: {
    id: string;
    description: string;
    amount: number;
  }[];
}

const dummyInvoices: Invoice[] = Array.from({ length: 20 }, (_, i) => ({
  id: `inv-${i + 1}`,
  invoiceNumber: `INV-${String(i + 1).padStart(6, '0')}`,
  amount: Math.floor(Math.random() * 10000) + 1000,
  status: Math.random() > 0.5 ? 'paid' : 'unpaid',
  dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  paidDate: Math.random() > 0.5 ? new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString() : undefined,
  description: `Invoice for services rendered in ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][Math.floor(Math.random() * 6)]}`,
  items: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => ({
    id: `item-${i}-${j}`,
    description: `Service ${j + 1}`,
    amount: Math.floor(Math.random() * 3000) + 500,
  })),
}));

interface InvoicesResponse {
  invoices: Invoice[];
  stats: {
    total: number;
    unpaid: number;
    paid: number;
  };
}

export function useInvoices(status?: InvoiceStatus) {
  return useQuery({
    queryKey: ['employer_invoices', status],
    queryFn: () => {
      let filtered = [...dummyInvoices];
      
      if (status) {
        filtered = filtered.filter(inv => inv.status === status);
      }
      
      const stats = {
        total: dummyInvoices.length,
        unpaid: dummyInvoices.filter(inv => inv.status === 'unpaid').length,
        paid: dummyInvoices.filter(inv => inv.status === 'paid').length,
      };
      
      return Promise.resolve({
        invoices: filtered,
        stats,
      } as InvoicesResponse);
    },
  });
} 
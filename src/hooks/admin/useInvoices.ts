import { useQuery } from '@tanstack/react-query';

export type InvoiceStatus = 'unpaid' | 'paid' | 'late' | 'partial' | 'bad_debt';

export interface Invoice {
  id: string;
  companyName: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  paidDate?: string;
  paidAmount: number;
  remainingAmount: number;
  invoiceNumber: string;
  description: string;
}

const dummyInvoices: Invoice[] = Array.from({ length: 40 }, (_, i) => ({
  id: `invoice-${i + 1}`,
  companyName: `Company ${Math.floor(i / 4) + 1}`,
  amount: Math.floor(Math.random() * 10000) + 1000,
  status: ['unpaid', 'paid', 'late', 'partial', 'bad_debt'][Math.floor(Math.random() * 5)] as InvoiceStatus,
  dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  paidDate: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString() : undefined,
  paidAmount: Math.floor(Math.random() * 8000) + 500,
  remainingAmount: Math.floor(Math.random() * 5000) + 100,
  invoiceNumber: `INV-${String(i + 1).padStart(6, '0')}`,
  description: `Invoice for services rendered in ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][Math.floor(Math.random() * 6)]}`,
}));

interface InvoicesResponse {
  invoices: Invoice[];
  stats: {
    total: number;
    unpaid: number;
    paid: number;
    late: number;
    partial: number;
    badDebt: number;
  };
}

export function useInvoices(status?: InvoiceStatus, groupByCompany?: boolean) {
  return useQuery({
    queryKey: ['admin_invoices', status, groupByCompany],
    queryFn: () => {
      let filtered = [...dummyInvoices];
      
      if (status) {
        filtered = filtered.filter(invoice => invoice.status === status);
      }
      
      if (groupByCompany) {
        filtered.sort((a, b) => a.companyName.localeCompare(b.companyName));
      }
      
      const stats = {
        total: dummyInvoices.length,
        unpaid: dummyInvoices.filter(inv => inv.status === 'unpaid').length,
        paid: dummyInvoices.filter(inv => inv.status === 'paid').length,
        late: dummyInvoices.filter(inv => inv.status === 'late').length,
        partial: dummyInvoices.filter(inv => inv.status === 'partial').length,
        badDebt: dummyInvoices.filter(inv => inv.status === 'bad_debt').length,
      };
      
      return Promise.resolve({
        invoices: filtered,
        stats,
      } as InvoicesResponse);
    },
  });
} 
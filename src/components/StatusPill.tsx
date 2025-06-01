export type StatusVariant = 'info' | 'success' | 'warning' | 'error';
export type Status = 'active' | 'pending' | 'suspended' | 'completed' | 'rejected' | 'unpaid' | 'paid' | 'late' | 'partial' | 'bad_debt' | 'approved';

interface StatusPillProps {
  status: Status;
  children?: React.ReactNode;
}

const statusToVariant: Record<Status, StatusVariant> = {
  active: 'success',
  pending: 'warning',
  suspended: 'error',
  completed: 'success',
  rejected: 'error',
  unpaid: 'warning',
  paid: 'success',
  late: 'error',
  partial: 'warning',
  bad_debt: 'error',
  approved: 'success',
};

const statusLabels: Record<Status, string> = {
  active: 'Active',
  pending: 'Pending',
  suspended: 'Suspended',
  completed: 'Completed',
  rejected: 'Rejected',
  unpaid: 'Unpaid',
  paid: 'Paid',
  late: 'Late',
  partial: 'Partial',
  bad_debt: 'Bad Debt',
  approved: 'Approved',
};

const variantStyles: Record<StatusVariant, string> = {
  info: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  success: 'bg-green-50 text-green-700 ring-green-600/20',
  warning: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  error: 'bg-red-50 text-red-700 ring-red-600/20',
};

export function StatusPill({ status, children }: StatusPillProps) {
  const variant = statusToVariant[status];
  const label = children || statusLabels[status];

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
} 
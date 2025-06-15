import React from 'react';

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
  info: 'bg-info/10 text-info ring-info/20',
  success: 'bg-success/10 text-success ring-success/20',
  warning: 'bg-warning/10 text-warning ring-warning/20',
  error: 'bg-error/10 text-error ring-error/20',
};

export function StatusPill({ status, children }: StatusPillProps) {
  const variant = statusToVariant[status];
  const label = children || statusLabels[status];

  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset transition-all duration-200 ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
} 
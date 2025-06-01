import { useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../../api/supa';
import { Request, RequestStatus } from './useRequests';

interface UpdateRequestParams {
  requestId: string;
  status: RequestStatus;
  reason?: string;
}

export function useRequestActions() {
  const queryClient = useQueryClient();

  const updateRequest = useMutation({
    mutationFn: async ({ requestId, status, reason }: UpdateRequestParams) => {
      if (process.env.NODE_ENV === 'development') {
        return { id: requestId, status, reason };
      }

      const { data, error } = await db
        .from('requests')
        .update({
          status,
          reason,
          [status === 'approved' ? 'approvedDate' : 'declinedDate']: new Date().toISOString(),
        })
        .eq('id', requestId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onMutate: async ({ requestId, status, reason }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['employer_requests'] });

      // Snapshot the previous value
      const previousRequests = queryClient.getQueryData(['employer_requests']);

      // Optimistically update to the new value
      queryClient.setQueryData(['employer_requests'], (old: any) => {
        const requests = old.requests.map((req: Request) =>
          req.id === requestId
            ? {
                ...req,
                status,
                reason,
                [status === 'approved' ? 'approvedDate' : 'declinedDate']: new Date().toISOString(),
              }
            : req
        );

        const stats = {
          total: old.stats.total,
          pending: requests.filter((req: Request) => req.status === 'pending').length,
          approved: requests.filter((req: Request) => req.status === 'approved').length,
          declined: requests.filter((req: Request) => req.status === 'declined').length,
        };

        return { requests, stats };
      });

      // Return a context object with the snapshotted value
      return { previousRequests };
    },
    onError: (context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context && 'previousRequests' in context) {
        queryClient.setQueryData(['employer_requests'], context.previousRequests);
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure cache is in sync
      queryClient.invalidateQueries({ queryKey: ['employer_requests'] });
    },
  });

  return {
    updateRequest,
  };
} 
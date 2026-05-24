import { ID } from '@/shared/types/primitives.types';
import { AssignResource, AssignReviewerProps } from '../model/types';
import { normalizeFetch } from '@/shared/api/normalizeResponse';
import { PostAssignReviewerResponse } from '@/entities/proposal/api/contracts';
import getAssignErrorState from '../model/getAssignErrorState';

export const fetchReviewerAssign = async (
  props: AssignReviewerProps,
  reviewerId: ID,
  retry: () => void,
  signal?: AbortSignal,
): Promise<AssignResource | null> => {
  const getErrorActions = () => ({
    retry,
  });

  const assignData: AssignResource = {
    status: 'loading',
    errorProps: null,
  };

  const { mode } = props;

  if (mode === 'single') {
    const { proposalId, onSuccess } = props;

    const response = await normalizeFetch<PostAssignReviewerResponse>(
      `/api/proposals/${proposalId}/assign-reviewer`,
      {
        method: 'POST',
        body: JSON.stringify({ reviewerId }),
        signal,
      },
    );

    if (!response.ok && response.error.code === 'REQUEST_ABORTED') {
      return null;
    }

    if (!response.ok) {
      assignData.status = 'error';
      assignData.errorProps = getAssignErrorState(
        response.error,
        getErrorActions(),
      );
      return assignData;
    }

    onSuccess(response.data);
  }

  if (mode === 'multiple') {
    const { proposalIds, onSuccess } = props;

    const requests = proposalIds.map(async (id) => {
      const response = await normalizeFetch<PostAssignReviewerResponse>(
        `/api/proposals/${id}/assign-reviewer`,
        {
          method: 'POST',
          body: JSON.stringify({ reviewerId }),
          signal,
        },
      );

      if (!response.ok) {
        throw {
          id,
          error: response.error,
        };
      }

      return {
        id,
        data: response.data,
      };
    });

    const settledResults = await Promise.allSettled(requests);

    const successful = settledResults.flatMap((result) =>
      result.status === 'fulfilled' ? [result.value.data] : [],
    );

    const failed = settledResults.flatMap((result) =>
      result.status === 'rejected' ? [result.reason] : [],
    );

    if (successful.length === 0) {
      const firstError = failed[0]?.error;

      assignData.status = 'error';

      if (firstError) {
        assignData.errorProps = getAssignErrorState(
          firstError,
          getErrorActions(),
        );
      }

      return assignData;
    }

    onSuccess({ successful, failed });
  }

  assignData.status = 'success';
  return assignData;
};

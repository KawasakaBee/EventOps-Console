import { PostCreateReviewResponse } from '@/entities/proposal/api/contracts';
import { CreateReviewResource } from '../model/types';
import { ID } from '@/shared/types/primitives.types';
import { normalizeFetch } from '@/shared/api/normalizeResponse';
import { CreateReviewValues } from '../model/schema';
import getReviewCreateErrorState from '../model/getReviewCreateErrorState';

export const fetchReviewCreate = async (
  id: ID,
  payload: CreateReviewValues,
  retry: () => void,
  signal?: AbortSignal,
): Promise<CreateReviewResource | null> => {
  const getErrorActions = () => ({
    retry,
  });

  const createReview: CreateReviewResource = {
    status: 'loading',
    data: null,
    errorProps: null,
  };

  const response = await normalizeFetch<PostCreateReviewResponse>(
    `/api/proposals/${id}/reviews`,
    { method: 'POST', body: JSON.stringify(payload), signal },
  );

  if (!response.ok && response.error.code === 'REQUEST_ABORTED') {
    return null;
  }

  if (!response.ok) {
    createReview.status = 'error';
    createReview.errorProps = getReviewCreateErrorState(
      response.error,
      getErrorActions(),
    );
    return createReview;
  }

  createReview.status = 'success';
  createReview.data = response.data;
  return createReview;
};

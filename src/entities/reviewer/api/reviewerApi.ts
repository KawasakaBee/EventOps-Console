import { GetReviewersResponse } from '@/entities/reviewer/api/contracts';
import { ReviewersResource } from './types';
import { normalizeFetch } from '@/shared/api/normalizeResponse';

export const fetchReviewers = async (): Promise<ReviewersResource> => {
  const reviewers: ReviewersResource = {
    status: 'loading',
    data: [],
  };

  const response = await normalizeFetch<GetReviewersResponse>('/api/reviewers');

  if (!response.ok) {
    reviewers.status = 'error';
    return reviewers;
  }

  reviewers.data = response.data.reviewers;
  reviewers.status = 'success';
  return reviewers;
};

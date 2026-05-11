import { GetReviewersResponse } from '@/entities/reviewer/api/contracts';
import { fetchWithDemoAuth } from '@/entities/user/api/fetchWithDemoAuth';
import normalizeResponse from '@/shared/api/normalizeResponse';
import { ReviewersResource } from './types';

export const fetchReviewers = async (): Promise<ReviewersResource> => {
  const reviewers: ReviewersResource = {
    status: 'loading',
    data: [],
  };

  const response = await fetchWithDemoAuth('/api/reviewers');

  if (!response.ok) {
    reviewers.status = 'error';
    return reviewers;
  }

  const result = await normalizeResponse<GetReviewersResponse>(response.data);

  if (!result.ok) {
    reviewers.status = 'error';
    return reviewers;
  }

  reviewers.data = result.data.reviewers;
  reviewers.status = 'success';
  return reviewers;
};

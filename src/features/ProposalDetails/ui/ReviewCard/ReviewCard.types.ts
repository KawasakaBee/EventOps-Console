import { Review } from '@/entities/review/model/types';
import { GetReviewersResponse } from '@/entities/reviewer/api/contracts';
import { AppBaseQueryError } from '@/shared/api/baseApi';
import { SerializedError } from '@reduxjs/toolkit';

export interface IReviewCardProps {
  review: Review;
  reviewers: GetReviewersResponse | undefined;
  isReviewersLoading: boolean;
  isReviewersError: boolean;
  reviewersError: AppBaseQueryError | SerializedError | undefined;
}

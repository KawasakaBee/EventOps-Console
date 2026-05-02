import { Review } from '@/entities/review/model/types';

export interface IReviewCardProps {
  review: Review;
  reviewerName: string | null;
}

import { Review, ReviewerListItem } from '@/entities/review/model/types';
import { Resource } from '@/shared/types/primitives.types';

export interface IReviewCardProps {
  review: Review;
  reviewer: Resource<ReviewerListItem>;
}

import { Review } from '@/entities/review/model/types';
import { ReviewerListItem } from '@/entities/reviewer/model/types';
import { Resource } from '@/shared/types/primitives.types';

export interface IReviewCardProps {
  review: Review;
  reviewer: Resource<ReviewerListItem>;
}

import { Review, ReviewerListItem } from '@/entities/review/model/types';
import { Resource } from '@/shared/types/primitives.types';

export interface IProposalReviewsTabProps {
  reviews: Review[];
  canAssignReviewer: boolean;
  reviewers: Resource<ReviewerListItem[]>;
}

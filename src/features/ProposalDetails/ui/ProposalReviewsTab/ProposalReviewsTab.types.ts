import { Review } from '@/entities/review/model/types';
import { ReviewerListItem } from '@/entities/reviewer/model/types';
import { Resource } from '@/shared/types/resource.types';

export interface IProposalReviewsTabProps {
  reviews: Review[];
  canAssignReviewer: boolean;
  reviewers: Resource<ReviewerListItem[]>;
}

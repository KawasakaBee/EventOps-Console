import { Review, ReviewerListItem } from '@/entities/review/model/types';

export interface IProposalReviewsTabProps {
  reviews: Review[];
  canAssignReview: boolean;
  reviewers: ReviewerListItem[] | null;
}

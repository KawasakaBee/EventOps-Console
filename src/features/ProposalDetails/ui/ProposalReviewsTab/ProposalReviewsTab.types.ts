import { Review } from '@/entities/review/model/types';

export interface IProposalReviewsTabProps {
  reviews: Review[];
  canAssignReviewer: boolean;
}

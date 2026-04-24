import { Review, Reviewer } from '@/entities/review/model/types';
import { PostCreateReviewRequest } from '@/shared/api/contracts/proposal.contract';
import { ID } from '@/shared/types/primitives.types';

export const initialReviews = [
  {
    id: '1',
    proposalId: '1',
    reviewerId: '3',
    scoreContent: 10,
    scoreRelevance: 5,
    scoreDelivery: 7,
    comment: 'First review',
    recommendation: 'approve',
  },
  {
    id: '2',
    proposalId: '2',
    reviewerId: '3',
    scoreContent: 7,
    scoreRelevance: 2,
    scoreDelivery: 4,
    comment: 'Second review',
    recommendation: 'reject',
  },
  {
    id: '3',
    proposalId: '3',
    reviewerId: '3',
    scoreContent: 10,
    scoreRelevance: 8,
    scoreDelivery: 9,
    comment: 'Second review',
    recommendation: 'request_changes',
  },
] satisfies Review[];

export const reviews: Review[] = [...initialReviews];

export const initialReviewers = [
  {
    id: '3',
    name: 'First reviewer',
    email: 'firstReviewer@gmail.com',
    proposalIds: ['1', '2', '3'],
    reviews: [reviews[0], reviews[1], reviews[2]],
  },
] satisfies Reviewer[];

export const reviewers: Reviewer[] = [...initialReviewers];

export const assignReviewer = (proposalId: ID, reviewerId: ID) => {
  const reviewer = reviewers.find((reviewer) => reviewer.id === reviewerId);

  if (!reviewer) return;

  if (!reviewer.proposalIds.includes(proposalId)) {
    reviewer.proposalIds = [...reviewer.proposalIds, proposalId];
  }
};

export const createReview = (
  proposalId: ID,
  reviewerId: ID,
  input: PostCreateReviewRequest,
): Review => {
  const review: Review = {
    id: crypto.randomUUID(),
    ...input,
    proposalId,
    reviewerId,
  };

  reviews.push(review);

  return review;
};

import { ID } from '@/shared/types/primitives.types';

export const recommendations = [
  'approve',
  'reject',
  'request_changes',
] as const;

export type Recommendation = (typeof recommendations)[number];

export interface Review {
  id: ID;
  proposalId: ID;
  reviewerId: ID;
  scoreContent: number;
  scoreRelevance: number;
  scoreDelivery: number;
  comment: string;
  recommendation: Recommendation;
}

export interface Reviewer {
  id: ID;
  name: string;
  email: string;
  proposalIds: ID[];
  reviews: Review[];
}

export type ReviewerListItem = Pick<Reviewer, 'id' | 'name'>;

import { ID } from '@/shared/types/primitives.types';

export const recommendations = [
  'approve',
  'reject',
  'request_changes',
] as const;

export type Recommendation = (typeof recommendations)[number];

export const recommendationsNames = [
  'Принять',
  'Отклонить',
  'Нужны изменения',
] as const;

export type RecommendationName = (typeof recommendationsNames)[number];
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

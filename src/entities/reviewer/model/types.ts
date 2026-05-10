import { Review } from '@/entities/review/model/types';
import { ID } from '@/shared/types/primitives.types';

export interface Reviewer {
  id: ID;
  name: string;
  email: string;
  proposalIds: ID[];
  reviews: Review[];
}

export type ReviewerListItem = Pick<Reviewer, 'id' | 'name'>;

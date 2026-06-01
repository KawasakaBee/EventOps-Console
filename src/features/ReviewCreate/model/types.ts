import { ID } from '@/shared/types/primitives.types';

export type CreateReview =
  | { type: 'idle' }
  | {
      type: 'open';
      id: ID;
    };

import { ID } from '@/shared/types/primitives.types';

export type AddComment =
  | { type: 'idle' }
  | {
      type: 'open';
      id: ID;
    };

import { ID } from '@/shared/types/primitives.types';

export type AssignReviewer =
  | { type: 'idle' }
  | {
      type: 'single';
      id: ID;
    }
  | {
      type: 'multiple';
      ids: ID[];
    };

export type OpenSingleAssignReviewer = {
  id: ID;
};

export type OpenMultipleAssignReviewer = {
  ids: ID[];
};

export type AssignReviewerProps =
  | {
      mode: 'single';
      proposalId: ID;
    }
  | {
      mode: 'multiple';
      proposalIds: ID[];
      onSuccess: (failedCount: number) => void;
    };

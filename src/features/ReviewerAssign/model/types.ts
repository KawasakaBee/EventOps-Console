import { ID } from '@/shared/types/primitives.types';

export type AssignReviewer =
  | { type: 'idle' }
  | {
      type: 'single';
      id: ID;
      eventIds: ID[];
    }
  | {
      type: 'multiple';
      ids: ID[];
      eventIds: ID[];
    };

export type OpenSingleAssignReviewer = {
  id: ID;
  eventIds: ID[];
};

export type OpenMultipleAssignReviewer = {
  ids: ID[];
  eventIds: ID[];
};

export type AssignReviewerProps =
  | {
      mode: 'single';
      proposalId: ID;
      eventIds: ID[];
    }
  | {
      mode: 'multiple';
      proposalIds: ID[];
      eventIds: ID[];
      onSuccess: (failedCount: number) => void;
    };

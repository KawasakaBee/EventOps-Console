import { PostAssignReviewerResponse } from '@/entities/proposal/api/contracts';
import { ID } from '@/shared/types/primitives.types';
import { PageStatus } from '@/shared/types/resource.types';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';

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

type MultipleAssignReviewerResult = {
  successful: PostAssignReviewerResponse[];
  failed: unknown[];
};

export type AssignReviewerProps =
  | {
      mode: 'single';
      proposalId: ID;
      onSuccess: (result: PostAssignReviewerResponse) => void;
    }
  | {
      mode: 'multiple';
      proposalIds: ID[];
      onSuccess: (result: MultipleAssignReviewerResult) => void;
    };

export interface AssignResource {
  status: PageStatus;
  errorProps: ErrorStateProps | null;
}

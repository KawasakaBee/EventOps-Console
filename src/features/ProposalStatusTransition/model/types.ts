import { ProposalStatus } from '@/entities/proposal/model/types';
import { ID } from '@/shared/types/primitives.types';

export type StatusTransition =
  | { type: 'idle' }
  | {
      type: 'single';
      id: ID;
      prevStatus: ProposalStatus;
      nextStatus: ProposalStatus;
    }
  | {
      type: 'multiple';
      ids: ID[];
      prevStatus: ProposalStatus;
      nextStatus: ProposalStatus;
    };

export type OpenSingleTransitionPayload = {
  id: ID;
  prevStatus: ProposalStatus;
  nextStatus: ProposalStatus;
};

export type OpenMultipleTransitionPayload = {
  ids: ID[];
  prevStatus: ProposalStatus;
  nextStatus: ProposalStatus;
};

export type StatusTransitionSubmitProps =
  | {
      mode: 'single';
      proposalId: ID;
      nextStatus: ProposalStatus;
    }
  | {
      mode: 'multiple';
      proposalIds: ID[];
      nextStatus: ProposalStatus;
      onSuccess: (failedCount: number) => void;
    };

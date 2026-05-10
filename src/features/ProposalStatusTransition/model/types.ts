import { ProposalStatus } from '@/entities/proposal/model/types';
import { PatchProposalStatusResponse } from '@/entities/proposal/api/contracts';
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

export type MultipleStatusTransitionResult = {
  successful: PatchProposalStatusResponse[];
  failed: unknown[];
};

export type StatusTransitionSubmitProps =
  | {
      mode: 'single';
      id: ID;
      nextStatus: ProposalStatus;
      onSuccess: (result: PatchProposalStatusResponse) => void;
    }
  | {
      mode: 'multiple';
      ids: ID[];
      nextStatus: ProposalStatus;
      onSuccess: (result: MultipleStatusTransitionResult) => void;
    };

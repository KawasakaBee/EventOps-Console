import { ProposalStatus } from '@/entities/proposal/model/types';
import { PatchProposalStatusResponse } from '@/shared/api/contracts/proposal.contract';
import { ID } from '@/shared/types/primitives.types';

interface IDefaultStatusTransitionDialogProps {
  prevStatus: ProposalStatus;
  nextStatus: ProposalStatus;
  onClose: () => void;
  open: boolean;
}

interface ISingleProps extends IDefaultStatusTransitionDialogProps {
  mode: 'single';
  id: ID;
  onSuccess: (result: PatchProposalStatusResponse) => void;
}

interface IMultipleProps extends IDefaultStatusTransitionDialogProps {
  mode: 'multiple';
  ids: ID[];
  onSuccess: (result: {
    successful: PatchProposalStatusResponse[];
    failed: unknown[];
  }) => void;
}

export type IStatusTransitionDialogProps = ISingleProps | IMultipleProps;

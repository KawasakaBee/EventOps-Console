import { ProposalStatus } from '@/entities/proposal/model/types';
import { StatusTransitionSubmitProps } from '../model/types';

export type IStatusTransitionDialogProps = StatusTransitionSubmitProps & {
  prevStatus: ProposalStatus;
  onClose: () => void;
};

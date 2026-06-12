import { ProposalStatus } from '@/entities/proposal/model/types';
import { StatusTransitionSubmitProps } from '../model/types';

export type StatusTransitionDialogProps = StatusTransitionSubmitProps & {
  prevStatus: ProposalStatus;
  onClose: () => void;
};

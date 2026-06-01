import { ID } from '@/shared/types/primitives.types';

export interface IReviewCreateDialogProps {
  onClose: () => void;
  proposalId: ID;
}

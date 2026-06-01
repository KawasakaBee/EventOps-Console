import { ID } from '@/shared/types/primitives.types';

export interface ICommentAddDialogProps {
  onClose: () => void;
  proposalId: ID;
}

import { PostCreateCommentResponse } from '@/entities/proposal/api/contracts';
import { ID } from '@/shared/types/primitives.types';

export interface ICommentAddDialogProps {
  onClose: () => void;
  proposalId: ID;
  onSuccess: (result: PostCreateCommentResponse) => void;
}

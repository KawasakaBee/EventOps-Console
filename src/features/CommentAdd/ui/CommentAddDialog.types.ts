import { PostCreateCommentResponse } from '@/entities/proposal/api/contracts';
import { ID } from '@/shared/types/primitives.types';

export interface ICommentAddDialogProps {
  onClose: () => void;
  proposalId: ID;
  onSubmit: (comment: string) => string;
  onError: (tempId: ID) => void;
  onSuccess: (result: PostCreateCommentResponse, tempId: ID) => void;
}

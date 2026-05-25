import { PostCreateReviewResponse } from '@/entities/proposal/api/contracts';
import { ID } from '@/shared/types/primitives.types';

export interface IReviewCreateDialogProps {
  onClose: () => void;
  proposalId: ID;
  onSuccess: (result: PostCreateReviewResponse) => void;
}

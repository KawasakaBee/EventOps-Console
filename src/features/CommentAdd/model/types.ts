import { PostCreateCommentResponse } from '@/entities/proposal/api/contracts';
import { ID } from '@/shared/types/primitives.types';
import { PageStatus } from '@/shared/types/resource.types';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';

export type AddComment =
  | { type: 'idle' }
  | {
      type: 'open';
      id: ID;
    };

export interface AddCommentResource {
  status: PageStatus;
  data: PostCreateCommentResponse | null;
  errorProps: ErrorStateProps | null;
}

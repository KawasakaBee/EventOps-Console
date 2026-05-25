import { PostCreateReviewResponse } from '@/entities/proposal/api/contracts';
import { ID } from '@/shared/types/primitives.types';
import { PageStatus } from '@/shared/types/resource.types';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';

export type CreateReview =
  | { type: 'idle' }
  | {
      type: 'open';
      id: ID;
    };

export interface CreateReviewResource {
  status: PageStatus;
  data: PostCreateReviewResponse | null;
  errorProps: ErrorStateProps | null;
}

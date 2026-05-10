import { Track } from '@/entities/track/model/types';
import { User } from '@/entities/user/model/types';
import { PaginationEnvelope } from '@/shared/types/api.types';
import { PageStatus } from '@/shared/types/primitives.types';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';
import { UserListItem } from '@/entities/user/model/types';
import { ProposalListItem } from '@/entities/proposal/model/types';
import { ReviewerListItem } from '@/entities/reviewer/model/types';

export interface UserResource {
  status: PageStatus;
  data: User | null;
  errorProps: ErrorStateProps | null;
}

export interface TracksResource {
  status: PageStatus;
  data: Track[];
}

export interface ReviewersResource {
  status: PageStatus;
  data: ReviewerListItem[];
}

export interface PaginationResource {
  status: PageStatus;
  data: PaginationEnvelope<ProposalListItem> | null;
  errorProps: ErrorStateProps | null;
}

export interface UsersResource {
  status: PageStatus;
  data: UserListItem[];
}

export interface ProposalResource {
  status: PageStatus;
  errorProps: ErrorStateProps | null;
}

export interface DialogResource {
  status: PageStatus;
  errorProps: ErrorStateProps | null;
}

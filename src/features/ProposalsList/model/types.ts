import { ProposalListItem } from '@/entities/proposal/model/types';
import { User } from '@/entities/user/model/types';
import { PaginationEnvelope } from '@/shared/types/api.types';
import { PageStatus } from '@/shared/types/resource.types';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';

export interface UserResource {
  status: PageStatus;
  data: User | null;
  errorProps: ErrorStateProps | null;
}

export interface PaginationResource {
  status: PageStatus;
  data: PaginationEnvelope<ProposalListItem> | null;
  errorProps: ErrorStateProps | null;
}

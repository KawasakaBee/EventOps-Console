import {
  ID,
  PageSize,
  SortBy,
  SortOrder,
} from '@/shared/types/primitives.types';
import { ProposalFormat, ProposalLevel, ProposalStatus } from './types';

export interface ProposalListQuery {
  page: number;
  pageSize: PageSize;
  search: string | null;
  status: ProposalStatus[];
  trackId: ID[];
  level: ProposalLevel[];
  format: ProposalFormat[];
  reviewerId: string | null;
  sortBy: SortBy | null;
  sortOrder: SortOrder;
  owner: string | null;
}

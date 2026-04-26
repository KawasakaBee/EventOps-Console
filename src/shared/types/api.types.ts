import {
  ProposalFormat,
  ProposalLevel,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { ErrorCode, ID, PageSize, SortBy, SortOrder } from './primitives.types';

export interface PaginationEnvelope<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ErrorEnvelope {
  error: {
    code: ErrorCode;
    message: string;
    fields?: Record<string, string>;
  };
}

export interface QueryParams {
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

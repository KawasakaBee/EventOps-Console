import {
  ProposalFormat,
  ProposalLevel,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { ErrorCode, ID } from './primitives.types';

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
  pageSize: number;
  search: string | null;
  status: ProposalStatus[];
  trackId: ID[];
  level: ProposalLevel[];
  format: ProposalFormat[];
  reviewerId: string | null;
  sortBy: string | null;
  sortOrder: string;
  owner: string | null;
}

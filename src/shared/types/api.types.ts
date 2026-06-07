import { PageSize } from './primitives.types';

export interface PaginationEnvelope<T> {
  items: T[];
  page: number;
  pageSize: PageSize;
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

export const errorCodes = [
  'UNASSIGN_ERROR',
  'SLOT_NOT_FOUND',
  'REQUEST_ABORTED',
  'AUTH_REQUIRED',
  'INVALID_ROLE',
  'ROLE_NOT_FOUND',
  'USER_NOT_FOUND',
  'PROPOSAL_NOT_FOUND',
  'REVIEWER_NOT_FOUND',
  'HISTORY_NOT_FOUND',
  'FORBIDDEN',
  'INVALID_QUERY',
  'NETWORK_ERROR',
  'INVALID_RESPONSE',
  'UNKNOWN_ERROR',
  'CLIPBOARD_ERROR',
  'VALIDATE_ERROR',
  'SCHEDULE_ASSIGNMENT',
] as const;

export type ErrorCode = (typeof errorCodes)[number];

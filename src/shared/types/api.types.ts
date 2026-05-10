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

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ErrorEnvelope['error']; status: number };

export const errorCodes = [
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
] as const;

export type ErrorCode = (typeof errorCodes)[number];

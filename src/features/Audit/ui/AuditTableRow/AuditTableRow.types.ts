import { AuditLog } from '@/entities/audit/model/types';
import { GetCommentsResponse } from '@/entities/comment/api/contracts';
import { GetEventsListResponse } from '@/entities/event/api/contracts';
import { GetReviewersResponse } from '@/entities/reviewer/api/contracts';
import { GetUsersListResponse } from '@/entities/user/api/contracts';
import { AppBaseQueryError } from '@/shared/api/baseApi';
import { SerializedError } from '@reduxjs/toolkit';

export interface IAuditTableRowProps {
  auditItem: AuditLog;
  users: GetUsersListResponse | undefined;
  isUsersLoading: boolean;
  isUsersError: boolean;
  usersError: AppBaseQueryError | SerializedError | undefined;
  reviewers: GetReviewersResponse | undefined;
  isReviewersLoading: boolean;
  isReviewersError: boolean;
  comments: GetCommentsResponse | undefined;
  isCommentsLoading: boolean;
  isCommentsError: boolean;
  events: GetEventsListResponse | undefined;
  isEventsLoading: boolean;
  isEventsError: boolean;
  columnsWidth: Record<
    keyof AuditLog,
    { width: number; skeletonWidth: number }
  >;
}

export interface IAuditRenderCellProps {
  rowName: keyof AuditLog;
  data: AuditLog;
}

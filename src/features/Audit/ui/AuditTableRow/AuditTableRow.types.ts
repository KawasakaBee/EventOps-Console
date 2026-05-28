import { AuditLog } from '@/entities/audit/model/types';
import { Comment } from '@/entities/comment/model/types';
import { ReviewerListItem } from '@/entities/reviewer/model/types';
import { UserListItem } from '@/entities/user/model/types';
import { Resource } from '@/shared/types/resource.types';

export interface IAuditTableRowProps {
  auditItem: AuditLog;
  users: Resource<UserListItem[]>;
  reviewers: Resource<ReviewerListItem[]>;
  comments: Resource<Comment[]>;
}

export interface IAuditRenderCellProps {
  rowName: keyof AuditLog;
  data: AuditLog;
}

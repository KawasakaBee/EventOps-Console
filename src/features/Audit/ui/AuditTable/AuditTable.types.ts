import { AuditLog } from '@/entities/audit/model/types';
import { Comment } from '@/entities/comment/model/types';
import { ReviewerListItem } from '@/entities/reviewer/model/types';
import { UserListItem } from '@/entities/user/model/types';
import { Resource } from '@/shared/types/resource.types';

export interface IAuditTableProps {
  audit: AuditLog[];
  users: Resource<UserListItem[]>;
  reviewers: Resource<ReviewerListItem[]>;
  comments: Resource<Comment[]>;
}

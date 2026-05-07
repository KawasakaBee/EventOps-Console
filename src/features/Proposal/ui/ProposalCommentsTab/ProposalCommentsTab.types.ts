import { Comment } from '@/entities/comment/model/types';
import { UserListItem } from '@/entities/user/model/types';
import { Resource } from '@/shared/types/primitives.types';

export interface IProposalCommentsTabProps {
  comments: Comment[];
  canAddComment: boolean;
  users: Resource<UserListItem[]>;
}

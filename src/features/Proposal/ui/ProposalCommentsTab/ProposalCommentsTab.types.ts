import { Comment } from '@/entities/comment/model/types';
import { UserListItem } from '@/entities/user/model/types';

export interface IProposalCommentsTabProps {
  comments: Comment[];
  canAddComment: boolean;
  users: UserListItem[] | null;
}

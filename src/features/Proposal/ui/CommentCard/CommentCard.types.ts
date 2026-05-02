import { Comment } from '@/entities/comment/model/types';
import { UserListItem } from '@/entities/user/model/types';

export interface ICommentCardProps {
  comment: Comment;
  user: UserListItem | null;
}

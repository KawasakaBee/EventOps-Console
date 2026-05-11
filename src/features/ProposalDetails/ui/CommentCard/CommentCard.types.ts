import { Comment } from '@/entities/comment/model/types';
import { UserListItem } from '@/entities/user/model/types';
import { Resource } from '@/shared/types/resource.types';

export interface ICommentCardProps {
  comment: Comment;
  user: Resource<UserListItem>;
}

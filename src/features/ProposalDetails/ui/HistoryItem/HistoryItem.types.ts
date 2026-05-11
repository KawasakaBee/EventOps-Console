import { Comment } from '@/entities/comment/model/types';
import { HistoryEntry } from '@/entities/history/model/types';
import { ReviewerListItem } from '@/entities/reviewer/model/types';
import { UserListItem } from '@/entities/user/model/types';
import { Resource } from '@/shared/types/resource.types';

export interface IHistoryItemProps {
  item: HistoryEntry;
  user: Resource<UserListItem>;
  isLastItem: boolean;
  comments: Comment[];
  reviewers: Resource<ReviewerListItem[]>;
}

import { Comment } from '@/entities/comment/model/types';
import { HistoryEntry } from '@/entities/history/model/types';
import { ReviewerListItem } from '@/entities/review/model/types';
import { UserListItem } from '@/entities/user/model/types';

export interface IHistoryItemProps {
  item: HistoryEntry;
  user: UserListItem | null;
  isLastItem: boolean;
  comments: Comment[];
  reviewers: ReviewerListItem[] | null;
}

import { Comment } from '@/entities/comment/model/types';
import { HistoryEntry } from '@/entities/history/model/types';
import { ReviewerListItem } from '@/entities/review/model/types';
import { UserListItem } from '@/entities/user/model/types';

export interface IProposalHistoryTabProps {
  history: HistoryEntry[];
  users: UserListItem[] | null;
  comments: Comment[];
  reviewers: ReviewerListItem[] | null;
}

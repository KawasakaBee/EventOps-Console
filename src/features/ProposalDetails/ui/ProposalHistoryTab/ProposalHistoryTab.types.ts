import { Comment } from '@/entities/comment/model/types';
import { HistoryEntry } from '@/entities/history/model/types';
import { ReviewerListItem } from '@/entities/reviewer/model/types';
import { UserListItem } from '@/entities/user/model/types';
import { Resource } from '@/shared/types/primitives.types';

export interface IProposalHistoryTabProps {
  history: HistoryEntry[];
  users: Resource<UserListItem[]>;
  comments: Comment[];
  reviewers: Resource<ReviewerListItem[]>;
}

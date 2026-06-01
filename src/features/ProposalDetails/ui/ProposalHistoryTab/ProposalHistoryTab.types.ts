import { Comment } from '@/entities/comment/model/types';
import { HistoryEntry } from '@/entities/history/model/types';
export interface IProposalHistoryTabProps {
  history: HistoryEntry[];
  comments: Comment[];
}

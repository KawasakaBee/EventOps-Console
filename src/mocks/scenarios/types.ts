import { AuditLog } from '@/entities/audit/model/types';
import { Comment } from '@/entities/comment/model/types';
import { HistoryEntry } from '@/entities/history/model/types';
import { Proposal } from '@/entities/proposal/model/types';
import { Review } from '@/entities/review/model/types';
import { Reviewer } from '@/entities/reviewer/model/types';
import { Speaker } from '@/entities/speaker/model/types';
import { Track } from '@/entities/track/model/types';
import { User } from '@/entities/user/model/types';

export interface MockScenario {
  users: User[];
  speakers: Speaker[];
  proposals: Proposal[];
  reviews: Review[];
  reviewers: Reviewer[];
  comments: Comment[];
  history: HistoryEntry[];
  audit: AuditLog[];
  tracks: Track[];
}

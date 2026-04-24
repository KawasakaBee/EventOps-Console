import { Comment } from '@/entities/comment/model/types';
import { HistoryEntry } from '@/entities/history/model/types';
import { Proposal } from '@/entities/proposal/model/types';
import { Review } from '@/entities/review/model/types';
import { Speaker } from '@/entities/speaker/model/types';
import { User } from '@/entities/user/model/types';

export interface MockScenario {
  users: User[];
  speakers: Speaker[];
  proposals: Proposal[];
  reviews: Review[];
  comments: Comment[];
  history: HistoryEntry[];
}

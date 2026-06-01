import { Comment } from '@/entities/comment/model/types';

export interface IProposalCommentsTabProps {
  comments: Comment[];
  canAddComment: boolean;
}

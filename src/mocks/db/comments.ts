import { Comment } from '@/entities/comment/model/types';
import { ID, Role } from '@/shared/types/primitives.types';

export const initialComments = [
  {
    id: '1',
    actorId: '3',
    proposalId: '1',
    actorRole: 'reviewer',
    message: 'Test message',
    createdAt: '',
  },
] satisfies Comment[];

export const comments: Comment[] = [...initialComments];

export const createComment = (
  proposalId: ID,
  actorId: ID,
  actorRole: Role,
  message: string,
): Comment => {
  const comment: Comment = {
    id: crypto.randomUUID(),
    proposalId,
    actorId,
    actorRole,
    message,
    createdAt: new Date().toISOString(),
  };

  comments.push(comment);

  return comment;
};

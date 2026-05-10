import { ID } from '@/shared/types/primitives.types';
import { proposals } from '../db/proposals';
import { Speaker } from '@/entities/speaker/model/types';
import { speakers } from '../db/speakers';
import { reviews } from '../db/reviews';
import { Review } from '@/entities/review/model/types';
import { Comment } from '@/entities/comment/model/types';
import { comments } from '../db/comments';
import { HistoryEntry } from '@/entities/history/model/types';
import { history } from '../db/history';
import { Proposal } from '@/entities/proposal/model/types';

export const getProposalById = (id: ID): Proposal | undefined =>
  proposals.find((proposal) => proposal.id === id);

export const getSpeakersByIds = (ids: ID[]): Speaker[] =>
  speakers.filter((speaker) => ids.includes(speaker.id));

export const getReviewsByProposalId = (id: ID): Review[] =>
  reviews.filter((review) => review.proposalId === id);

export const getCommentsByProposalId = (id: ID): Comment[] =>
  comments.filter((comment) => comment.proposalId === id);

export const getHistoryByProposalId = (id: ID): HistoryEntry[] =>
  history.filter((hstr) => hstr.proposalId === id);

import { Comment } from '@/entities/comment/model/types';
import { HistoryEntry } from '@/entities/history/model/types';
import {
  Proposal,
  ProposalAction,
  ProposalEditPayload,
  ProposalListItem,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { Review } from '@/entities/review/model/types';
import { Speaker } from '@/entities/speaker/model/types';
import { PaginationEnvelope } from '@/shared/types/api.types';
import { ID } from '@/shared/types/primitives.types';

export type GetProposalsListResponse = PaginationEnvelope<ProposalListItem>;

export interface GetProposalResponse {
  proposal: Proposal;
  speakers: Speaker[];
  reviews: Review[];
  comments: Comment[];
  history: HistoryEntry[];
  availableActions: ProposalAction[];
  availableStatuses: ProposalStatus[];
}

export interface PostProposalResponse {
  proposal: Proposal;
}

export type PatchProposalRequest = Partial<ProposalEditPayload>;

export interface PatchProposalResponse {
  proposal: Proposal;
}
export interface PatchProposalStatusResponse {
  proposal: Proposal;
  historyEntry: HistoryEntry;
  availableActions: ProposalAction[];
  availableStatuses: ProposalStatus[];
}

export interface PostAssignReviewerResponse {
  proposalId: ID;
  reviewerId: ID;
}

export interface PostCreateReviewResponse {
  review: Review;
  history: HistoryEntry;
  aggregatedScores: number;
}

export interface PostCreateCommentResponse {
  comment: Comment;
  history: HistoryEntry;
}

export interface GetProposalsByTrackIdResponse {
  proposals: {
    id: ID;
    label: string;
    duration: number;
    eventId: ID;
  }[];
}

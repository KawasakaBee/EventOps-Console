import { Comment } from '@/entities/comment/model/types';
import { HistoryEntry } from '@/entities/history/model/types';
import {
  Proposal,
  ProposalAction,
  ProposalEditPayload,
  ProposalFormat,
  ProposalLevel,
  ProposalListItem,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { Review } from '@/entities/review/model/types';
import { Speaker } from '@/entities/speaker/model/types';
import { PaginationEnvelope } from '@/shared/types/api.types';
import { ID } from '@/shared/types/primitives.types';

export interface GetProposalsListRequest {
  page: number;
  pageSize: number;
  search?: string;
  status?: ProposalStatus[];
  trackId?: ID[];
  level?: ProposalLevel[];
  format?: ProposalFormat[];
  reviewerId?: ID;
  sortBy?: string;
  sortOrder?: string;
}

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

export type PatchProposalResponse = {
  proposal: Proposal;
};

export interface PatchProposalStatusRequest {
  status: ProposalStatus;
  reason?: string;
}

export interface PatchProposalStatusResponse {
  proposal: Proposal;
  historyEntry: HistoryEntry;
  availableActions: ProposalAction[];
  availableStatuses: ProposalStatus[];
}

export interface PostAssignReviewerRequest {
  reviewerId: ID;
}

export interface PostAssignReviewerResponse {
  proposalId: ID;
  reviewerId: ID;
}

export interface PostCreateReviewResponse {
  review: Review;
  aggregatedScores: number;
}

export interface PostCreateCommentRequest {
  message: string;
}

export interface PostCreateCommentResponse {
  comment: Comment;
}

import {
  ProposalListItem,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { ID } from '@/shared/types/primitives.types';

export const dashboardRanges = ['7d', '30d', '90d'] as const;

export type DashboardRange = (typeof dashboardRanges)[number];

export interface DashboardKpis {
  totalSubmissions: number;
  inReview: number;
  accepted: number;
  rejected: number;
}

export interface SubmissionsByStatusItem {
  status: ProposalStatus;
  count: number;
}

export interface ByTrackItem {
  trackId: ID;
  count: number;
}

export interface AttentionItem {
  id: ID;
  type: 'missing_reviewer' | 'accepted_unscheduled' | 'stale_draft';
  title: string;
  count: number;
}

export interface Dashboard {
  kpis: DashboardKpis;
  submissionsByStatus: SubmissionsByStatusItem[];
  byTrack: ByTrackItem[];
  recentSubmissions: ProposalListItem[];
  attentionItems: AttentionItem[];
}

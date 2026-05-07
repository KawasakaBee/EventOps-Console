import {
  AttentionItem,
  ByTrackItem,
  Dashboard,
  DashboardKpis,
  DashboardRange,
  SubmissionsByStatusItem,
} from '@/entities/dashboard/model/types';
import { proposals as dbProposals } from './proposals';
import {
  Proposal,
  ProposalListItem,
  proposalStatuses,
} from '@/entities/proposal/model/types';
import { reviewers } from './reviews';
import { proposalsToProposalListItem } from '../utils/helpers';

const getKpis = (proposals: Proposal[]): DashboardKpis => {
  return {
    totalSubmissions: proposals.filter(
      (proposal) => proposal.status !== 'draft',
    ).length,
    inReview: proposals.filter((proposal) => proposal.status === 'in_review')
      .length,
    accepted: proposals.filter(
      (proposal) =>
        proposal.status === 'accepted' || proposal.status === 'scheduled',
    ).length,
    rejected: proposals.filter((proposal) => proposal.status === 'rejected')
      .length,
  };
};

const getSubmissionsByStatus = (
  proposals: Proposal[],
): SubmissionsByStatusItem[] => {
  return proposalStatuses.map((status) => ({
    status,
    count: proposals.filter((proposal) => proposal.status === status).length,
  }));
};

const getProposalsByTrackId = (proposals: Proposal[]): ByTrackItem[] => {
  const trackCounter = new Map<Proposal['trackId'], number>();

  for (const proposal of proposals) {
    const currentCount = trackCounter.get(proposal.trackId) ?? 0;

    trackCounter.set(proposal.trackId, currentCount + 1);
  }

  return Array.from(trackCounter, ([trackId, count]) => ({ trackId, count }));
};

const getProposalsInsideRange = (
  proposals: Proposal[],
  days: DashboardRange,
): Proposal[] => {
  const rangeToDays: Record<DashboardRange, number> = {
    '7d': 7,
    '30d': 30,
    '90d': 90,
  };

  const range = Date.now() - rangeToDays[days] * 24 * 60 * 60 * 1000;

  return proposals.filter(
    (proposal) => new Date(proposal.updatedAt).getTime() >= range,
  );
};

const getRecentSubmissions = (proposals: Proposal[]): ProposalListItem[] => {
  let result = proposals;

  result = result.toSorted((a, b) => {
    const aValue = new Date(a.updatedAt).getTime();
    const bValue = new Date(b.updatedAt).getTime();

    return bValue - aValue;
  });

  result = result.slice(0, 5);

  return proposalsToProposalListItem(result);
};

const getMissingReviewers = (proposals: Proposal[]): AttentionItem => {
  let count = 0;

  for (const proposal of proposals) {
    if (proposal.status !== 'submitted') continue;
    const hasReviewer = reviewers.some((reviewer) =>
      reviewer.proposalIds.includes(proposal.id),
    );

    if (!hasReviewer) count++;
  }

  return {
    id: 'missing_reviewer',
    type: 'missing_reviewer',
    title: 'У заявок отсутствуют ревьюеры',
    count,
  };
};

const getAcceptedUnscheduled = (proposals: Proposal[]): AttentionItem => {
  return {
    id: 'accepted_unscheduled',
    type: 'accepted_unscheduled',
    title: 'Одобренные заявки отсутствуют в расписании',
    count: proposals.filter((proposal) => proposal.status === 'accepted')
      .length,
  };
};

const getStaleDraft = (proposals: Proposal[]): AttentionItem => {
  let count = 0;
  const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  for (const proposal of proposals) {
    if (proposal.status === 'draft' && proposal.updatedAt < date) count++;
  }

  return {
    id: 'stale_draft',
    type: 'stale_draft',
    title: 'Черновики давно не обновлялись',
    count,
  };
};

const getAttentionItems = (proposals: Proposal[]): AttentionItem[] => {
  return [
    getMissingReviewers(proposals),
    getAcceptedUnscheduled(proposals),
    getStaleDraft(proposals),
  ];
};

export const getDashboard = (days: DashboardRange): Dashboard => {
  const proposals = getProposalsInsideRange(dbProposals, days);
  const kpis = getKpis(proposals);
  const submissionsByStatus = getSubmissionsByStatus(proposals);
  const byTrack = getProposalsByTrackId(proposals);
  const recentSubmissions = getRecentSubmissions(proposals);
  const attentionItems = getAttentionItems(dbProposals);

  return {
    kpis,
    submissionsByStatus,
    byTrack,
    recentSubmissions,
    attentionItems,
  };
};

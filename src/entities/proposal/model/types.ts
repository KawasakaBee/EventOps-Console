import { Tag } from '@/entities/tag/model/types';
import { ID, ISODateString } from '@/shared/types/primitives.types';

export const proposalStatuses = [
  'draft',
  'submitted',
  'in_review',
  'changes_requested',
  'accepted',
  'rejected',
  'scheduled',
] as const;

export type ProposalStatus = (typeof proposalStatuses)[number];

export const proposalFormats = ['talk', 'workshop', 'lightning'] as const;

export type ProposalFormat = (typeof proposalFormats)[number];

export const proposalLevels = ['junior', 'middle', 'senior'] as const;

export type ProposalLevel = (typeof proposalLevels)[number];

export const proposalActions = [
  'edit',
  'submit',
  'assignReviewer',
  'addReview',
  'addComment',
  'requestChanges',
  'accept',
  'reject',
  'schedule',
] as const;

export type ProposalAction = (typeof proposalActions)[number];

export interface Proposal {
  id: ID;
  title: string;
  abstract: string;
  format: ProposalFormat;
  level: ProposalLevel;
  duration: number;
  status: ProposalStatus;
  trackId: ID;
  speakerIds: ID[];
  tags: Tag[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export type ProposalListItem = Pick<
  Proposal,
  'id' | 'title' | 'status' | 'format' | 'level' | 'trackId' | 'updatedAt'
>;

export type ProposalEditPayload = Pick<
  Proposal,
  'title' | 'abstract' | 'format' | 'level' | 'duration' | 'trackId' | 'tags'
>;

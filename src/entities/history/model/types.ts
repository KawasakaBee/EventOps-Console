import { AuditAction } from '@/entities/audit/model/types';
import { Proposal } from '@/entities/proposal/model/types';
import { ID, ISODateString } from '@/shared/types/primitives.types';

export interface ProposalFieldChange {
  field: keyof Proposal;
  previousValue: unknown;
  nextValue: unknown;
}

export const techFields = [
  'draftSpeakers',
  'speakerIds',
  'updatedAt',
  'createdAt',
  'ownerId',
] as const satisfies readonly (keyof Proposal)[];

export type TechField = (typeof techFields)[number];

export interface HistoryEntry {
  id: ID;
  proposalId: ID;
  eventId: ID;
  actorId: ID;
  action: AuditAction;
  createdAt: ISODateString;
  changes?: ProposalFieldChange[];
  payload?: Record<string, unknown>;
}

export interface ScheduleSlotEntry {
  id: ID;
  slotId: ID;
  actorId: ID;
  eventId: ID;
  action: 'scheduled' | 'unscheduled';
  createdAt: ISODateString;
}

export type FormattedChangeValues = [prev: string, next: string];

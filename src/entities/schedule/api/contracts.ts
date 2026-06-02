import { ProposalFormat } from '@/entities/proposal/model/types';
import { ScheduleDay, ScheduleSlot } from '@/entities/schedule/model/types';
import { ErrorEnvelope } from '@/shared/types/api.types';
import { ID } from '@/shared/types/primitives.types';

export interface ResponseScheduleSlot {
  slot: ScheduleSlot;
  title: string | null;
  format: ProposalFormat | null;
  duration: number | null;
  speakerNames: string[];
}

export type GetScheduleResponse = {
  eventId: ID;
  days: ScheduleDay[];
  times: string[];
  slots: ResponseScheduleSlot[];
};

export interface PatchScheduleAssignRequest {
  slotId: ID;
  proposalId: ID;
}

export interface PatchScheduleAssignResponse {
  slot: ScheduleSlot;
  conflicts: ErrorEnvelope[];
}

import { Schedule, ScheduleSlot } from '@/entities/schedule/model/types';
import { ErrorEnvelope } from '@/shared/types/api.types';
import { ID } from '@/shared/types/primitives.types';

export type GetScheduleResponse = Schedule;

export interface PatchScheduleAssignRequest {
  slotId: ID;
  proposalId: ID;
}

export interface PatchScheduleAssignResponse {
  slot: ScheduleSlot;
  conflicts: ErrorEnvelope[];
}

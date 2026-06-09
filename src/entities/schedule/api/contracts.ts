import { ProposalFormat } from '@/entities/proposal/model/types';
import {
  ScheduleDay,
  ScheduleSlot,
  ScheduleTime,
} from '@/entities/schedule/model/types';

export interface ResponseScheduleSlot {
  slot: ScheduleSlot;
  title: string | null;
  format: ProposalFormat | null;
  duration: number | null;
  speakerNames: string[];
}

export type GetScheduleResponse = {
  days: ScheduleDay[];
  times: ScheduleTime[];
  slots: ResponseScheduleSlot[];
};

export interface PatchScheduleAssignResponse {
  slot: ResponseScheduleSlot;
}

export interface PatchScheduleUnassignResponse {
  ok: true;
}

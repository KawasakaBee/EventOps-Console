import { ProposalStatus } from '@/entities/proposal/model/types';
import { ID, ISODateString } from '@/shared/types/primitives.types';

export interface Schedule {
  times: string[];
  slots: ScheduleSlot[];
}

export interface ScheduleSlot {
  id: ID;
  eventId: ID;
  trackId: ID;
  date: string;
  startTime: ISODateString;
  endTime: string;
  proposalId: ID;
  status: ProposalStatus;
}

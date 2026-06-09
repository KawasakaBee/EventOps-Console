import { ID, ISODateString } from '@/shared/types/primitives.types';

export interface Schedule {
  days: ScheduleDay[];
  times: ScheduleTime[];
  slots: ScheduleSlot[];
}

export interface ScheduleDay {
  date: ISODateString;
  title: string;
  eventId: string;
}

export interface ScheduleTime {
  time: string;
  eventId: string;
}

export interface ScheduleSlot {
  id: ID;
  eventId: string;
  trackId: ID;
  date: string;
  startTime: ISODateString;
  endTime: string;
  proposalId: ID | null;
}

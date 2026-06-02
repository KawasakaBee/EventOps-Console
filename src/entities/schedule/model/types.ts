import { ID, ISODateString } from '@/shared/types/primitives.types';

export interface Schedule {
  eventId: ID;
  days: ScheduleDay[];
  times: string[];
  slots: ScheduleSlot[];
}

export interface ScheduleDay {
  date: ISODateString;
  title: string;
}

export interface ScheduleSlot {
  id: ID;
  trackId: ID;
  date: string;
  startTime: ISODateString;
  endTime: string;
  proposalId: ID | null;
  status: 'scheduled' | 'empty';
}

import { ResponseScheduleSlot } from '@/entities/schedule/api/contracts';
import { ScheduleDay } from '@/entities/schedule/model/types';
import { Track } from '@/entities/track/model/types';

export interface IScheduleAssignProps {
  tracks: Track[];
  scheduleSlots: ResponseScheduleSlot[];
  days: ScheduleDay[];
  timeIntervals: {
    from: string;
    to: string;
  }[];
}

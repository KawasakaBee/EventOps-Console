import { ResponseScheduleSlot } from '@/entities/schedule/api/contracts';
import { Track } from '@/entities/track/model/types';

export interface IScheduleCellProps {
  respSlot: ResponseScheduleSlot;
  tracks: Track[];
  dayStart: string;
}

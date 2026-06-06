import { ResponseScheduleSlot } from '@/entities/schedule/api/contracts';
import { Track } from '@/entities/track/model/types';
import { ID } from '@/shared/types/primitives.types';

export interface IScheduleHintProps {
  scheduleSlots: ResponseScheduleSlot[];
  selectedSlot: {
    trackId: ID;
    startTime: string;
    endTime: string;
  };
  tracks: Track[];
  dayStart: string;
  dayEnd: string;
}

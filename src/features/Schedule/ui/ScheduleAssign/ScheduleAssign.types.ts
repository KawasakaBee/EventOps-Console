import { ResponseScheduleSlot } from '@/entities/schedule/api/contracts';
import { ScheduleDay } from '@/entities/schedule/model/types';
import { Track } from '@/entities/track/model/types';
import { ID } from '@/shared/types/primitives.types';
import { Dispatch, SetStateAction } from 'react';

export interface IScheduleAssignProps {
  tracks: Track[];
  scheduleSlots: ResponseScheduleSlot[];
  days: ScheduleDay[];
  timeIntervals: {
    from: string;
    to: string;
  }[];
  setSelectedSlot: Dispatch<
    SetStateAction<{
      trackId: ID;
      startTime: string;
      endTime: string;
    } | null>
  >;
}

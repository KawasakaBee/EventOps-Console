import { ResponseScheduleSlot } from '@/entities/schedule/api/contracts';
import { Track } from '@/entities/track/model/types';
import { Dispatch, SetStateAction } from 'react';

export interface IScheduleCellProps {
  respSlot: ResponseScheduleSlot;
  tracks: Track[];
  dayStart: string;
  setUnssign: Dispatch<
    SetStateAction<
      | {
          opened: true;
          id: string;
        }
      | {
          opened: false;
        }
    >
  >;
}

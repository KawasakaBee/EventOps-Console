import {
  NEXT_HEADER_ROWS,
  SCHEDULE_STEP_MINUTES,
} from '@/shared/config/layout';

export const getMinutesDiff = (from: string, to: string) => {
  return (new Date(to).getTime() - new Date(from).getTime()) / 60000;
};

export const getGridLinesByTime = (time: string, dayStart: string) => {
  const minutesFromStart = getMinutesDiff(dayStart, time);

  return minutesFromStart / SCHEDULE_STEP_MINUTES + NEXT_HEADER_ROWS;
};

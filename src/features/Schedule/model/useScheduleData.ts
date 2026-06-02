import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { useGetTracksQuery } from '@/entities/track/api/trackApi';
import {
  NEXT_HEADER_ROWS,
  SCHEDULE_STEP_MINUTES,
} from '@/shared/config/layout';
import { getMinutesDiff } from '@/entities/schedule/lib/grid';
import { useGetScheduleQuery } from '../api/scheduleApi';
import { addHourToIso } from '@/shared/utils/formatTimeAndDate';

const useScheduleData = () => {
  // state
  const searchParams = useSearchParams();
  const stringifySearchParams = searchParams.toString();
  const schedule = useGetScheduleQuery(stringifySearchParams);
  const tracks = useGetTracksQuery();

  const timeIntervals: { from: string; to: string }[] = useMemo(() => {
    const data = schedule.data;
    if (!data) return [];

    return data.times.map((time, idx) => {
      const nextTime = data.times[idx + 1];

      return {
        from: time,
        to: nextTime ?? addHourToIso(time),
      };
    });
  }, [schedule.data]);

  const rowsCount = useMemo(
    () =>
      Math.ceil(
        timeIntervals.reduce(
          (acc, { from, to }) =>
            acc +
            (new Date(to).getTime() - new Date(from).getTime()) / (60 * 1000),
          0,
        ) / SCHEDULE_STEP_MINUTES,
      ),
    [timeIntervals],
  );

  const timeStartRows = useMemo(
    () =>
      timeIntervals.reduce((acc: number[], _, currentIdx) => {
        const idx = currentIdx === 0 ? currentIdx : currentIdx - 1;
        const diff = getMinutesDiff(
          timeIntervals[idx].from,
          timeIntervals[idx].to,
        );
        const currentStartRow =
          currentIdx === 0
            ? NEXT_HEADER_ROWS
            : acc[idx] + diff / SCHEDULE_STEP_MINUTES;
        acc.push(currentStartRow);
        return acc;
      }, []),
    [timeIntervals],
  );

  return {
    schedule,
    tracks,
    timeIntervals,
    rowsCount,
    timeStartRows,
  };
};

export default useScheduleData;

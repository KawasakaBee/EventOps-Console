import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useGetTracksQuery } from '@/entities/track/api/trackApi';
import {
  NEXT_HEADER_ROWS,
  SCHEDULE_STEP_MINUTES,
} from '@/shared/config/layout';
import { getMinutesDiff } from '@/entities/schedule/lib/grid';
import {
  useLazyGetScheduleQuery,
  useUnassignProposalMutation,
} from '../api/scheduleApi';
import { addHourToIso } from '@/shared/utils/formatTimeAndDate';
import { ID } from '@/shared/types/primitives.types';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import getScheduleErrorState from './getScheduleErrorState';

const useScheduleData = () => {
  // state
  const searchParams = useSearchParams();
  const serializedSearchParams = searchParams.toString();
  const [getSchedule, scheduleQuery] = useLazyGetScheduleQuery();
  const tracks = useGetTracksQuery();
  const [unassignProposal, unassignState] = useUnassignProposalMutation();

  const [selectedSlot, setSelectedSlot] = useState<{
    trackId: ID;
    startTime: string;
    endTime: string;
  } | null>(null);
  const [unassignResult, setUnassignResult] = useState<
    { ok: false; error: ErrorStateProps } | { ok: true } | null
  >(null);
  const [unassignConfirm, setUnassignConfirm] = useState<
    { opened: true; id: string } | { opened: false }
  >({ opened: false });
  const selectedEvent = searchParams.get('eventId') ?? '';

  const timeIntervals: { from: string; to: string }[] = useMemo(() => {
    const data = scheduleQuery.data;
    if (!data) return [];

    return data.times.map((time, idx) => {
      const nextTime = data.times[idx + 1]?.time;

      return {
        from: time.time,
        to: nextTime ?? addHourToIso(time.time),
      };
    });
  }, [scheduleQuery.data]);

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

  // useEffect

  useEffect(() => {
    if (selectedEvent === '') return;

    getSchedule({ id: selectedEvent, searchParams: serializedSearchParams });
  }, [selectedEvent, getSchedule, serializedSearchParams]);

  // handlers

  const handleUnassignClose = () => {
    setUnassignResult(null);
  };

  const handleUnassignConfirmDialogClose = () => {
    setUnassignConfirm({ opened: false });
  };

  const handleProposalUnassign = async () => {
    if (!unassignConfirm.opened) return;
    const response = await unassignProposal({ slotId: unassignConfirm.id });

    setUnassignConfirm({ opened: false });

    if (response.error) {
      const error = { error: response.error };
      if (isAppBaseQueryError(error)) {
        setUnassignResult({
          ok: false,
          error: getScheduleErrorState(error.error, {
            retry: () => null,
          }),
        });
        return;
      }
    }
    if (response.data) setUnassignResult(response.data);
  };

  return {
    schedule: scheduleQuery,
    tracks,
    unassignState,
    timeIntervals,
    rowsCount,
    timeStartRows,
    selectedSlot,
    unassignResult,
    unassignConfirm,
    selectedEvent,
    serializedSearchParams,
    getSchedule,
    setSelectedSlot,
    setUnassignConfirm,
    handleUnassignClose,
    handleUnassignConfirmDialogClose,
    handleProposalUnassign,
  };
};

export default useScheduleData;

import { useSearchParams } from 'next/navigation';
import {
  useAssignProposalMutation,
  useLazyGetProposalsByTrackIdQuery,
} from '../api/scheduleApi';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { ID } from '@/shared/types/primitives.types';
import { ResponseScheduleSlot } from '@/entities/schedule/api/contracts';
import getFreeIntervals, {
  toMs,
} from '@/entities/schedule/lib/getFreeIntervals';
import { PatchScheduleAssignRequest } from '@/entities/schedule/api/schema';
import { ScheduleDay } from '@/entities/schedule/model/types';

const useScheduleAssignData = (
  scheduleSlots: ResponseScheduleSlot[],
  timeIntervals: {
    from: string;
    to: string;
  }[],
  days: ScheduleDay[],
  setSelectedSlot: Dispatch<
    SetStateAction<{
      trackId: ID;
      startTime: string;
      endTime: string;
    } | null>
  >,
  selectedEvent: ID,
) => {
  // state
  const searchParams = useSearchParams();

  const [getProposals, proposalsState] = useLazyGetProposalsByTrackIdQuery();
  const [assignProposal, assignState] = useAssignProposalMutation();

  const [isAssignDialogOpened, setIsAssignDialogOpened] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [selectedProposal, setSelectedProposal] = useState<{
    id: ID;
    eventId: ID;
    label: string;
    duration: number;
  } | null>(null);
  const [selectedInterval, setSelectedInterval] = useState('');

  const isLoading = proposalsState.isLoading || assignState.isLoading;

  const busySlots = useMemo(
    () => scheduleSlots.filter((item) => item.slot.trackId === selectedTrack),
    [selectedTrack, scheduleSlots],
  );

  const freeIntervals = useMemo(
    () =>
      timeIntervals.flatMap((time) =>
        getFreeIntervals(
          time,
          busySlots.map((slot) => ({
            startTime: slot.slot.startTime,
            endTime: slot.slot.endTime,
          })),
        ).map((interval) => {
          if (!selectedProposal) return interval;
          const intervalTo =
            toMs(interval.from) + selectedProposal.duration * 60 * 1000;

          return {
            from: interval.from,
            to: new Date(intervalTo).toISOString(),
          };
        }),
      ),
    [busySlots, timeIntervals, selectedProposal],
  );

  // useEffect

  useEffect(() => {
    if (
      selectedTrack === '' ||
      selectedProposal === null ||
      selectedInterval === ''
    ) {
      setSelectedSlot(null);
      return;
    }

    const [startTime, endTime] = selectedInterval.split(',');
    setSelectedSlot({
      trackId: selectedTrack,
      startTime,
      endTime,
    });
  }, [selectedTrack, selectedProposal, selectedInterval, setSelectedSlot]);

  // handlers

  const handleTrackSelect = (value: string) => {
    const track = value.trim();
    if (!track) return;

    setSelectedTrack(track);
    setSelectedProposal(null);
    setSelectedInterval('');
    getProposals({ eventId: selectedEvent, trackId: track });
  };

  const handleProposalSelect = (
    proposal: { id: ID; label: string; duration: number; eventId: ID } | null,
  ) => {
    if (selectedTrack === '') return;

    if (!proposal) {
      setSelectedProposal(null);
      setSelectedInterval('');
      return;
    }

    setSelectedProposal(proposal);
    setSelectedInterval('');
  };

  const handleIntervalSelect = (value: string) => {
    const interval = value.trim();
    if (!interval || selectedTrack === '' || !selectedProposal) return;

    setSelectedInterval(interval);
  };

  const handleProposalAssign = async () => {
    if (
      selectedTrack === '' ||
      !selectedProposal ||
      selectedInterval === '' ||
      selectedEvent === ''
    )
      return;

    const [startTime, endTime] = selectedInterval.split(',');

    const payload: PatchScheduleAssignRequest = {
      trackId: selectedTrack,
      proposalId: selectedProposal.id,
      eventId: selectedEvent,
      startTime,
      endTime,
      date: searchParams.get('date') ?? days[0].date,
    };

    const response = await assignProposal(payload);

    if (!response.error) {
      setSelectedTrack('');
      setSelectedProposal(null);
      setSelectedInterval('');
    }
    setIsAssignDialogOpened(true);
  };

  const handleCloseAssignDialog = () => {
    setIsAssignDialogOpened(false);
  };

  return {
    proposalsState,
    assignState,
    isAssignDialogOpened,
    selectedTrack,
    selectedProposal,
    selectedInterval,
    isLoading,
    freeIntervals,
    handleTrackSelect,
    handleProposalSelect,
    handleIntervalSelect,
    handleProposalAssign,
    handleCloseAssignDialog,
  };
};

export default useScheduleAssignData;

import { PatchScheduleAssignRequest } from '@/entities/schedule/api/schema';
import { tracks } from '../db/tracks';
import { proposals } from '../db/proposals';
import { schedule } from '../db/schedule';
import { toMs } from '@/entities/schedule/lib/getFreeIntervals';
import { addHourToIso } from '@/shared/utils/formatTimeAndDate';
import { getMinutesDiff } from '@/entities/schedule/lib/grid';
import { AssignmentError } from './scheduleAssignErrorParse';
import { speakers } from '../db/speakers';
import { events } from '../db/events';
import { Schedule } from '@/entities/schedule/model/types';

export const isValidScheduleAssignment = (
  payload: PatchScheduleAssignRequest,
): true | AssignmentError => {
  const { trackId, date, startTime, endTime, proposalId, eventId } = payload;

  const event = events.find((event) => event.id === eventId);
  if (!event) return 'EVENT_NOT_FOUND';

  const scheduleByEventId: Schedule = {
    days: schedule.days.filter((day) => day.eventId === event.id),
    times: schedule.times.filter((time) => time.eventId === event.id),
    slots: schedule.slots.filter((slot) => slot.eventId === event.id),
  };

  const proposal = proposals.find((proposal) => proposal.id === proposalId);
  if (!proposal) return 'PROPOSAL_NOT_FOUND';

  if (proposal.status !== 'accepted') return 'INVALID_STATUS';

  const track = tracks.find((track) => track.id === trackId);
  if (!track) return 'TRACK_NOT_FOUND';

  const isTrackValid = proposal.trackId === track.id;

  if (!isTrackValid) return 'TRACK_MISMATCH';

  const scheduleDay = scheduleByEventId.days.find((day) => day.date === date);

  if (!scheduleDay) return 'INVALID_DAY';
  if (scheduleDay.eventId !== proposal.eventId) return 'INVALID_DAY';

  const intervalsDiff = getMinutesDiff(startTime, endTime);

  if (intervalsDiff !== proposal.duration) return 'INVALID_DURATION';

  const assignFrom = toMs(startTime);
  const assignTo = toMs(endTime);

  if (
    Number.isNaN(assignFrom) ||
    Number.isNaN(assignTo) ||
    assignFrom >= assignTo
  ) {
    return 'INVALID_INTERVAL';
  }

  const dayTimes = scheduleByEventId.times
    .filter((time) => time.time.startsWith(date))
    .sort((a, b) => toMs(a.time) - toMs(b.time));

  if (dayTimes.length === 0) return 'INVALID_INTERVAL';

  const dayStart = toMs(dayTimes[0].time);
  const dayEnd = toMs(addHourToIso(dayTimes[dayTimes.length - 1].time));

  const isInsideScheduleDay = dayStart <= assignFrom && assignTo <= dayEnd;

  if (!isInsideScheduleDay) return 'INVALID_INTERVAL';

  const busySpeakers = speakers.filter((speaker) =>
    proposal.speakerIds.includes(speaker.id),
  );

  if (busySpeakers.length === 0) return 'SPEAKERS_NOT_FOUND';

  const speakersAnotherScheduleSlots = scheduleByEventId.slots.filter(
    (slot) => {
      if (slot.date !== date) return false;

      const scheduledProposal = proposals.find(
        (proposal) => proposal.id === slot.proposalId,
      );
      if (!scheduledProposal) return false;

      for (const speaker of busySpeakers) {
        if (scheduledProposal.speakerIds.includes(speaker.id)) return true;
      }
    },
  );

  const hasSpeakersOverlap = speakersAnotherScheduleSlots.some((slot) => {
    const slotFrom = toMs(slot.startTime);
    const slotTo = toMs(slot.endTime);

    return assignFrom < slotTo && assignTo > slotFrom;
  });

  if (hasSpeakersOverlap) return 'SPEAKER_CONFLICT';

  const busySlots = scheduleByEventId.slots.filter(
    (slot) =>
      slot.trackId === trackId &&
      slot.date === date &&
      slot.proposalId !== proposalId,
  );

  const hasTimeConflict = busySlots.some((slot) => {
    const busyFrom = toMs(slot.startTime);
    const busyTo = toMs(slot.endTime);

    return assignFrom < busyTo && assignTo > busyFrom;
  });

  if (hasTimeConflict) return 'TIME_CONFLICT';

  return true;
};

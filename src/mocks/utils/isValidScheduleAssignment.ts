import { PatchScheduleAssignRequest } from '@/entities/schedule/api/schema';
import { tracks } from '../db/tracks';
import { proposals } from '../db/proposals';
import { schedule } from '../db/schedule';
import { toMs } from '@/entities/schedule/lib/getFreeIntervals';
import { addHourToIso } from '@/shared/utils/formatTimeAndDate';
import { getMinutesDiff } from '@/entities/schedule/lib/grid';
import { AssignmentError } from './scheduleAssignErrorParse';
import { speakers } from '../db/speakers';

export const isValidScheduleAssignment = (
  payload: PatchScheduleAssignRequest,
): true | AssignmentError => {
  const { trackId, date, startTime, endTime, proposalId } = payload;

  const proposal = proposals.find((proposal) => proposal.id === proposalId);
  if (!proposal) return 'PROPOSAL_NOT_FOUND';

  if (proposal.status !== 'accepted') return 'INVALID_STATUS';

  const track = tracks.find((track) => track.id === trackId);
  if (!track) return 'TRACK_NOT_FOUND';

  const isTrackValid = proposal.trackId === track.id;

  if (!isTrackValid) return 'TRACK_MISMATCH';

  const isDateValid = schedule.days.some((day) => day.date === date);

  if (!isDateValid) return 'INVALID_DAY';

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

  const dayTimes = schedule.times
    .filter((time) => time.startsWith(date))
    .sort((a, b) => toMs(a) - toMs(b));

  if (dayTimes.length === 0) return 'INVALID_INTERVAL';

  const dayStart = toMs(dayTimes[0]);
  const dayEnd = toMs(addHourToIso(dayTimes[dayTimes.length - 1]));

  const isInsideScheduleDay = dayStart <= assignFrom && assignTo <= dayEnd;

  if (!isInsideScheduleDay) return 'INVALID_INTERVAL';

  const busySpeakers = speakers.filter((speaker) =>
    proposal.speakerIds.includes(speaker.id),
  );

  if (busySpeakers.length === 0) return 'SPEAKERS_NOT_FOUND';

  const speakersAnotherScheduleSlots = schedule.slots.filter((slot) => {
    if (slot.date !== date) return false;

    const scheduledProposal = proposals.find(
      (proposal) => proposal.id === slot.proposalId,
    );
    if (!scheduledProposal) return false;

    for (const speaker of busySpeakers) {
      if (scheduledProposal.speakerIds.includes(speaker.id)) return true;
    }
  });

  const hasSpeakersOverlap = speakersAnotherScheduleSlots.some((slot) => {
    const slotFrom = toMs(slot.startTime);
    const slotTo = toMs(slot.endTime);

    return assignFrom < slotTo && assignTo > slotFrom;
  });

  if (hasSpeakersOverlap) return 'SPEAKER_CONFLICT';

  const busySlots = schedule.slots.filter(
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

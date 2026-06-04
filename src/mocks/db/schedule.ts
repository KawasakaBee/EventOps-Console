import { PatchScheduleAssignRequest } from '@/entities/schedule/api/schema';
import { Schedule, ScheduleSlot } from '@/entities/schedule/model/types';

export const initialSchedule = {
  eventId: '1',

  days: [
    {
      date: '2026-04-21',
      title: 'День 1',
    },
    {
      date: '2026-04-22',
      title: 'День 2',
    },
    {
      date: '2026-04-23',
      title: 'День 3',
    },
  ],

  times: [
    '2026-04-21T10:00:00.00Z',
    '2026-04-21T11:00:00.00Z',
    '2026-04-21T12:00:00.00Z',
    '2026-04-21T14:00:00.00Z',

    '2026-04-22T10:00:00.00Z',
    '2026-04-22T11:00:00.00Z',
    '2026-04-22T12:00:00.00Z',
    '2026-04-22T14:00:00.00Z',

    '2026-04-23T10:00:00.00Z',
    '2026-04-23T11:00:00.00Z',
    '2026-04-23T12:00:00.00Z',
    '2026-04-23T14:00:00.00Z',
  ],

  slots: [
    {
      id: 'schedule-slot-001',
      trackId: '1',
      date: '2026-04-21',
      startTime: '2026-04-21T10:00:00.00Z',
      endTime: '2026-04-21T11:30:00.00Z',
      proposalId: 'proposal-051',
    },
    {
      id: 'schedule-slot-003',
      trackId: '3',
      date: '2026-04-21',
      startTime: '2026-04-21T10:00:00.00Z',
      endTime: '2026-04-21T10:30:00.00Z',
      proposalId: 'proposal-018',
    },
    {
      id: 'schedule-slot-009',
      trackId: '4',
      date: '2026-04-21',
      startTime: '2026-04-21T11:00:00.00Z',
      endTime: '2026-04-21T11:45:00.00Z',
      proposalId: 'proposal-024',
    },
    {
      id: 'schedule-slot-017',
      trackId: '2',
      date: '2026-04-21',
      startTime: '2026-04-21T14:00:00.00Z',
      endTime: '2026-04-21T14:45:00.00Z',
      proposalId: 'proposal-037',
    },
    {
      id: 'schedule-slot-025',
      trackId: '5',
      date: '2026-04-22',
      startTime: '2026-04-22T10:00:00.00Z',
      endTime: '2026-04-22T12:00:00.00Z',
      proposalId: 'proposal-085',
    },
    {
      id: 'schedule-slot-032',
      trackId: '2',
      date: '2026-04-22',
      startTime: '2026-04-22T12:00:00.00Z',
      endTime: '2026-04-22T12:30:00.00Z',
      proposalId: 'proposal-097',
    },
    {
      id: 'schedule-slot-039',
      trackId: '4',
      date: '2026-04-22',
      startTime: '2026-04-22T14:00:00.00Z',
      endTime: '2026-04-22T14:45:00.00Z',
      proposalId: 'proposal-074',
    },
    {
      id: 'schedule-slot-042',
      trackId: '2',
      date: '2026-04-23',
      startTime: '2026-04-23T10:00:00.00Z',
      endTime: '2026-04-23T12:00:00.00Z',
      proposalId: 'proposal-072',
    },
  ],
} satisfies Schedule;

export const schedule: Schedule = {
  eventId: initialSchedule.eventId,
  days: [...initialSchedule.days],
  times: [...initialSchedule.times],
  slots: [...initialSchedule.slots],
};

const createScheduleSlot = (
  payload: PatchScheduleAssignRequest,
): ScheduleSlot => {
  const { trackId, date, startTime, endTime, proposalId } = payload;
  const slot: ScheduleSlot = {
    id: crypto.randomUUID(),
    trackId,
    date,
    startTime,
    endTime,
    proposalId,
  };

  return slot;
};

export const assignScheduleSlot = (
  payload: PatchScheduleAssignRequest,
): ScheduleSlot => {
  const slot = createScheduleSlot(payload);

  schedule.slots.push(slot);

  return slot;
};

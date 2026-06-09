import { PatchScheduleAssignRequest } from '@/entities/schedule/api/schema';
import { Schedule, ScheduleSlot } from '@/entities/schedule/model/types';
import { ID } from '@/shared/types/primitives.types';

export const initialSchedule = {
  days: [
    {
      date: '2026-04-21',
      eventId: '1',
      title: 'День 1',
    },
    {
      date: '2026-04-22',
      eventId: '1',
      title: 'День 2',
    },
    {
      date: '2026-04-23',
      eventId: '1',
      title: 'День 3',
    },
    {
      eventId: '2',
      date: '2026-05-12',
      title: 'День 1',
    },
    {
      eventId: '2',
      date: '2026-05-13',
      title: 'День 2',
    },
    {
      eventId: '3',
      date: '2026-06-16',
      title: 'День 1',
    },
    {
      eventId: '3',
      date: '2026-06-17',
      title: 'День 2',
    },
    {
      eventId: '4',
      date: '2026-09-08',
      title: 'День 1',
    },
    {
      eventId: '4',
      date: '2026-09-09',
      title: 'День 2',
    },
  ],

  times: [
    { time: '2026-04-21T10:00:00.00Z', eventId: '1' },
    { time: '2026-04-21T11:00:00.00Z', eventId: '1' },
    { time: '2026-04-21T12:00:00.00Z', eventId: '1' },
    { time: '2026-04-21T14:00:00.00Z', eventId: '1' },
    { time: '2026-04-22T10:00:00.00Z', eventId: '1' },
    { time: '2026-04-22T11:00:00.00Z', eventId: '1' },
    { time: '2026-04-22T12:00:00.00Z', eventId: '1' },
    { time: '2026-04-22T14:00:00.00Z', eventId: '1' },
    { time: '2026-04-23T10:00:00.00Z', eventId: '1' },
    { time: '2026-04-23T11:00:00.00Z', eventId: '1' },
    { time: '2026-04-23T12:00:00.00Z', eventId: '1' },
    { time: '2026-04-23T14:00:00.00Z', eventId: '1' },

    { time: '2026-05-12T10:00:00.00Z', eventId: '2' },
    { time: '2026-05-12T11:00:00.00Z', eventId: '2' },
    { time: '2026-05-12T12:00:00.00Z', eventId: '2' },
    { time: '2026-05-12T14:00:00.00Z', eventId: '2' },
    { time: '2026-05-13T10:00:00.00Z', eventId: '2' },
    { time: '2026-05-13T11:00:00.00Z', eventId: '2' },
    { time: '2026-05-13T12:00:00.00Z', eventId: '2' },
    { time: '2026-05-13T14:00:00.00Z', eventId: '2' },

    { time: '2026-06-16T10:00:00.00Z', eventId: '3' },
    { time: '2026-06-16T11:00:00.00Z', eventId: '3' },
    { time: '2026-06-16T12:00:00.00Z', eventId: '3' },
    { time: '2026-06-16T14:00:00.00Z', eventId: '3' },
    { time: '2026-06-17T10:00:00.00Z', eventId: '3' },
    { time: '2026-06-17T11:00:00.00Z', eventId: '3' },
    { time: '2026-06-17T12:00:00.00Z', eventId: '3' },
    { time: '2026-06-17T14:00:00.00Z', eventId: '3' },

    { time: '2026-09-08T10:00:00.00Z', eventId: '4' },
    { time: '2026-09-08T11:00:00.00Z', eventId: '4' },
    { time: '2026-09-08T12:00:00.00Z', eventId: '4' },
    { time: '2026-09-08T14:00:00.00Z', eventId: '4' },
    { time: '2026-09-09T10:00:00.00Z', eventId: '4' },
    { time: '2026-09-09T11:00:00.00Z', eventId: '4' },
    { time: '2026-09-09T12:00:00.00Z', eventId: '4' },
    { time: '2026-09-09T14:00:00.00Z', eventId: '4' },
  ],

  slots: [
    {
      id: 'schedule-slot-001',
      eventId: '1',
      trackId: '1',
      date: '2026-04-21',
      startTime: '2026-04-21T10:00:00.00Z',
      endTime: '2026-04-21T11:30:00.00Z',
      proposalId: 'proposal-051',
    },
    {
      id: 'schedule-slot-003',
      eventId: '1',
      trackId: '3',
      date: '2026-04-21',
      startTime: '2026-04-21T10:00:00.00Z',
      endTime: '2026-04-21T10:30:00.00Z',
      proposalId: 'proposal-018',
    },
    {
      id: 'schedule-slot-043',
      eventId: '1',
      trackId: '5',
      date: '2026-04-21',
      startTime: '2026-04-21T10:00:00.00Z',
      endTime: '2026-04-21T10:30:00.00Z',
      proposalId: 'proposal-005',
    },
    {
      id: 'schedule-slot-044',
      eventId: '1',
      trackId: '3',
      date: '2026-04-21',
      startTime: '2026-04-21T11:00:00.00Z',
      endTime: '2026-04-21T11:45:00.00Z',
      proposalId: 'proposal-008',
    },
    {
      id: 'schedule-slot-009',
      eventId: '1',
      trackId: '4',
      date: '2026-04-21',
      startTime: '2026-04-21T11:00:00.00Z',
      endTime: '2026-04-21T11:45:00.00Z',
      proposalId: 'proposal-024',
    },
    {
      id: 'schedule-slot-045',
      eventId: '1',
      trackId: '1',
      date: '2026-04-21',
      startTime: '2026-04-21T12:00:00.00Z',
      endTime: '2026-04-21T12:45:00.00Z',
      proposalId: 'proposal-011',
    },
    {
      id: 'schedule-slot-017',
      eventId: '1',
      trackId: '2',
      date: '2026-04-21',
      startTime: '2026-04-21T14:00:00.00Z',
      endTime: '2026-04-21T14:45:00.00Z',
      proposalId: 'proposal-037',
    },
    {
      id: 'schedule-slot-046',
      eventId: '1',
      trackId: '1',
      date: '2026-04-22',
      startTime: '2026-04-22T10:00:00.00Z',
      endTime: '2026-04-22T11:30:00.00Z',
      proposalId: 'proposal-046',
    },
    {
      id: 'schedule-slot-025',
      eventId: '1',
      trackId: '5',
      date: '2026-04-22',
      startTime: '2026-04-22T10:00:00.00Z',
      endTime: '2026-04-22T12:00:00.00Z',
      proposalId: 'proposal-085',
    },
    {
      id: 'schedule-slot-047',
      eventId: '1',
      trackId: '3',
      date: '2026-04-22',
      startTime: '2026-04-22T11:00:00.00Z',
      endTime: '2026-04-22T11:45:00.00Z',
      proposalId: 'proposal-058',
    },
    {
      id: 'schedule-slot-032',
      eventId: '1',
      trackId: '2',
      date: '2026-04-22',
      startTime: '2026-04-22T12:00:00.00Z',
      endTime: '2026-04-22T12:30:00.00Z',
      proposalId: 'proposal-097',
    },
    {
      id: 'schedule-slot-048',
      eventId: '1',
      trackId: '5',
      date: '2026-04-22',
      startTime: '2026-04-22T12:00:00.00Z',
      endTime: '2026-04-22T12:30:00.00Z',
      proposalId: 'proposal-060',
    },
    {
      id: 'schedule-slot-039',
      eventId: '1',
      trackId: '4',
      date: '2026-04-22',
      startTime: '2026-04-22T14:00:00.00Z',
      endTime: '2026-04-22T14:45:00.00Z',
      proposalId: 'proposal-074',
    },
    {
      id: 'schedule-slot-042',
      eventId: '1',
      trackId: '2',
      date: '2026-04-23',
      startTime: '2026-04-23T10:00:00.00Z',
      endTime: '2026-04-23T12:00:00.00Z',
      proposalId: 'proposal-072',
    },
    {
      id: 'schedule-slot-049',
      eventId: '1',
      trackId: '3',
      date: '2026-04-23',
      startTime: '2026-04-23T10:00:00.00Z',
      endTime: '2026-04-23T10:30:00.00Z',
      proposalId: 'proposal-078',
    },
    {
      id: 'schedule-slot-050',
      eventId: '1',
      trackId: '5',
      date: '2026-04-23',
      startTime: '2026-04-23T14:00:00.00Z',
      endTime: '2026-04-23T14:45:00.00Z',
      proposalId: 'proposal-090',
    },
    {
      id: 'schedule-slot-051',
      eventId: '2',
      trackId: '2',
      date: '2026-05-12',
      startTime: '2026-05-12T10:00:00.00Z',
      endTime: '2026-05-12T11:30:00.00Z',
      proposalId: 'proposal-101',
    },
    {
      id: 'schedule-slot-052',
      eventId: '2',
      trackId: '3',
      date: '2026-05-12',
      startTime: '2026-05-12T11:00:00.00Z',
      endTime: '2026-05-12T11:45:00.00Z',
      proposalId: 'proposal-102',
    },
    {
      id: 'schedule-slot-053',
      eventId: '3',
      trackId: '4',
      date: '2026-06-16',
      startTime: '2026-06-16T10:00:00.00Z',
      endTime: '2026-06-16T11:30:00.00Z',
      proposalId: 'proposal-107',
    },
    {
      id: 'schedule-slot-054',
      eventId: '3',
      trackId: '5',
      date: '2026-06-16',
      startTime: '2026-06-16T12:00:00.00Z',
      endTime: '2026-06-16T12:45:00.00Z',
      proposalId: 'proposal-108',
    },
    {
      id: 'schedule-slot-055',
      eventId: '4',
      trackId: '5',
      date: '2026-09-08',
      startTime: '2026-09-08T10:00:00.00Z',
      endTime: '2026-09-08T11:30:00.00Z',
      proposalId: 'proposal-113',
    },
    {
      id: 'schedule-slot-056',
      eventId: '4',
      trackId: '1',
      date: '2026-09-08',
      startTime: '2026-09-08T11:00:00.00Z',
      endTime: '2026-09-08T11:45:00.00Z',
      proposalId: 'proposal-114',
    },
    {
      id: 'schedule-slot-057',
      eventId: '4',
      trackId: '2',
      date: '2026-09-09',
      startTime: '2026-09-09T10:00:00.00Z',
      endTime: '2026-09-09T10:45:00.00Z',
      proposalId: 'proposal-115',
    },
  ],
} satisfies Schedule;

export const schedule: Schedule = {
  days: [...initialSchedule.days],
  times: [...initialSchedule.times],
  slots: [...initialSchedule.slots],
};

const createScheduleSlot = (
  payload: PatchScheduleAssignRequest,
): ScheduleSlot => {
  const { trackId, date, startTime, endTime, proposalId, eventId } = payload;

  const slot: ScheduleSlot = {
    id: crypto.randomUUID(),
    eventId,
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

export const unassignScheduleSlot = (slotId: ID): { ok: true } | null => {
  const slotIdx = schedule.slots.findIndex((slot) => slot.id === slotId);

  if (slotIdx === -1) return null;

  schedule.slots.splice(slotIdx, 1);

  return { ok: true };
};

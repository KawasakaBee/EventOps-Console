import { describe, expect, it } from 'vitest';
import { isValidScheduleAssignment } from './isValidScheduleAssignment';

const validTestPayload = {
  trackId: '2',
  date: '2026-04-21',
  startTime: '2026-04-21T10:00:00.00Z',
  endTime: '2026-04-21T10:30:00.00Z',
  proposalId: 'proposal-097',
};

describe('isValidScheduleAssignment', () => {
  it('Заявка может быть назначена в самое начало дня своего трека на свободную клетку расписания', () => {
    expect(isValidScheduleAssignment(validTestPayload)).toBe(true);
  });

  it('Заявка может быть назначена в оставшееся время временного промежутка своего трека на свободную клетку расписания', () => {
    expect(
      isValidScheduleAssignment({
        ...validTestPayload,
        startTime: '2026-04-21T11:30:00.00Z',
        endTime: '2026-04-21T12:00:00.00Z',
      }),
    ).toBe(true);
  });

  it('Продолжительность заявки может выходить за свой временной диапазон, если слот следеющего временного диапазона свободен', () => {
    expect(
      isValidScheduleAssignment({
        date: '2026-04-22',
        proposalId: 'proposal-072',
        trackId: '2',
        startTime: '2026-04-22T10:00:00.00Z',
        endTime: '2026-04-22T12:00:00.00Z',
      }),
    ).toBe(true);
  });

  it('Несуществующая заявка не можеть быть назначена в расписание', () => {
    expect(
      isValidScheduleAssignment({
        ...validTestPayload,
        proposalId: 'trashProposalId',
      }),
    ).toBe('PROPOSAL_NOT_FOUND');
  });

  it('Заявка с невалидным статусом не может быть назначена', () => {
    expect(
      isValidScheduleAssignment({
        ...validTestPayload,
        proposalId: 'proposal-098',
      }),
    ).toBe('INVALID_STATUS');
  });

  it('Невалидный трек не может быть назначен', () => {
    expect(
      isValidScheduleAssignment({
        ...validTestPayload,
        trackId: 'trash',
      }),
    ).toBe('TRACK_NOT_FOUND');
  });

  it('Заявка не может быть назначена не на свой трек', () => {
    expect(
      isValidScheduleAssignment({
        ...validTestPayload,
        proposalId: 'proposal-085',
      }),
    ).toBe('TRACK_MISMATCH');
  });

  it('Заявка не может быть назначена на несуществующий день', () => {
    expect(
      isValidScheduleAssignment({
        ...validTestPayload,
        date: '2026-03-16',
      }),
    ).toBe('INVALID_DAY');
  });

  it('Заявка не может быть назначена вне времени расписания', () => {
    expect(
      isValidScheduleAssignment({
        ...validTestPayload,
        startTime: '2026-04-21T09:00:00.00Z',
        endTime: '2026-04-21T09:30:00.00Z',
      }),
    ).toBe('INVALID_INTERVAL');
  });

  it('Продолжительность заявки не может выходить быть назначена на занятый слот', () => {
    expect(
      isValidScheduleAssignment({
        date: '2026-04-22',
        proposalId: 'proposal-072',
        trackId: '2',
        startTime: '2026-04-22T10:30:00.00Z',
        endTime: '2026-04-22T12:30:00.00Z',
      }),
    ).toBe('TIME_CONFLICT');
  });
});

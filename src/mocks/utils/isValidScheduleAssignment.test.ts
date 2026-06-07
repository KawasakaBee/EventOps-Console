import { describe, expect, it } from 'vitest';
import { isValidScheduleAssignment } from './isValidScheduleAssignment';

const validTestPayload = {
  trackId: '2',
  date: '2026-04-21',
  startTime: '2026-04-21T10:00:00.00Z',
  endTime: '2026-04-21T11:30:00.00Z',
  proposalId: 'proposal-067',
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
        endTime: '2026-04-21T13:00:00.00Z',
      }),
    ).toBe(true);
  });

  it('Продолжительность заявки может выходить за свой временной диапазон, если слот следующего временного диапазона свободен', () => {
    expect(
      isValidScheduleAssignment({
        date: '2026-04-22',
        proposalId: 'proposal-088',
        trackId: '3',
        startTime: '2026-04-22T12:00:00.00Z',
        endTime: '2026-04-22T14:00:00.00Z',
      }),
    ).toBe(true);
  });

  it('Несуществующая заявка не может быть назначена в расписание', () => {
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
        proposalId: 'proposal-088',
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

  it('Заявка не может быть назначена с невалидной продолжительностью', () => {
    expect(
      isValidScheduleAssignment({
        ...validTestPayload,
        startTime: '2026-04-21T10:00:00.00Z',
        endTime: '2026-04-21T13:00:00.00Z',
      }),
    ).toBe('INVALID_DURATION');
  });

  it('Заявка не может быть назначена вне времени расписания', () => {
    expect(
      isValidScheduleAssignment({
        ...validTestPayload,
        startTime: '2026-04-21T09:00:00.00Z',
        endTime: '2026-04-21T10:30:00.00Z',
      }),
    ).toBe('INVALID_INTERVAL');
  });

  it('Заявка не может быть назначена на занятый слот', () => {
    expect(
      isValidScheduleAssignment({
        proposalId: 'proposal-010',
        trackId: '5',
        date: '2026-04-22',
        startTime: '2026-04-22T12:00:00.00Z',
        endTime: '2026-04-22T12:30:00.00Z',
      }),
    ).toBe('TIME_CONFLICT');
  });

  it('Заявка не может быть назначена на слот, если в этот день в это же время выступают спикеры из этой заявки', () => {
    expect(
      isValidScheduleAssignment({
        proposalId: 'proposal-019',
        trackId: '4',
        date: '2026-04-22',
        startTime: '2026-04-22T10:00:00.00Z',
        endTime: '2026-04-22T10:45:00.00Z',
      }),
    ).toBe('SPEAKER_CONFLICT');
  });
});

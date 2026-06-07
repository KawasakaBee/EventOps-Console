import { describe, expect, it } from 'vitest';
import { schedule } from '../db/schedule';
import {
  GetScheduleResponse,
  PatchScheduleAssignResponse,
} from '@/entities/schedule/api/contracts';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { GetProposalResponse } from '@/entities/proposal/api/contracts';

const validTestPayload = {
  trackId: '2',
  date: '2026-04-21',
  startTime: '2026-04-21T10:00:00.00Z',
  endTime: '2026-04-21T11:30:00.00Z',
  proposalId: 'proposal-067',
};

describe('/api/schedule/assign', () => {
  it('Назначение заявки в слот с последующим изменением статуса', async () => {
    const response = await fetch('/api/schedule/assign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({ ...validTestPayload }),
    });

    const body: PatchScheduleAssignResponse = await response.json();

    expect(response.status).toBe(200);
    expect(
      schedule.slots.findIndex((slot) => slot.id === body.slot.slot.id),
    ).not.toBe(-1);

    const scheduleResponse = await fetch('/api/schedule?date=2026-04-21', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
    });

    const updatedSchedule: GetScheduleResponse = await scheduleResponse.json();

    expect(updatedSchedule.slots).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ slot: body.slot.slot }),
      ]),
    );

    const proposalResult = await fetch('/api/proposals/proposal-067', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
    });

    const proposal: GetProposalResponse = await proposalResult.json();

    expect(proposal.proposal.status).toBe('scheduled');
  });

  it('Администратор может назначать заявку в слот расписания', async () => {
    const adminResponse = await fetch('/api/schedule/assign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=1`,
      },
      body: JSON.stringify({ ...validTestPayload }),
    });

    expect(adminResponse.status).toBe(200);
  });

  it('Менеджер может назначать заявку в слот расписания', async () => {
    const managerResponse = await fetch('/api/schedule/assign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({ ...validTestPayload }),
    });

    expect(managerResponse.status).toBe(200);
  });

  it('Ревьюер или спикер не могут назначать заявку в слот расписания', async () => {
    const reviewerResponse = await fetch('/api/schedule/assign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=3`,
      },
      body: JSON.stringify({ ...validTestPayload }),
    });

    expect(reviewerResponse.status).toBe(403);

    const speakerResponse = await fetch('/api/schedule/assign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=4`,
      },
      body: JSON.stringify({ ...validTestPayload }),
    });

    expect(speakerResponse.status).toBe(403);
  });

  it('Нельзя назначить заявку с невалидным статусом', async () => {
    const response = await fetch('/api/schedule/assign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({ ...validTestPayload, proposalId: 'proposal-020' }),
    });

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toStrictEqual({
      code: 'SCHEDULE_ASSIGNMENT',
      message: 'Заявка должна быть в статусе \"Принята\"',
    });
  });

  it('Нельзя назначить заявку с невалидным треком', async () => {
    const response = await fetch('/api/schedule/assign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({ ...validTestPayload, proposalId: 'proposal-034' }),
    });

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toStrictEqual({
      code: 'SCHEDULE_ASSIGNMENT',
      message: 'Трек слота и назначаемой заявки должны совпадать',
    });
  });

  it('Нельзя назначить заявку с неправильной продолжительностью', async () => {
    const response = await fetch('/api/schedule/assign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({
        ...validTestPayload,
        endTime: '2026-04-21T10:30:00.00Z',
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toStrictEqual({
      code: 'SCHEDULE_ASSIGNMENT',
      message: 'Продолжительность не совпадает с выбранным временем',
    });
  });

  it('Нельзя назначить заявку, если спикер заявки в это время уже выступает', async () => {
    const response = await fetch('/api/schedule/assign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({
        proposalId: 'proposal-019',
        trackId: '4',
        date: '2026-04-22',
        startTime: '2026-04-22T10:00:00.00Z',
        endTime: '2026-04-22T10:45:00.00Z',
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toStrictEqual({
      code: 'SCHEDULE_ASSIGNMENT',
      message: 'Спикеры данной заявки выступают в это время в другом треке',
    });
  });

  it('Нельзя назначить заявку, если слот занят', async () => {
    const response = await fetch('/api/schedule/assign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({
        ...validTestPayload,
        date: '2026-04-22',
        startTime: '2026-04-22T12:00:00.00Z',
        endTime: '2026-04-22T13:30:00.00Z',
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toStrictEqual({
      code: 'SCHEDULE_ASSIGNMENT',
      message: 'Выбранный слот занят',
    });
  });
});

describe('/api/schedule/unassign', () => {
  it('Удаление заявки из слота с последующим изменением статуса', async () => {
    const response = await fetch('/api/schedule/unassign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({ slotId: 'schedule-slot-001' }),
    });

    expect(response.status).toBe(200);
    expect(
      schedule.slots.findIndex((slot) => slot.id === 'schedule-slot-001'),
    ).toBe(-1);

    const scheduleResponse = await fetch('/api/schedule?date=2026-04-21', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
    });

    const updatedSchedule: GetScheduleResponse = await scheduleResponse.json();

    expect(
      updatedSchedule.slots.some(
        (item) => item.slot.id === 'schedule-slot-001',
      ),
    ).toBe(false);

    const proposalResult = await fetch('/api/proposals/proposal-051', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
    });

    const proposal: GetProposalResponse = await proposalResult.json();

    expect(proposal.proposal.status).toBe('accepted');
  });

  it('Администратор может удалять заявку из слота расписания', async () => {
    const adminResponse = await fetch('/api/schedule/unassign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=1`,
      },
      body: JSON.stringify({ slotId: 'schedule-slot-001' }),
    });

    expect(adminResponse.status).toBe(200);
  });

  it('Менеджер может удалять заявку из слота расписания', async () => {
    const managerResponse = await fetch('/api/schedule/unassign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({ slotId: 'schedule-slot-001' }),
    });

    expect(managerResponse.status).toBe(200);
  });

  it('Ревьюер или спикер не могут может удалять заявку из слота расписания', async () => {
    const reviewerResponse = await fetch('/api/schedule/unassign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=3`,
      },
      body: JSON.stringify({ slotId: 'schedule-slot-001' }),
    });

    expect(reviewerResponse.status).toBe(403);

    const speakerResponse = await fetch('/api/schedule/unassign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=4`,
      },
      body: JSON.stringify({ slotId: 'schedule-slot-001' }),
    });

    expect(speakerResponse.status).toBe(403);
  });

  it('Нельзя удалить неназначенную заявку из расписания', async () => {
    const unvalidResponse = await fetch('/api/schedule/unassign', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({ slotId: 'schedule-slot-12342134' }),
    });

    expect(unvalidResponse.status).toBe(404);
  });
});

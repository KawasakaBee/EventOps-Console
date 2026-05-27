import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { describe, expect, it } from 'vitest';

describe('PATCH /api/proposals/:id/status', () => {
  it('Менеджер переводит заявку из статуса отправлено в статус в ревью', async () => {
    const response = await fetch('/api/proposals/proposal-042/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({ status: 'in_review' }),
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.proposal.status).toBe('in_review');
    expect(body.historyEntry).toEqual(
      expect.objectContaining({
        action: 'status_changed',
      }),
    );
  });

  it('Менеджер переводит заявку из статуса в ревью в статус запрошенных изменений', async () => {
    const response = await fetch('/api/proposals/proposal-041/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({
        status: 'changes_requested',
        reason: 'Необходимость тестирования',
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.proposal.status).toBe('changes_requested');
    expect(body.historyEntry).toEqual(
      expect.objectContaining({
        action: 'status_changed',
      }),
    );
  });

  it('Менеджер переводит заявку из статуса в ревью в статус принята c ревью', async () => {
    const response = await fetch('/api/proposals/proposal-094/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({
        status: 'accepted',
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.proposal.status).toBe('accepted');
    expect(body.historyEntry).toEqual(
      expect.objectContaining({
        action: 'status_changed',
      }),
    );
  });

  it('Менеджер переводит заявку из статуса в ревью в статус отклонена c ревью', async () => {
    const response = await fetch('/api/proposals/proposal-094/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({
        status: 'rejected',
        reason: 'Необходимость тестирования',
      }),
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.proposal.status).toBe('rejected');
    expect(body.historyEntry).toEqual(
      expect.objectContaining({
        action: 'status_changed',
      }),
    );
  });

  it('Менеджер не может перевести заявку в стутус принята без ревью', async () => {
    const response = await fetch('/api/proposals/proposal-032/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({
        status: 'accepted',
      }),
    });

    expect(response.status).toBe(403);
  });

  it('Менеджер не может перевести заявку в rejected без ревью', async () => {
    const response = await fetch('/api/proposals/proposal-032/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({
        status: 'rejected',
        reason: 'Необходимость тестирования',
      }),
    });

    expect(response.status).toBe(403);
  });

  it('Ревьюер не может изменить статус заявки', async () => {
    const response = await fetch('/api/proposals/proposal-042/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=3`,
      },
      body: JSON.stringify({ status: 'in_review' }),
    });

    expect(response.status).toBe(403);
  });

  it('Спикер не может изменить статус заявки', async () => {
    const response = await fetch('/api/proposals/proposal-042/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=4`,
      },
      body: JSON.stringify({ status: 'in_review' }),
    });

    expect(response.status).toBe(403);
  });

  it('Реализация невалидной смены статуса недоступна', async () => {
    const response = await fetch('/api/proposals/proposal-042/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({ status: 'scheduled' }),
    });

    expect(response.status).toBe(403);
  });

  it('Перевод в статус запроса изменений без причины недоступен', async () => {
    const response = await fetch('/api/proposals/proposal-041/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({
        status: 'changes_requested',
      }),
    });

    expect(response.status).toBe(403);
  });

  it('Перевод в статус отклонена без причины недоступен', async () => {
    const response = await fetch('/api/proposals/proposal-094/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({
        status: 'rejected',
      }),
    });

    expect(response.status).toBe(403);
  });

  it('Unknown статус недоступен', async () => {
    const response = await fetch('/api/proposals/proposal-094/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({
        reason: 'Необходимость тестирования',
      }),
    });

    expect(response.status).toBe(400);
  });

  it('Смена статуса для несуществующей заявки недоступна', async () => {
    const response = await fetch('/api/proposals/trash-proposal-id/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({
        status: 'rejected',
        reason: 'Необходимость тестирования',
      }),
    });

    expect(response.status).toBe(404);
  });

  it('Неавторизованный пользователь не может сменить статус', async () => {
    const response = await fetch('/api/proposals/proposal-094/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'rejected',
        reason: 'Необходимость тестирования',
      }),
    });

    expect(response.status).toBe(401);
  });
});

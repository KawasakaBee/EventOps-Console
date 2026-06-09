import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { describe, expect, it } from 'vitest';
import { events } from '../db/events';

describe('GET /api/events', () => {
  it('Администратор и менеджер могжут получить список всех событий', async () => {
    const adminResponse = await fetch('/api/events', {
      method: 'GET',
      headers: {
        Cookie: `${AUTH_SESSION_COOKIE}=1`,
      },
    });

    const adminBody = await adminResponse.json();

    expect(adminResponse.status).toBe(200);
    expect(adminBody).toEqual(expect.objectContaining({ events }));

    const managerResponse = await fetch('/api/events', {
      method: 'GET',
      headers: {
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
    });

    const managerBody = await managerResponse.json();

    expect(managerResponse.status).toBe(200);
    expect(managerBody).toEqual(expect.objectContaining({ events }));
  });

  it('Пользователь может получить только список событий, к которым имеет доступ', async () => {
    const response = await fetch('/api/events', {
      method: 'GET',
      headers: {
        Cookie: `${AUTH_SESSION_COOKIE}=manager-003`,
      },
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        events: events.filter((event) => event.id === '1' || event.id === '3'),
      }),
    );
  });

  it('Неавторизованный пользователь не может получить список событий', async () => {
    const response = await fetch('/api/events');

    expect(response.status).toBe(401);
  });
});

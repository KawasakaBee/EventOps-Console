import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { describe, expect, it } from 'vitest';
import { events } from '../db/events';

const validSettingsCourse = {
  title: 'Product Analytics & UX Conference',
  description:
    'Конференция о продуктовой разработке, UX research, аналитике, принятии решений и связке инженерных метрик с пользовательской ценностью.',
  place: 'Amsterdam, Netherlands',
  startTime: '2027-07-25T10:14',
};

describe('POST /api/settings', () => {
  it('Администратор или менеджер могут создать валидное событие', async () => {
    const responseAdmin = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=1`,
      },
      body: JSON.stringify(validSettingsCourse),
    });

    const bodyAdmin = await responseAdmin.json();

    expect(responseAdmin.status).toBe(200);
    expect(events).toEqual(
      expect.arrayContaining([expect.objectContaining(bodyAdmin.event)]),
    );

    const responseManager = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({
        ...validSettingsCourse,
        title: 'Это новый заголовок',
      }),
    });

    const bodyManager = await responseManager.json();

    expect(responseManager.status).toBe(200);
    expect(events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...bodyManager.event,
          title: 'Это новый заголовок',
        }),
      ]),
    );
  });

  it('Ревьюер или спикер не могут создавать событие', async () => {
    const responseReviewer = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=3`,
      },
      body: JSON.stringify(validSettingsCourse),
    });

    expect(responseReviewer.status).toBe(403);

    const responseSpeaker = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=4`,
      },
      body: JSON.stringify(validSettingsCourse),
    });

    expect(responseSpeaker.status).toBe(403);
  });

  it('Невалидный payload не проходит', async () => {
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=1`,
      },
      body: JSON.stringify({
        title: null,
        description: 'Конференция',
        place: 'Amsterdam, Netherlands',
        startTime: '13 часов 5 июля',
      }),
    });

    expect(response.status).toBe(400);
  });

  it('Нельзя создать дубль события', async () => {
    const response = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({
        title: 'API & Cloud Reliability Forum',
        description:
          'Событие для инженеров, которые проектируют REST API, интеграции, облачную инфраструктуру, observability и надёжные backend-сервисы.',
        place: 'Berlin, Germany',
        startTime: '2026-05-12T07:00:00.00Z',
      }),
    });

    expect(response.status).toBe(400);
  });
});

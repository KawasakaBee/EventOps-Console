import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { describe, expect, it } from 'vitest';

const testCommentBody = {
  message:
    'Хороший баланс технических деталей и продуктового контекста. Рекомендую принять в программу.',
};

describe('POST /api/proposals/:id/comments', () => {
  it('Менеджер может добавить комментарий', async () => {
    const response = await fetch('/api/proposals/proposal-088/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify(testCommentBody),
    });

    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.comment.message).toBe(testCommentBody.message);
    expect(body.history).toEqual(
      expect.objectContaining({
        action: 'comment_added',
        payload: {
          commentId: body.comment.id,
        },
      }),
    );

    const detailsResponse = await fetch('/api/proposals/proposal-088', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
    });

    const detailsBody = await detailsResponse.json();

    expect(detailsBody.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: testCommentBody.message,
        }),
      ]),
    );
    expect(detailsBody.history).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: 'comment_added',
          payload: {
            commentId: body.comment.id,
          },
        }),
      ]),
    );
  });

  it('Ревьюер может добавить комментарий', async () => {
    const response = await fetch('/api/proposals/proposal-009/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=3`,
      },
      body: JSON.stringify(testCommentBody),
    });

    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.comment.message).toBe(testCommentBody.message);
    expect(body.history).toEqual(
      expect.objectContaining({
        action: 'comment_added',
        payload: {
          commentId: body.comment.id,
        },
      }),
    );
  });

  it('Ревьюер не может добавить комментарий для неназначенной ему заявки', async () => {
    const response = await fetch('/api/proposals/proposal-006/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=3`,
      },
      body: JSON.stringify(testCommentBody),
    });

    expect(response.status).toBe(403);
  });

  it('Пустой комментарий не проходит', async () => {
    const response = await fetch('/api/proposals/proposal-088/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify({ message: '' }),
    });

    expect(response.status).toBe(400);
  });

  it('Менеджер не может добавить комментарий для несуществующей заявки', async () => {
    const response = await fetch('/api/proposals/trash-propsal-id/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify(testCommentBody),
    });

    expect(response.status).toBe(404);
  });

  it('Спикер не может добавить комментарий', async () => {
    const response = await fetch('/api/proposals/proposal-088/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=4`,
      },
      body: JSON.stringify(testCommentBody),
    });

    expect(response.status).toBe(403);
  });
});

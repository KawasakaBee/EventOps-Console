import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { describe, expect, it } from 'vitest';

const testReviewBody = {
  scoreContent: '9',
  scoreRelevance: '9',
  scoreDelivery: '7',
  recommendation: 'approve',
  comment:
    'Хороший баланс технических деталей и продуктового контекста. Рекомендую принять в программу.',
};

describe('POST /api/proposals/:id/reviews', () => {
  it('Ревьюер может создать ревью для назначенной ему заявки', async () => {
    const response = await fetch('/api/proposals/proposal-088/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=reviewer-003`,
      },
      body: JSON.stringify(testReviewBody),
    });

    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.aggregatedScores).toBeDefined();
    expect(body.review).toEqual(
      expect.objectContaining({
        scoreContent: Number(testReviewBody.scoreContent),
        scoreRelevance: Number(testReviewBody.scoreRelevance),
        scoreDelivery: Number(testReviewBody.scoreDelivery),
        recommendation: testReviewBody.recommendation,
        comment: testReviewBody.comment,
      }),
    );
    expect(body.history).toEqual(
      expect.objectContaining({
        action: 'review_added',
        payload: {
          reviewId: body.review.id,
          recommendation: body.review.recommendation,
        },
      }),
    );

    const detailsResponse = await fetch('/api/proposals/proposal-088', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=reviewer-003`,
      },
    });

    const detailsBody = await detailsResponse.json();

    expect(detailsBody.reviews).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          scoreContent: Number(testReviewBody.scoreContent),
          scoreRelevance: Number(testReviewBody.scoreRelevance),
          scoreDelivery: Number(testReviewBody.scoreDelivery),
          recommendation: testReviewBody.recommendation,
          comment: testReviewBody.comment,
        }),
      ]),
    );
    expect(detailsBody.history).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: 'review_added',
          payload: {
            reviewId: body.review.id,
            recommendation: body.review.recommendation,
          },
        }),
      ]),
    );
  });

  it('Ревьюер не может создать ревью для неназначенной ему заявки', async () => {
    const response = await fetch('/api/proposals/proposal-088/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=reviewer-004`,
      },
      body: JSON.stringify(testReviewBody),
    });

    expect(response.status).toBe(403);
  });

  it('Невалидный payload не проходит', async () => {
    const response = await fetch('/api/proposals/proposal-088/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=reviewer-004`,
      },
      body: JSON.stringify({
        ...testReviewBody,
        recommendation: 'trash-recommendation',
        scoreRelevance: null,
      }),
    });

    expect(response.status).toBe(400);
  });

  it('Менеджер не может создать ревью', async () => {
    const response = await fetch('/api/proposals/proposal-088/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=2`,
      },
      body: JSON.stringify(testReviewBody),
    });

    expect(response.status).toBe(403);
  });

  it('Спикер не может создать ревью', async () => {
    const response = await fetch('/api/proposals/proposal-088/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${AUTH_SESSION_COOKIE}=4`,
      },
      body: JSON.stringify(testReviewBody),
    });

    expect(response.status).toBe(403);
  });
});

import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { describe, expect, it } from 'vitest';

const submittedTestProposalId = 'proposal-040';
const inReviewTestProposalId = 'proposal-041';

describe('POST /api/proposals/:id/assign-reviewer', () => {
  it('Менеджер может назначить ревьюера на заявку в статусе отправлена', async () => {
    const response = await fetch(
      `/api/proposals/${submittedTestProposalId}/assign-reviewer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${AUTH_SESSION_COOKIE}=2`,
        },
        body: JSON.stringify({ reviewerId: '3' }),
      },
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.proposalId).toBe(submittedTestProposalId);
    expect(body.reviewerId).toBe('3');

    const detailsResponse = await fetch(
      `/api/proposals/${submittedTestProposalId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${AUTH_SESSION_COOKIE}=2`,
        },
      },
    );

    const detailsBody = await detailsResponse.json();

    expect(detailsBody.history).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: 'reviewer_assigned',
          payload: {
            reviewerId: '3',
          },
        }),
      ]),
    );

    const assignedReviewerResponse = await fetch(
      `/api/proposals/${submittedTestProposalId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${AUTH_SESSION_COOKIE}=3`,
        },
      },
    );

    expect(assignedReviewerResponse.status).toBe(200);
  });

  it('Менеджер может назначить ревьюера на заявку в статусе в ревью', async () => {
    const response = await fetch(
      `/api/proposals/${inReviewTestProposalId}/assign-reviewer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${AUTH_SESSION_COOKIE}=2`,
        },
        body: JSON.stringify({ reviewerId: '3' }),
      },
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.proposalId).toBe(inReviewTestProposalId);
    expect(body.reviewerId).toBe('3');

    const detailsResponse = await fetch(
      `/api/proposals/${inReviewTestProposalId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${AUTH_SESSION_COOKIE}=2`,
        },
      },
    );

    const detailsBody = await detailsResponse.json();

    expect(detailsBody.history).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: 'reviewer_assigned',
          payload: {
            reviewerId: '3',
          },
        }),
      ]),
    );

    const assignedReviewerResponse = await fetch(
      `/api/proposals/${inReviewTestProposalId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${AUTH_SESSION_COOKIE}=3`,
        },
      },
    );

    expect(assignedReviewerResponse.status).toBe(200);
  });

  it('Менеджер не может назначить ревьюера на заявку в невалидном статусе', async () => {
    const response = await fetch(
      '/api/proposals/proposal-047/assign-reviewer',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${AUTH_SESSION_COOKIE}=2`,
        },
        body: JSON.stringify({ reviewerId: '3' }),
      },
    );

    expect(response.status).toBe(403);
  });

  it('Менеджер не может назначить несуществующего ревьюера на заявку', async () => {
    const response = await fetch(
      '/api/proposals/proposal-047/assign-reviewer',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${AUTH_SESSION_COOKIE}=2`,
        },
        body: JSON.stringify({ reviewerId: '3123412' }),
      },
    );

    expect(response.status).toBe(404);
  });

  it('Менеджер не может назначить ревьюера на несуществующую заявку', async () => {
    const response = await fetch(
      '/api/proposals/trash-proposal-id/assign-reviewer',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${AUTH_SESSION_COOKIE}=2`,
        },
        body: JSON.stringify({ reviewerId: '3' }),
      },
    );

    expect(response.status).toBe(404);
  });

  it('Ревьюер не может назначить ревьюера на заявку', async () => {
    const response = await fetch(
      `/api/proposals/${inReviewTestProposalId}/assign-reviewer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${AUTH_SESSION_COOKIE}=3`,
        },
        body: JSON.stringify({ reviewerId: '3' }),
      },
    );

    expect(response.status).toBe(403);
  });

  it('Спикер не может назначить ревьюера на заявку', async () => {
    const response = await fetch(
      `/api/proposals/${inReviewTestProposalId}/assign-reviewer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${AUTH_SESSION_COOKIE}=4`,
        },
        body: JSON.stringify({ reviewerId: '3' }),
      },
    );

    expect(response.status).toBe(403);
  });
});

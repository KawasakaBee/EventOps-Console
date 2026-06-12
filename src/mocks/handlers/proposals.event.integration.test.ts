import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { describe, expect, it } from 'vitest';
import { proposals } from '../db/proposals';
import {
  mapProposalsToListItems,
  paginateProposals,
} from '../utils/proposalList';
import { ProposalListQuery } from '@/entities/proposal/model/query';
import { getProposalById } from '../utils/proposalSelectors';

const testEmptyProposalList = {
  page: 1,
  pageSize: 20,
  search: null,
  status: [],
  trackId: [],
  eventId: [],
  level: [],
  format: [],
  reviewerId: null,
  sortBy: null,
  sortOrder: 'asc',
  owner: null,
} satisfies ProposalListQuery;

const filteredProposals = mapProposalsToListItems(
  paginateProposals(testEmptyProposalList, proposals).filter(
    (proposal) => proposal.eventId === '1' || proposal.eventId === '3',
  ),
  'manager',
);

describe('GET /api/proposals', () => {
  it('Пользователь получает список всех доступных ему заявок событий, если query eventId не задан явно', async () => {
    const response = await fetch('/api/proposals', {
      method: 'GET',
      headers: {
        Cookie: `${AUTH_SESSION_COOKIE}=manager-003`,
      },
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        items: filteredProposals,
      }),
    );
  });

  it('Пользователь получает список всех доступных ему заявок событий, отфильтрованных по query eventId параметру', async () => {
    const response = await fetch('/api/proposals?eventId=1', {
      method: 'GET',
      headers: {
        Cookie: `${AUTH_SESSION_COOKIE}=manager-003`,
      },
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        items: mapProposalsToListItems(
          paginateProposals(
            { ...testEmptyProposalList, eventId: ['1'] },
            proposals,
          ).filter(
            (proposal) => proposal.eventId === '1' || proposal.eventId === '3',
          ),
          'manager',
        ).filter((item) => item.eventId === '1'),
      }),
    );
  });

  it('Пользователь не имеющий доступа к запрашиваемым query eventId получит пустой список заявок', async () => {
    const response = await fetch('/api/proposals?eventId=2', {
      method: 'GET',
      headers: {
        Cookie: `${AUTH_SESSION_COOKIE}=manager-003`,
      },
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        items: [],
      }),
    );
  });
});

describe('GET /api/proposals/:id', () => {
  it('Пользователь может получить доступ к details заявки своего событий', async () => {
    const response = await fetch('/api/proposals/proposal-041', {
      method: 'GET',
      headers: {
        Cookie: `${AUTH_SESSION_COOKIE}=manager-003`,
      },
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        proposal: getProposalById('proposal-041'),
      }),
    );
  });

  it('Пользователь не может получить доступ к details заявки не своего событий', async () => {
    const response = await fetch('/api/proposals/proposal-101', {
      method: 'GET',
      headers: {
        Cookie: `${AUTH_SESSION_COOKIE}=manager-003`,
      },
    });

    expect(response.status).toBe(403);
  });
});

import { describe, expect, it } from 'vitest';
import { getAvailableProposalActions } from './proposalActions';

describe('getAvailableProposalActions', () => {
  it('Разрешённые для менеджера действия для заявки в статусе отправлена/в ревью', () => {
    expect(
      getAvailableProposalActions(
        'manager',
        {
          status: 'submitted',
          proposalId: 'proposal-009',
          ownerId: 'speaker-009',
        },
        '2',
        3,
      ),
    ).toStrictEqual(['assignReviewer', 'addComment', 'changeStatus']);
    expect(
      getAvailableProposalActions(
        'manager',
        {
          status: 'in_review',
          proposalId: 'proposal-009',
          ownerId: 'speaker-009',
        },
        '2',
        3,
      ),
    ).toStrictEqual([
      'assignReviewer',
      'addComment',
      'changeStatus',
      'accept',
      'reject',
    ]);
    expect(
      getAvailableProposalActions(
        'manager',
        {
          status: 'in_review',
          proposalId: 'proposal-009',
          ownerId: 'speaker-009',
        },
        '2',
        0,
      ),
    ).toStrictEqual(['assignReviewer', 'addComment', 'changeStatus']);
    expect(
      getAvailableProposalActions(
        'manager',
        {
          status: 'accepted',
          proposalId: 'proposal-009',
          ownerId: 'speaker-009',
        },
        '2',
        0,
      ),
    ).toStrictEqual(['schedule']);
  });

  it('Разрешённые для менеджера действия для заявки в статусе запрошенных изменений', () => {
    expect(
      getAvailableProposalActions(
        'manager',
        {
          status: 'changes_requested',
          proposalId: 'proposal-009',
          ownerId: 'speaker-009',
        },
        '2',
        1,
      ),
    ).toStrictEqual(['addComment', 'changeStatus', 'accept', 'reject']);
    expect(
      getAvailableProposalActions(
        'manager',
        {
          status: 'changes_requested',
          proposalId: 'proposal-009',
          ownerId: 'speaker-009',
        },
        '2',
        0,
      ),
    ).toStrictEqual(['addComment', 'changeStatus']);
  });

  it('Запрещенные для менеджера действия для заявки в статусе черновика/в расписании', () => {
    expect(
      getAvailableProposalActions(
        'manager',
        {
          status: 'draft',
          proposalId: 'proposal-009',
          ownerId: 'speaker-009',
        },
        '2',
        1,
      ),
    ).toStrictEqual([]);
    expect(
      getAvailableProposalActions(
        'manager',
        {
          status: 'scheduled',
          proposalId: 'proposal-009',
          ownerId: 'speaker-009',
        },
        '2',
        0,
      ),
    ).toStrictEqual([]);
  });

  it('Разрешённые для назначенного ревьюера действия для заявки в статусе отправлена/в ревью', () => {
    expect(
      getAvailableProposalActions(
        'reviewer',
        {
          status: 'submitted',
          proposalId: 'proposal-010',
          ownerId: 'speaker-003',
        },
        'reviewer-009',
        1,
      ),
    ).toStrictEqual(['addComment', 'addReview']);
    expect(
      getAvailableProposalActions(
        'reviewer',
        {
          status: 'in_review',
          proposalId: 'proposal-010',
          ownerId: 'speaker-003',
        },
        'reviewer-009',
        0,
      ),
    ).toStrictEqual(['addComment', 'addReview']);
  });

  it('Разрешённые для неназначенного ревьюера действия для заявки в статусе в ревью', () => {
    expect(
      getAvailableProposalActions(
        'reviewer',
        {
          status: 'in_review',
          proposalId: 'proposal-010',
          ownerId: 'speaker-003',
        },
        'reviewer-008',
        0,
      ),
    ).toStrictEqual([]);
  });

  it('Запрещённые для ревьюера действия для заявки в статусе в черновик/принята', () => {
    expect(
      getAvailableProposalActions(
        'reviewer',
        {
          status: 'draft',
          proposalId: 'proposal-010',
          ownerId: 'speaker-003',
        },
        'reviewer-009',
        0,
      ),
    ).toStrictEqual([]);
    expect(
      getAvailableProposalActions(
        'reviewer',
        {
          status: 'accepted',
          proposalId: 'proposal-010',
          ownerId: 'speaker-003',
        },
        'reviewer-009',
        0,
      ),
    ).toStrictEqual([]);
  });

  it('Разрешённые для спикера действия для своей заявки в статусе черновик', () => {
    expect(
      getAvailableProposalActions(
        'speaker',
        {
          status: 'draft',
          proposalId: 'proposal-010',
          ownerId: 'speaker-003',
        },
        'speaker-user-003',
        1,
      ),
    ).toStrictEqual(['edit', 'submit']);
  });

  it('Запрещенные для спикера действия для своей заявки в статусе отправлена', () => {
    expect(
      getAvailableProposalActions(
        'speaker',
        {
          status: 'submitted',
          proposalId: 'proposal-010',
          ownerId: 'speaker-003',
        },
        'speaker-user-003',
        0,
      ),
    ).toStrictEqual([]);
  });

  it('Запрещенные для спикера действия для не своей заявки в статусе черновик', () => {
    expect(
      getAvailableProposalActions(
        'speaker',
        {
          status: 'draft',
          proposalId: 'proposal-010',
          ownerId: 'speaker-002',
        },
        'speaker-user-003',
        1,
      ),
    ).toStrictEqual([]);
  });
});

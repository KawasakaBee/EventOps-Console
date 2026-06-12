import { describe, expect, it } from 'vitest';
import {
  canChangeProposal,
  canCreateProposal,
  canCreateReview,
  canReadProposal,
  canUserCreateComment,
  getProposalsListAccess,
} from './proposalAccess';

describe('getProposalsListAccess', () => {
  it('Доступы для администратора', () => {
    expect(getProposalsListAccess('admin', null)).toBe('all');
  });

  it('Доступы для менеджера', () => {
    expect(getProposalsListAccess('manager', null)).toBe('all');
  });

  it('Доступы для ревьюера', () => {
    expect(getProposalsListAccess('reviewer', null)).toBe('assignedToReviewer');
  });

  it('Доступы для спикера с параметром me', () => {
    expect(getProposalsListAccess('speaker', 'me')).toBe('ownedBySpeaker');
  });

  it('Доступы для спикера без параметра me', () => {
    expect(getProposalsListAccess('speaker', 'speakerAccess')).toBe(
      'forbidden',
    );
    expect(getProposalsListAccess('speaker', null)).toBe('forbidden');
  });
});

describe('canReadProposal', () => {
  it('Администратор может читать любую заявку', () => {
    expect(
      canReadProposal('admin', '1', {
        proposalId: 'proposal-013',
        ownerId: 'speaker-008',
      }),
    ).toBe(true);
  });

  it('Менеджер может читать любую заявку', () => {
    expect(
      canReadProposal('manager', '2', {
        proposalId: 'proposal-013',
        ownerId: 'speaker-008',
      }),
    ).toBe(true);
  });

  it('Ревьюер может читать назначенную ему заявку', () => {
    expect(
      canReadProposal('reviewer', '3', {
        proposalId: 'proposal-020',
        ownerId: 'speaker-003',
      }),
    ).toBe(true);
  });

  it('Ревьюер не может читать неназначенную ему заявку', () => {
    expect(
      canReadProposal('reviewer', '3', {
        proposalId: 'proposal-002',
        ownerId: '4',
      }),
    ).toBe(false);
  });

  it('Спикер может читать только свою заявку', () => {
    expect(
      canReadProposal('speaker', 'speaker-user-007', {
        proposalId: 'proposal-015',
        ownerId: 'speaker-007',
      }),
    ).toBe(true);
  });

  it('Спикер не может читать чужую заявку', () => {
    expect(
      canReadProposal('speaker', 'speaker-user-007', {
        proposalId: 'proposal-018',
        ownerId: 'speaker-003',
      }),
    ).toBe(false);
  });
});

describe('canCreateProposal', () => {
  it('Менеджер не может создавать заявку', () => {
    expect(canCreateProposal('manager')).toBe(false);
  });

  it('Ревьюер не может создавать заявку', () => {
    expect(canCreateProposal('reviewer')).toBe(false);
  });

  it('Спикер может создавать заявку', () => {
    expect(canCreateProposal('speaker')).toBe(true);
  });
});

describe('canChangeProposal', () => {
  it('Менеджер может редактировать заявку', () => {
    expect(
      canChangeProposal('manager', 'proposal-019', 'speaker-user-013'),
    ).toBe(true);
  });

  it('Ревьюер не может редактировать заявку', () => {
    expect(
      canChangeProposal('reviewer', 'proposal-019', 'speaker-user-013'),
    ).toBe(false);
  });

  it('Спикер может редактировать только свою заявку', () => {
    expect(
      canChangeProposal('speaker', 'proposal-031', 'speaker-user-025'),
    ).toBe(true);
  });

  it('Спикер не может редактировать только чужую заявку', () => {
    expect(
      canChangeProposal('speaker', 'proposal-049', 'speaker-user-025'),
    ).toBe(false);
  });
});

describe('canCreateReview', () => {
  it('Менеджер не может создавать ревью', () => {
    expect(canCreateReview('manager', 'proposal-038', '2')).toBe(false);
  });

  it('Ревьюер может создавать ревью для назначенной ему заявки', () => {
    expect(canCreateReview('reviewer', 'proposal-038', 'reviewer-003')).toBe(
      true,
    );
  });

  it('Ревьюер не может создавать ревью для неназначенной ему заявки', () => {
    expect(canCreateReview('reviewer', 'proposal-079', 'reviewer-003')).toBe(
      false,
    );
  });

  it('Спикер не может создавать ревью', () => {
    expect(canCreateReview('speaker', 'proposal-038', '4')).toBe(false);
  });
});

describe('canUserCreateComment', () => {
  it('Менеджер может создавать комментарий', () => {
    expect(canUserCreateComment('manager', 'proposal-038', '2')).toBe(true);
  });

  it('Ревьюер может создавать комментарий для назначенной ему заявки', () => {
    expect(
      canUserCreateComment('reviewer', 'proposal-038', 'reviewer-003'),
    ).toBe(true);
  });

  it('Ревьюер не может создавать комментарий для неназначенной ему заявки', () => {
    expect(
      canUserCreateComment('reviewer', 'proposal-079', 'reviewer-003'),
    ).toBe(false);
  });

  it('Спикер не может создавать комментарий', () => {
    expect(canUserCreateComment('speaker', 'proposal-038', '4')).toBe(false);
  });
});

import { describe, expect, it } from 'vitest';
import getAvailableProposalStatuses from './proposalStatusTransitions';

describe('getAvailableProposalStatuses', () => {
  it('Заявка в статусе черновика может быть отправлена', () => {
    expect(getAvailableProposalStatuses('draft', 0)).toStrictEqual([
      'submitted',
    ]);
  });

  it('Заявка в статусе отправлена может быть переведена в ревью', () => {
    expect(getAvailableProposalStatuses('submitted', 0)).toStrictEqual([
      'in_review',
    ]);
  });

  it('Заявка в статусе в ревью может быть принята/отклонена при наличии ревью', () => {
    expect(getAvailableProposalStatuses('in_review', 2)).toStrictEqual([
      'changes_requested',
      'accepted',
      'rejected',
    ]);
  });

  it('Заявка в статусе в ревью не может быть принята/отклонена без ревью', () => {
    expect(getAvailableProposalStatuses('in_review', 0)).toStrictEqual([
      'changes_requested',
    ]);
  });

  it('Заявка в статусе изменений может быть переведана только в статус ревью', () => {
    expect(getAvailableProposalStatuses('changes_requested', 5)).toStrictEqual([
      'in_review',
    ]);
  });

  it('Заявка в статусе изменений может быть переведана в статус ревью без наличия ревью', () => {
    expect(getAvailableProposalStatuses('changes_requested', 0)).toStrictEqual([
      'in_review',
    ]);
  });

  it('Заявка в статусе черновика не может быть принята/отклонена', () => {
    expect(getAvailableProposalStatuses('draft', 5)).toStrictEqual([
      'submitted',
    ]);
  });

  it('Заявка в статах принята/отклонена/в расписании не может быть переведена в другие статусы', () => {
    expect(getAvailableProposalStatuses('accepted', 2)).toStrictEqual([]);
    expect(getAvailableProposalStatuses('rejected', 2)).toStrictEqual([]);
    expect(getAvailableProposalStatuses('scheduled', 2)).toStrictEqual([]);
  });
});

import { describe, expect, it } from 'vitest';
import getAvailableProposalStatuses from './proposalStatusTransitions';

describe('getAvailableProposalStatuses', () => {
  it('Заявка в статусе черновика может быть отправлена администратором', () => {
    expect(getAvailableProposalStatuses('draft', 0, 'admin')).toStrictEqual([
      'submitted',
    ]);
  });

  it('Заявка в статусе черновика может быть отправлена менеджером', () => {
    expect(getAvailableProposalStatuses('draft', 0, 'manager')).toStrictEqual([
      'submitted',
    ]);
  });

  it('Заявка не может быть отправлена ревьюером', () => {
    expect(getAvailableProposalStatuses('draft', 0, 'reviewer')).toStrictEqual(
      [],
    );
  });

  it('Заявка не может быть отправлена спикером', () => {
    expect(getAvailableProposalStatuses('draft', 0, 'speaker')).toStrictEqual(
      [],
    );
  });

  it('Заявка в статусе отправлена может быть переведена в ревью', () => {
    expect(
      getAvailableProposalStatuses('submitted', 0, 'manager'),
    ).toStrictEqual(['in_review']);
  });

  it('Заявка в статусе в ревью может быть принята/отклонена при наличии ревью', () => {
    expect(
      getAvailableProposalStatuses('in_review', 2, 'manager'),
    ).toStrictEqual(['changes_requested', 'accepted', 'rejected']);
  });

  it('Заявка в статусе в ревью не может быть принята/отклонена без ревью', () => {
    expect(
      getAvailableProposalStatuses('in_review', 0, 'manager'),
    ).toStrictEqual(['changes_requested']);
  });

  it('Заявка в статусе изменений может быть переведена только в статус ревью', () => {
    expect(
      getAvailableProposalStatuses('changes_requested', 5, 'manager'),
    ).toStrictEqual(['in_review']);
  });

  it('Заявка в статусе изменений может быть переведена в статус ревью без наличия ревью', () => {
    expect(
      getAvailableProposalStatuses('changes_requested', 0, 'manager'),
    ).toStrictEqual(['in_review']);
  });

  it('Заявка в статусе черновика не может быть принята/отклонена', () => {
    expect(getAvailableProposalStatuses('draft', 5, 'manager')).toStrictEqual([
      'submitted',
    ]);
  });

  it('Заявка в статусе принята может быть переведена в статус в расписание на техническом уровне', () => {
    expect(
      getAvailableProposalStatuses('accepted', 2, 'manager', true),
    ).toStrictEqual(['scheduled']);
  });

  it('Заявка в статусах отклонена/в расписании не может быть переведена в другие статусы', () => {
    expect(
      getAvailableProposalStatuses('rejected', 2, 'manager'),
    ).toStrictEqual([]);
    expect(
      getAvailableProposalStatuses('scheduled', 2, 'manager'),
    ).toStrictEqual([]);
  });
});

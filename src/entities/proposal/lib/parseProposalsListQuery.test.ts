import { describe, expect, it } from 'vitest';
import { parseProposalsListQuery } from './parseProposalsListQuery';

const testUrl =
  'http://localhost:3000/proposals?search=Docker&status=accepted&trackId=4&eventId=1&level=middle&format=lightning&reviewerId=reviewer-007&page=1';

const testProposalList = {
  page: 1,
  pageSize: 20,
  search: 'Docker',
  status: ['accepted'],
  trackId: ['4'],
  eventId: ['1'],
  level: ['middle'],
  format: ['lightning'],
  reviewerId: 'reviewer-007',
  sortBy: null,
  sortOrder: 'asc',
  owner: null,
};

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
};

describe('parseProposalsListQuery', () => {
  it('Строка - валидный url с параметрами', () => {
    expect(parseProposalsListQuery(testUrl)).toStrictEqual(testProposalList);
  });

  it('Строка - валидный url без параметров', () => {
    expect(
      parseProposalsListQuery('http://localhost:3000/proposals'),
    ).toStrictEqual(testEmptyProposalList);
  });

  it('Строка без query params возвращает дефолтный query', () => {
    expect(
      parseProposalsListQuery('ghttps?;://llochost/submit[id]'),
    ).toStrictEqual(testEmptyProposalList);
  });

  it('Невалидная страница', () => {
    const minusPage = parseProposalsListQuery(
      'http://localhost:3000/proposals?page=-1',
    );
    const stringPage = parseProposalsListQuery(
      'http://localhost:3000/proposals?page=avs',
    );

    expect(minusPage.page).toBe(1);
    expect(stringPage.page).toBe(1);
  });

  it('Валидный размер страницы проходит', () => {
    const pageSizeTen = parseProposalsListQuery(
      'http://localhost:3000/proposals?pageSize=10',
    );
    const pageSizeTwenty = parseProposalsListQuery(
      'http://localhost:3000/proposals?pageSize=20',
    );
    const pageSizeFifty = parseProposalsListQuery(
      'http://localhost:3000/proposals?pageSize=50',
    );

    expect(pageSizeTen.pageSize).toBe(10);
    expect(pageSizeTwenty.pageSize).toBe(20);
    expect(pageSizeFifty.pageSize).toBe(50);
  });

  it('Невалидный размер страницы приводится к валидному', () => {
    const pageSizeInvalid = parseProposalsListQuery(
      'http://localhost:3000/proposals?pageSize=999',
    );

    expect(pageSizeInvalid.pageSize).toStrictEqual(20);
  });

  it('Несколько статусов проходят', () => {
    const params = parseProposalsListQuery(
      'http://localhost:3000/proposals?status=draft&status=submitted',
    );

    expect(params.status).toStrictEqual(['draft', 'submitted']);
  });

  it('Невалидный статус', () => {
    const trashStatus = parseProposalsListQuery(
      'http://localhost:3000/proposals?status=trash',
    );

    expect(trashStatus.status).toStrictEqual([]);
  });

  it('Невалидный уровень', () => {
    const trashLevel = parseProposalsListQuery(
      'http://localhost:3000/proposals?level=trash',
    );

    expect(trashLevel.level).toStrictEqual([]);
  });

  it('Невалидный формат', () => {
    const trashFromat = parseProposalsListQuery(
      'http://localhost:3000/proposals?format=unknown',
    );

    expect(trashFromat.format).toStrictEqual([]);
  });

  it('Несколько id треков проходят', () => {
    const params = parseProposalsListQuery(
      'http://localhost:3000/proposals?trackId=2&trackId=4',
    );

    expect(params.trackId).toStrictEqual(['2', '4']);
  });

  it('Невалидный вариант сортировки', () => {
    const trashSortBy = parseProposalsListQuery(
      'http://localhost:3000/proposals?sortBy=trash',
    );

    expect(trashSortBy.sortBy).toBe(null);
  });

  it('Desc порядок сортировки проходит', () => {
    const deskSortOrder = parseProposalsListQuery(
      'http://localhost:3000/proposals?sortOrder=desc',
    );

    expect(deskSortOrder.sortOrder).toBe('desc');
  });

  it('Невалидный порядок сортировки', () => {
    const trashSortOrder = parseProposalsListQuery(
      'http://localhost:3000/proposals?sortOrder=123string',
    );

    expect(trashSortOrder.sortOrder).toBe('asc');
  });

  it('Owner = me парсится', () => {
    const params = parseProposalsListQuery(
      'http://localhost:3000/proposals?owner=me',
    );

    expect(params.owner).toBe('me');
  });
});

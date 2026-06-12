import { describe, expect, it } from 'vitest';
import { parseAuditListQuery } from './parseAuditListQuery';

const testUrl =
  'http://localhost:3000/audit?search=proposal-034&action=review_added&actorId=reviewer-007&entity=proposal&sortOrder=desc&pageSize=50';

const testAuditList = {
  page: 1,
  pageSize: 50,
  search: 'proposal-034',
  action: ['review_added'],
  actorId: 'reviewer-007',
  entity: ['proposal'],
  sortBy: null,
  sortOrder: 'desc',
};

const testEmptyAuditList = {
  page: 1,
  pageSize: 20,
  search: null,
  action: [],
  actorId: null,
  entity: [],
  sortBy: null,
  sortOrder: 'asc',
};

describe('parseAuditListQuery', () => {
  it('Строка - валидный url с параметрами', () => {
    expect(parseAuditListQuery(testUrl)).toStrictEqual(testAuditList);
  });

  it('Строка - валидный url без параметров', () => {
    expect(parseAuditListQuery('http://localhost:3000/audit')).toStrictEqual(
      testEmptyAuditList,
    );
  });

  it('Строка без query params возвращает дефолтный query', () => {
    expect(parseAuditListQuery('ghttps?;://llochost/submit[id]')).toStrictEqual(
      testEmptyAuditList,
    );
  });

  it('Невалидная страница', () => {
    const minusPage = parseAuditListQuery(
      'http://localhost:3000/audit?page=-1',
    );
    const stringPage = parseAuditListQuery(
      'http://localhost:3000/audit?page=avs',
    );

    expect(minusPage.page).toBe(1);
    expect(stringPage.page).toBe(1);
  });

  it('Валидный размер страницы проходит', () => {
    const pageSizeTen = parseAuditListQuery(
      'http://localhost:3000/audit?pageSize=10',
    );
    const pageSizeTwenty = parseAuditListQuery(
      'http://localhost:3000/audit?pageSize=20',
    );
    const pageSizeFifty = parseAuditListQuery(
      'http://localhost:3000/audit?pageSize=50',
    );

    expect(pageSizeTen.pageSize).toBe(10);
    expect(pageSizeTwenty.pageSize).toBe(20);
    expect(pageSizeFifty.pageSize).toBe(50);
  });

  it('Невалидный размер страницы приводится к валидному', () => {
    const pageSizeInvalid = parseAuditListQuery(
      'http://localhost:3000/audit?pageSize=999',
    );

    expect(pageSizeInvalid.pageSize).toStrictEqual(20);
  });

  it('Несколько действий проходят', () => {
    const params = parseAuditListQuery(
      'http://localhost:3000/audit?action=created&action=review_added',
    );

    expect(params.action).toStrictEqual(['created', 'review_added']);
  });

  it('Невалидное действие не проходит', () => {
    const trashAction = parseAuditListQuery(
      'http://localhost:3000/audit?action=trash-action',
    );

    expect(trashAction.action).toStrictEqual([]);
  });

  it('Несколько сущностей проходят', () => {
    const params = parseAuditListQuery(
      'http://localhost:3000/audit?entity=settings&entity=proposal',
    );

    expect(params.entity).toStrictEqual(['settings', 'proposal']);
  });

  it('Невалидная сущность не проходит', () => {
    const trashEntity = parseAuditListQuery(
      'http://localhost:3000/audit?entity=trash-entity',
    );

    expect(trashEntity.entity).toStrictEqual([]);
  });

  it('Невалидный вариант сортировки', () => {
    const trashSortBy = parseAuditListQuery(
      'http://localhost:3000/audit?sortBy=trash',
    );

    expect(trashSortBy.sortBy).toBe(null);
  });

  it('Desc порядок сортировки проходит', () => {
    const descSortOrder = parseAuditListQuery(
      'http://localhost:3000/audit?sortOrder=desc',
    );

    expect(descSortOrder.sortOrder).toBe('desc');
  });

  it('Невалидный порядок сортировки', () => {
    const trashSortOrder = parseAuditListQuery(
      'http://localhost:3000/audit?sortOrder=123string',
    );

    expect(trashSortOrder.sortOrder).toBe('asc');
  });
});

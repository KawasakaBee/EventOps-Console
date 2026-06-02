import { describe, expect, it } from 'vitest';
import { parseScheduleQuery } from './parseScheduleQuery';
import { schedule } from '@/mocks/db/schedule';

const testUrl = 'http://localhost:3000/api/schedule?date=2026-04-22';

const defaultResult = {
  date: '2026-04-21',
};

const testValidResult = {
  date: '2026-04-22',
};

describe('parseScheduleQuery', () => {
  it('Валидный url с queryParams возвращает нужный день расписания', () => {
    expect(parseScheduleQuery(testUrl, schedule)).toStrictEqual(
      testValidResult,
    );
  });

  it('Невалидный url возвращает 1 день расписания', () => {
    expect(
      parseScheduleQuery(
        'sht;p?//conference/localhost?date=2026-04-22',
        schedule,
      ),
    ).toStrictEqual(defaultResult);
  });

  it('Невалидный queryParams возвращает 1 день расписания', () => {
    expect(
      parseScheduleQuery(
        'http://localhost:3000/api/schedule?date=trash',
        schedule,
      ),
    ).toStrictEqual(defaultResult);
  });
});

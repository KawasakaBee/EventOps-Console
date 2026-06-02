import { describe, expect, it } from 'vitest';
import { schedule } from '@/mocks/db/schedule';
import getDayByQueryDate from './getDayByQueryDate';

const defaultResult = '2026-04-21';

const testValidResult = '2026-04-22';

describe('getDayByQueryDate', () => {
  it('Валидная дата возвращает запрашиваемый день расписания', () => {
    expect(getDayByQueryDate('2026-04-22', schedule)).toBe(testValidResult);
  });

  it('Невалидная дата врзвращает 1 день расписания', () => {
    expect(getDayByQueryDate('04.2056-15', schedule)).toBe(defaultResult);
  });

  it('Отсутствующая дата возвращает 1 день расписания', () => {
    expect(getDayByQueryDate(null, schedule)).toBe(defaultResult);
  });
});

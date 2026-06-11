import { describe, expect, it } from 'vitest';
import { normalizeRoute } from './utils';

describe('normalizeRoute', () => {
  it('Парсинг роута вида /**/[id]', () => {
    expect(normalizeRoute('/proposals/tested-proposal-id')).toBe(
      '/proposals/[id]',
    );
    expect(normalizeRoute('/submit/myTest-submit proposal')).toBe(
      '/submit/[id]',
    );
  });

  it('Парсинг обычных роутов без изменений', () => {
    expect(normalizeRoute('/login')).toBe('/login');
    expect(normalizeRoute('/dashboard')).toBe('/dashboard');
    expect(normalizeRoute('/proposals')).toBe('/proposals');
    expect(normalizeRoute('/my-proposals')).toBe('/my-proposals');
    expect(normalizeRoute('/schedule')).toBe('/schedule');
    expect(normalizeRoute('/analytics')).toBe('/analytics');
    expect(normalizeRoute('/settings')).toBe('/settings');
    expect(normalizeRoute('/audit')).toBe('/audit');
  });

  it('Парсинг невалидных роутов', () => {
    expect(normalizeRoute('invalidRoute')).toBe(null);
    expect(normalizeRoute('/session/1/buy-order')).toBe(null);
    expect(normalizeRoute('http://localhost/lection/superactu-1-al')).toBe(
      null,
    );
  });

  it('Парсинг роутов с queryParams', () => {
    expect(normalizeRoute('/proposals?status=submitted')).toBe('/proposals');
    expect(normalizeRoute('/proposals/142-submittion?tab=review')).toBe(
      '/proposals/[id]',
    );
  });
});

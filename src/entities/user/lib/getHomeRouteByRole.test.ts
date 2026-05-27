import { describe, expect, it } from 'vitest';
import { getHomeRouteByRole } from './userSelectors';

describe('getHomeRouteByRole', () => {
  it('Роут на домашний адрес администратора', () => {
    expect(getHomeRouteByRole('admin')).toBe('/dashboard');
  });

  it('Роут на домашний адрес менеджера', () => {
    expect(getHomeRouteByRole('manager')).toBe('/dashboard');
  });

  it('Роут на домашний адрес ревьюера', () => {
    expect(getHomeRouteByRole('reviewer')).toBe('/proposals');
  });

  it('Роут на домашний адрес спикера', () => {
    expect(getHomeRouteByRole('speaker')).toBe('/my-proposals');
  });
});

import { describe, expect, it } from 'vitest';
import canAccessRoute from './canAccessRoute';

describe('canAccessRoute', () => {
  it('Разрешён ли доступ администратору к любым страницам', () => {
    expect(canAccessRoute('admin', '/proposals')).toBe(true);
    expect(canAccessRoute('admin', '/proposals/[id]')).toBe(true);
    expect(canAccessRoute('admin', '/dashboard')).toBe(true);
    expect(canAccessRoute('admin', '/analytics')).toBe(true);
    expect(canAccessRoute('admin', '/audit')).toBe(true);
    expect(canAccessRoute('admin', '/settings')).toBe(true);
    expect(canAccessRoute('admin', '/schedule')).toBe(true);
    expect(canAccessRoute('admin', '/speakers')).toBe(true);
  });

  it('Разрешён ли доступ менеджеру к станицам заявок', () => {
    expect(canAccessRoute('manager', '/proposals')).toBe(true);
    expect(canAccessRoute('manager', '/proposals/[id]')).toBe(true);
  });

  it('Разрешён ли доступ менеджеру к техническим страницам', () => {
    expect(canAccessRoute('manager', '/dashboard')).toBe(true);
    expect(canAccessRoute('manager', '/analytics')).toBe(true);
    expect(canAccessRoute('manager', '/audit')).toBe(true);
    expect(canAccessRoute('manager', '/settings')).toBe(true);
    expect(canAccessRoute('manager', '/schedule')).toBe(true);
    expect(canAccessRoute('manager', '/speakers')).toBe(true);
  });

  it('Разрешён ли доступ ревьюеру к списку заявок, но не к списку заявок спикера', () => {
    expect(canAccessRoute('reviewer', '/proposals')).toBe(true);
    expect(canAccessRoute('reviewer', '/proposals/[id]')).toBe(true);
    expect(canAccessRoute('reviewer', '/my-proposals')).toBe(false);
  });

  it('Запрещён ли доступ ревьюеру к техническим страницам', () => {
    expect(canAccessRoute('reviewer', '/dashboard')).toBe(false);
    expect(canAccessRoute('reviewer', '/analytics')).toBe(false);
    expect(canAccessRoute('reviewer', '/audit')).toBe(false);
    expect(canAccessRoute('reviewer', '/settings')).toBe(false);
  });

  it('Разрешён ли доступ спикеру к своему списку заявок и редактированию заявки', () => {
    expect(canAccessRoute('speaker', '/my-proposals')).toBe(true);
    expect(canAccessRoute('speaker', '/proposals/[id]')).toBe(true);
    expect(canAccessRoute('speaker', '/submit')).toBe(true);
  });

  it('Запрещён ли доступ спикеру к списку всех заявок', () => {
    expect(canAccessRoute('speaker', '/proposals')).toBe(false);
  });

  it('Запрещён ли доступ спикеру к техническим страницам', () => {
    expect(canAccessRoute('speaker', '/dashboard')).toBe(false);
    expect(canAccessRoute('speaker', '/analytics')).toBe(false);
    expect(canAccessRoute('speaker', '/audit')).toBe(false);
    expect(canAccessRoute('speaker', '/settings')).toBe(false);
  });

  it('Рарзешён ли всем ролям доступ к странице авторизации', () => {
    expect(canAccessRoute('admin', '/login')).toBe(true);
    expect(canAccessRoute('manager', '/login')).toBe(true);
    expect(canAccessRoute('reviewer', '/login')).toBe(true);
    expect(canAccessRoute('speaker', '/login')).toBe(true);
  });
});

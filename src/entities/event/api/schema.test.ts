import { describe, expect, it } from 'vitest';
import { settingsSchema } from './schema';

const validSettingsCourse = {
  title: 'Product Analytics & UX Conference',
  description:
    'Конференция о продуктовой разработке, UX research, аналитике, принятии решений и связке инженерных метрик с пользовательской ценностью.',
  place: 'Amsterdam, Netherlands',
  startTime: '2026-06-25T10:14',
};

describe('settingsSchema', () => {
  it('Валидная схема проходит', () => {
    const result = settingsSchema.safeParse(validSettingsCourse);

    expect(result.success).toBe(true);
  });

  it('Название больше 10 символов проходит', () => {
    const result = settingsSchema.safeParse({
      ...validSettingsCourse,
      title: 'a'.repeat(11),
    });

    expect(result.success).toBe(true);
  });

  it('Название меньше 10 символов не проходит', () => {
    const result = settingsSchema.safeParse({
      ...validSettingsCourse,
      title: 'a'.repeat(5),
    });

    expect(result.success).toBe(false);
  });

  it('Описание больше 30 символов проходит', () => {
    const result = settingsSchema.safeParse({
      ...validSettingsCourse,
      description: 'a'.repeat(31),
    });

    expect(result.success).toBe(true);
  });

  it('Описание меньше 30 символов не проходит', () => {
    const result = settingsSchema.safeParse({
      ...validSettingsCourse,
      description: 'a'.repeat(22),
    });

    expect(result.success).toBe(false);
  });

  it('Описание меньше 30 символов не проходит', () => {
    const result = settingsSchema.safeParse({
      ...validSettingsCourse,
      description: 'a'.repeat(22),
    });

    expect(result.success).toBe(false);
  });

  it('Некорректное время не проходит', () => {
    const result = settingsSchema.safeParse({
      ...validSettingsCourse,
      startTime: '20236-06{-25T10:14-trash',
    });

    expect(result.success).toBe(false);
  });

  it('Прошедшее время не проходит', () => {
    const result = settingsSchema.safeParse({
      ...validSettingsCourse,
      startTime: '2023-06-25T10:14',
    });

    expect(result.success).toBe(false);
  });
});

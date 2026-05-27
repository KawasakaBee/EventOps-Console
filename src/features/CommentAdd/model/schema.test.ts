import { describe, expect, it } from 'vitest';
import { addCommentBaseSchema } from './schema';

const validCourse = {
  message: 'Тестовый комментарий',
};

describe('addCommentBaseSchema', () => {
  it('Валидная схема проходит', () => {
    const result = addCommentBaseSchema.safeParse(validCourse);

    expect(result.success).toBe(true);
  });

  it('Не пропускает комментарий меньше 10 символов', () => {
    const result = addCommentBaseSchema.safeParse({
      ...validCourse,
      message: 'Ок',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.message).toBeDefined();
    }
  });
});

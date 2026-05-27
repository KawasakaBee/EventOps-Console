import { describe, expect, it } from 'vitest';
import { createReviewBaseSchema } from './schema';

const validCourse = {
  scoreContent: '4',
  scoreRelevance: '7',
  scoreDelivery: '3',
  recommendation: 'approve',
  comment: 'Тестовый комментарий',
};

describe('createReviewBaseSchema', () => {
  it('Валидная схема проходит', () => {
    const result = createReviewBaseSchema.safeParse(validCourse);

    expect(result.success).toBe(true);
  });

  it('Не пропускает score как цифру', () => {
    const result = createReviewBaseSchema.safeParse({
      ...validCourse,
      scoreRelevance: 22,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.scoreRelevance).toBeDefined();
    }
  });

  it('Не пропускает score вне допустимого диапазона', () => {
    const result = createReviewBaseSchema.safeParse({
      ...validCourse,
      scoreDelivery: 14,
      scoreContent: -5,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.scoreDelivery).toBeDefined();
      expect(result.error.flatten().fieldErrors.scoreContent).toBeDefined();
    }
  });

  it('Не пропускает score 0', () => {
    const result = createReviewBaseSchema.safeParse({
      ...validCourse,
      scoreRelevance: 0,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.scoreRelevance).toBeDefined();
    }
  });

  it('Не пропускает score - не числовую строку', () => {
    const result = createReviewBaseSchema.safeParse({
      ...validCourse,
      scoreRelevance: 'abc',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.scoreRelevance).toBeDefined();
    }
  });

  it('Пропускает валидную рекомендацию', () => {
    const approveResult = createReviewBaseSchema.safeParse({
      ...validCourse,
      recommendation: 'approve',
    });
    const rejectResult = createReviewBaseSchema.safeParse({
      ...validCourse,
      recommendation: 'reject',
    });
    const changesResult = createReviewBaseSchema.safeParse({
      ...validCourse,
      recommendation: 'request_changes',
    });

    expect(approveResult.success).toBe(true);
    expect(rejectResult.success).toBe(true);
    expect(changesResult.success).toBe(true);
  });

  it('Не пропускает рекомендацию вне допустимого списка', () => {
    const result = createReviewBaseSchema.safeParse({
      ...validCourse,
      recommendation: 'accept',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.recommendation).toBeDefined();
    }
  });

  it('Не пропускает комментарий меньше 10 символов', () => {
    const result = createReviewBaseSchema.safeParse({
      ...validCourse,
      comment: 'Ок',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.comment).toBeDefined();
    }
  });
});

import { describe, expect, it } from 'vitest';
import calculateAverageReviewScore from './calculateAverageReviewScore';
import { Review } from '../model/types';

const testReviews = [
  {
    id: 'review-034',
    proposalId: 'proposal-047',
    reviewerId: 'reviewer-004',
    scoreContent: 6,
    scoreRelevance: 7,
    scoreDelivery: 7,
    comment:
      'Рекомендую запросить изменения: тема подходит, но описание пока не даёт достаточно уверенности в качестве выступления.',
    recommendation: 'request_changes',
  },
  {
    id: 'review-035',
    proposalId: 'proposal-048',
    reviewerId: 'reviewer-007',
    scoreContent: 7,
    scoreRelevance: 5,
    scoreDelivery: 6,
    comment:
      'Есть хороший потенциал, но требуется доработать abstract и сузить фокус, чтобы заявка не выглядела слишком широкой.',
    recommendation: 'request_changes',
  },
  {
    id: 'review-036',
    proposalId: 'proposal-051',
    reviewerId: 'reviewer-002',
    scoreContent: 9,
    scoreRelevance: 10,
    scoreDelivery: 8,
    comment:
      'Сильная заявка: понятный problem statement, есть практические выводы и хорошая связь с темой трека.',
    recommendation: 'approve',
  },
] satisfies Review[];

describe('calculateAverageReviewScore', () => {
  it('Нет ревью', () => {
    expect(calculateAverageReviewScore([])).toBe(null);
  });

  it('Один ревью даёт среднюю оценку', () => {
    expect(calculateAverageReviewScore([testReviews[0]])).toBe(6.7);
  });

  it('Общая оценка всех ревью', () => {
    expect(calculateAverageReviewScore(testReviews)).toBe(7.2);
  });
});

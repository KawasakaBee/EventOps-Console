import { describe, expect, it } from 'vitest';
import { Review } from '../model/types';
import getFinalReviewRecommendation from './getFinalReviewRecommendation';

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
    recommendation: 'reject',
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

describe('getFinalReviewRecommendation', () => {
  it('Если есть reject - отклонить', () => {
    expect(getFinalReviewRecommendation(testReviews)).toBe('Отклонить');
  });

  it('Если есть request_changes без reject - нужны изменения', () => {
    expect(getFinalReviewRecommendation(testReviews.slice(1, 2))).toBe(
      'Нужны изменения',
    );
  });

  it('Если есть только approve - принять', () => {
    expect(
      getFinalReviewRecommendation([
        { ...testReviews[1], recommendation: 'approve' },
        testReviews[2],
      ]),
    ).toBe('Принять');
  });
});

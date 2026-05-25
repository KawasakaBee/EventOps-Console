import { Recommendation, RecommendationName, Score } from './types';

export const recommendationDictionary: Record<
  Recommendation,
  RecommendationName
> = {
  approve: 'Принять',
  reject: 'Отклонить',
  request_changes: 'Нужны изменения',
};

export const scoresDictionary: Record<Score, string> = {
  scoreContent: 'Контент',
  scoreRelevance: 'Релевантность',
  scoreDelivery: 'Подача',
};

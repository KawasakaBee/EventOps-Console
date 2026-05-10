import { Recommendation, RecommendationName } from './types';

export const recommendationDictionary: Record<
  Recommendation,
  RecommendationName
> = {
  approve: 'Принять',
  reject: 'Отклонить',
  request_changes: 'Нужны изменения',
};

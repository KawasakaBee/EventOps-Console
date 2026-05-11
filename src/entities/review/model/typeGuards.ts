import { Recommendation, recommendations } from './types';

export const isRecommendation = (value: unknown): value is Recommendation =>
  typeof value === 'string' && recommendations.some((item) => item === value);

import { RecommendationName, Review } from '@/entities/review/model/types';
import { recommendationDicrionary } from '../data';

const getFinalReviewRecommendation = (
  reviews: Review[],
): RecommendationName => {
  const recommendations = reviews.map((review) => review.recommendation);

  if (recommendations.includes('reject'))
    return recommendationDicrionary['reject'];
  if (recommendations.includes('request_changes'))
    return recommendationDicrionary['request_changes'];
  return recommendationDicrionary['approve'];
};

export default getFinalReviewRecommendation;

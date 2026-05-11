import { recommendationDictionary } from '@/entities/review/model/dictionaries';
import { RecommendationName, Review } from '@/entities/review/model/types';

const getFinalReviewRecommendation = (
  reviews: Review[],
): RecommendationName => {
  const recommendations = reviews.map((review) => review.recommendation);

  if (recommendations.includes('reject'))
    return recommendationDictionary['reject'];
  if (recommendations.includes('request_changes'))
    return recommendationDictionary['request_changes'];
  return recommendationDictionary['approve'];
};

export default getFinalReviewRecommendation;

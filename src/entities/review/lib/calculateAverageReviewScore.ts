import { Review } from '@/entities/review/model/types';

const calculateAverageReviewScore = (reviews: Review[]): number | null => {
  if (reviews.length === 0) return null;
  return Number(
    (
      reviews.reduce(
        (acc, review) =>
          acc +
          (review.scoreContent + review.scoreDelivery + review.scoreRelevance) /
            3,
        0,
      ) / reviews.length
    ).toFixed(1),
  );
};

export default calculateAverageReviewScore;

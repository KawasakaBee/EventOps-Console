import { Review } from '@/entities/review/model/types';

const getAverageReviewsScore = (reviews: Review[]): number => {
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

export default getAverageReviewsScore;

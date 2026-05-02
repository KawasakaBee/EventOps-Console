import { Box, Stack, Typography } from '@mui/material';
import { IProposalReviewsTabProps } from './ProposalReviewsTab.types';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import getAverageReviewsScore from '@/shared/utils/getAverageReviewsScore';
import getFinalReviewReccomendation from '@/shared/utils/getFinalReviewRecommendation';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import { useMemo } from 'react';
import ReviewCard from '../ReviewCard/ReviewCard';

const ProposalReviewsTab: React.FC<IProposalReviewsTabProps> = ({
  reviews,
  canAssignReview,
  reviewers,
}) => {
  const reviewersNamesByReviewId = useMemo(() => {
    if (!reviewers) return;
    return new Map(
      reviews.map((review) => [
        review.id,
        reviewers.find((item) => item.id === review.reviewerId)?.name,
      ]),
    );
  }, [reviewers, reviews]);

  return (
    <Box>
      {reviews.length !== 0 ? (
        <Stack spacing={6}>
          <Box>
            <Typography variant="h3">Суммарно:</Typography>
            <Typography variant="body2">
              Средняя оценка: {getAverageReviewsScore(reviews)} / 10
            </Typography>
            <Typography variant="body2">
              Рекомендация: {getFinalReviewReccomendation(reviews)}
            </Typography>
            <Typography variant="body2">
              Количество ревью: {reviews.length}
            </Typography>
          </Box>
          {reviewers ? (
            reviewers.length !== 0 ? (
              <Stack spacing={3}>
                {reviews.map((review) => {
                  const name = reviewersNamesByReviewId?.get(review.id);
                  return (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      reviewerName={name ? name : null}
                    />
                  );
                })}
              </Stack>
            ) : (
              <EmptyState
                title="У этой заявки нет ревьюеров"
                subtitle="Пожалуйста, подождите, пока для этой заявки будут назначены ревьюеры."
              />
            )
          ) : (
            <ErrorState
              type="state"
              title="Ревьюеры не найдены"
              subtitle="Попробуйте перезагрузить страницу."
            />
          )}
        </Stack>
      ) : (
        <EmptyState
          title="Ревью пока что нет"
          subtitle={`Для этой заявки ещё нет ревью. ${canAssignReview ? 'Назначьте ревьюера или ждите,' : 'Ждите,'} пока появится ревью.`}
          action={
            canAssignReview
              ? {
                  handler: () => {},
                  buttonName: 'Назначить ревьюера',
                }
              : undefined
          }
        />
      )}
    </Box>
  );
};

export default ProposalReviewsTab;

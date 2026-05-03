import { Box, Divider, Stack, Typography } from '@mui/material';
import { IProposalReviewsTabProps } from './ProposalReviewsTab.types';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import getAverageReviewsScore from '@/shared/utils/getAverageReviewsScore';
import getFinalReviewReccomendation from '@/shared/utils/getFinalReviewRecommendation';
import { useMemo } from 'react';
import ReviewCard from '../ReviewCard/ReviewCard';
import { styles } from './styles';

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

  const sx = styles();

  return (
    <Box>
      {reviews.length !== 0 ? (
        <Stack>
          <Typography variant="h2">Суммарно:</Typography>
          <Stack
            direction="row"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
            sx={sx.reviewsSummary}
          >
            <Typography variant="body2" sx={sx.reviewsSummaryItem}>
              Средняя оценка: <b>{getAverageReviewsScore(reviews)} / 10</b>
            </Typography>
            <Typography variant="body2" sx={sx.reviewsSummaryItem}>
              Рекомендация: <b>{getFinalReviewReccomendation(reviews)}</b>
            </Typography>
            <Typography variant="body2" sx={sx.reviewsSummaryItem}>
              Количество ревью: <b>{reviews.length}</b>
            </Typography>
          </Stack>
          <Typography variant="h2">Ревью:</Typography>
          <Stack spacing={2}>
            {reviews.map((review) => {
              const name = reviewersNamesByReviewId?.get(review.id);
              return (
                <ReviewCard
                  key={review.id}
                  review={review}
                  reviewerName={name ?? null}
                />
              );
            })}
          </Stack>
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

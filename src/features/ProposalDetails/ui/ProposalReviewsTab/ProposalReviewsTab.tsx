import { Box, Divider, Stack, Typography } from '@mui/material';
import { IProposalReviewsTabProps } from './ProposalReviewsTab.types';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import getAverageReviewsScore from '@/shared/utils/getAverageReviewsScore';
import getFinalReviewRecommendation from '@/shared/utils/getFinalReviewRecommendation';
import ReviewCard from '../ReviewCard/ReviewCard';
import { styles } from './styles';
import ReviewCardSkeleton from '../ReviewCard/ReviewCardSkeleton';
import { Review } from '@/entities/review/model/types';
import { ReviewerListItem } from '@/entities/reviewer/model/types';

const ProposalReviewsTab: React.FC<IProposalReviewsTabProps> = ({
  reviews,
  canAssignReviewer,
  reviewers,
}) => {
  const isDataLoaded =
    reviewers.status === 'success' || reviewers.status === 'error';
  const isError = reviewers.status === 'error';

  const reviewer = (review: Review, reviewers: ReviewerListItem[]) => {
    const foundReviewer = reviewers.find((r) => r.id === review.reviewerId);
    return foundReviewer ?? { id: '', name: 'Данные ревьюера недоступны' };
  };

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
              Рекомендация: <b>{getFinalReviewRecommendation(reviews)}</b>
            </Typography>
            <Typography variant="body2" sx={sx.reviewsSummaryItem}>
              Количество ревью: <b>{reviews.length}</b>
            </Typography>
          </Stack>
          <Typography variant="h2">Ревью:</Typography>
          <Stack spacing={2}>
            {reviews.map((review) => {
              return isDataLoaded ? (
                isError ? (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    reviewer={{
                      status: reviewers.status,
                      message: reviewers.message,
                    }}
                  />
                ) : (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    reviewer={{
                      status: reviewers.status,
                      data: reviewer(review, reviewers.data),
                    }}
                  />
                )
              ) : (
                <ReviewCardSkeleton key={review.id} />
              );
            })}
          </Stack>
        </Stack>
      ) : (
        <EmptyState
          title="Ревью пока что нет"
          subtitle={`Для этой заявки ещё нет ревью. ${canAssignReviewer ? 'Назначьте ревьюера или ждите,' : 'Ждите,'} пока появится ревью.`}
        />
      )}
    </Box>
  );
};

export default ProposalReviewsTab;

import { Box, Divider, Stack, Typography } from '@mui/material';
import { IProposalReviewsTabProps } from './ProposalReviewsTab.types';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import calculateAverageReviewScore from '@/entities/review/lib/calculateAverageReviewScore';
import getFinalReviewRecommendation from '@/entities/review/lib/getFinalReviewRecommendation';
import ReviewCard from '../ReviewCard/ReviewCard';
import { styles } from './styles';
import ReviewCardSkeleton from '../ReviewCard/ReviewCardSkeleton';
import { useGetReviewersQuery } from '@/entities/reviewer/api/reviewerApi';

const ProposalReviewsTab: React.FC<IProposalReviewsTabProps> = ({
  reviews,
  canAssignReviewer,
}) => {
  const { data, isLoading, isError, error } = useGetReviewersQuery();

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
            sx={sx.proposalReviewsTabSummary}
          >
            <Typography variant="body2" sx={sx.proposalReviewsTabSummaryItem}>
              Средняя оценка:{' '}
              <b>
                {calculateAverageReviewScore(reviews) ??
                  'Не удалось подсчитать'}{' '}
                / 10
              </b>
            </Typography>
            <Typography variant="body2" sx={sx.proposalReviewsTabSummaryItem}>
              Рекомендация: <b>{getFinalReviewRecommendation(reviews)}</b>
            </Typography>
            <Typography variant="body2" sx={sx.proposalReviewsTabSummaryItem}>
              Количество ревью: <b>{reviews.length}</b>
            </Typography>
          </Stack>
          <Typography variant="h2">Ревью:</Typography>
          <Stack spacing={2}>
            {reviews.map((review) => {
              return isLoading ? (
                <ReviewCardSkeleton key={review.id} />
              ) : (
                <ReviewCard
                  key={review.id}
                  review={review}
                  reviewers={data}
                  isReviewersLoading={isLoading}
                  isReviewersError={isError}
                  reviewersError={error}
                />
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

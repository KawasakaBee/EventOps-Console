import {
  Chip,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { IReviewCardProps } from './ReviewCard.types';
import { styles } from './styles';
import { recommendationDictionary } from '@/entities/review/model/dictionaries';
import { ReviewerListItem } from '@/entities/reviewer/model/types';
import { Review } from '@/entities/review/model/types';
import { getApiErrorMessage } from '@/shared/api/getApiErrorMessage';

const ReviewCard: React.FC<IReviewCardProps> = ({
  review,
  reviewers,
  isReviewersLoading,
  isReviewersError,
  reviewersError,
}) => {
  const sx = styles();

  const reviewer = (review: Review, reviewers: ReviewerListItem[]) => {
    const foundReviewer = reviewers.find((r) => r.id === review.reviewerId);
    return foundReviewer ?? { name: 'Данные ревьюера недоступны' };
  };

  return (
    <Grid
      container
      columnSpacing={1}
      rowSpacing={2}
      sx={sx.reviewCardContainer}
    >
      <Grid
        size={12}
        container
        columnSpacing={2}
        sx={sx.reviewCardReviewerWrapper}
      >
        <Grid size="auto">
          {isReviewersLoading ? (
            <Skeleton variant="text" width={200} />
          ) : (
            <Typography variant="subtitle2">
              <b>
                {isReviewersError
                  ? getApiErrorMessage(reviewersError)
                  : reviewers
                    ? reviewer(review, reviewers.reviewers).name
                    : 'Не удалось загрузить ревьюера'}
              </b>
            </Typography>
          )}
        </Grid>
        <Grid size="auto">
          <Chip
            label={<b>{recommendationDictionary[review.recommendation]}</b>}
          />
        </Grid>
      </Grid>
      <Grid size={12} sx={sx.reviewerCardScoreWrapper}>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Typography variant="body2">
            Контент: <b>{review.scoreContent} / 10</b>
          </Typography>
          <Typography variant="body2">
            Подача: <b>{review.scoreDelivery} / 10</b>
          </Typography>
          <Typography variant="body2">
            Релевантность: <b>{review.scoreRelevance} / 10</b>
          </Typography>
        </Stack>
      </Grid>
      <Grid size="auto">Комментарий:</Grid>
      <Grid size="grow">{review.comment}</Grid>
    </Grid>
  );
};

export default ReviewCard;

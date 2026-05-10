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

const ReviewCard: React.FC<IReviewCardProps> = ({ review, reviewer }) => {
  const sx = styles();

  const isDataLoaded =
    reviewer.status === 'success' || reviewer.status === 'error';
  const isError = reviewer.status === 'error';

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
          {isDataLoaded ? (
            <Typography variant="subtitle2">
              <b>{isError ? reviewer.message : reviewer.data.name}</b>
            </Typography>
          ) : (
            <Skeleton variant="text" width={200} />
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

import { Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { IReviewCardProps } from './ReviewCard.types';
import { recommendationDicrionary } from '@/shared/data';
import { styles } from './styles';

const ReviewCard: React.FC<IReviewCardProps> = ({ review, reviewerName }) => {
  const sx = styles();

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
          <Typography variant="subtitle2">
            <b>{reviewerName ?? '—'}</b>
          </Typography>
        </Grid>
        <Grid size="auto">
          <Chip
            label={<b>{recommendationDicrionary[review.recommendation]}</b>}
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

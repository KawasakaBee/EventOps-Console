import { Divider, Grid, Skeleton, Stack } from '@mui/material';
import { styles } from './styles';

const ReviewCardSkeleton = () => {
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
          <Skeleton variant="text" width={200} />
        </Grid>
        <Grid size="auto">
          <Skeleton variant="text" width={100} />
        </Grid>
      </Grid>
      <Grid size={12} sx={sx.reviewerCardScoreWrapper}>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={120} />
        </Stack>
      </Grid>
      <Grid size="auto">
        {' '}
        <Skeleton variant="text" width={120} />
      </Grid>
      <Grid size="grow">
        <Skeleton variant="text" />
      </Grid>
    </Grid>
  );
};

export default ReviewCardSkeleton;

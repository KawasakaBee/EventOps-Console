import { Divider, Grid, Skeleton, Stack } from '@mui/material';
import { styles } from './styles';

const ProposalOverviewTabSkeleton = () => {
  const sx = styles();

  return (
    <Stack spacing={6}>
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid size={12}>
          <Skeleton variant="text" width={200} />
        </Grid>
        <Grid size={12} sx={sx.overviewHead}>
          <Stack
            direction="row"
            spacing={2}
            sx={sx.overviewList}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Skeleton variant="text" width={80} />
            <Skeleton variant="text" width={80} />
            <Skeleton variant="text" width={80} />
          </Stack>
        </Grid>
        <Grid size={12} sx={sx.abstractWrapper}>
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Grid>
        <Grid size={2}>
          {' '}
          <Skeleton variant="text" />
        </Grid>
        <Grid size={10}>
          {' '}
          <Skeleton variant="text" width={300} />
        </Grid>
        <Grid size={2}>
          {' '}
          <Skeleton variant="text" />
        </Grid>
        <Grid size={10}>
          {' '}
          <Skeleton variant="text" width={300} />
        </Grid>
        <Grid size={2}>
          {' '}
          <Skeleton variant="text" />
        </Grid>
        <Grid size={10}>
          {' '}
          <Skeleton variant="text" width={300} />
        </Grid>
        <Grid size={2}>
          {' '}
          <Skeleton variant="text" />
        </Grid>
        <Grid size={10}>
          {' '}
          <Skeleton variant="text" width={300} />
        </Grid>
        <Grid size={2}>
          {' '}
          <Skeleton variant="text" />
        </Grid>
        <Grid size={10}>
          {' '}
          <Skeleton variant="text" width={300} />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ProposalOverviewTabSkeleton;

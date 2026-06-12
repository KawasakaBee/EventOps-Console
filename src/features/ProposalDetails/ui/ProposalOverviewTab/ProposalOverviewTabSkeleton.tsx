import { Box, Divider, Grid, Skeleton, Stack } from '@mui/material';
import { styles } from './styles';

const ProposalOverviewTabSkeleton = () => {
  const sx = styles();

  return (
    <Stack spacing={6}>
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid size={12}>
          <Skeleton variant="text" width={200} />
        </Grid>
        <Grid size={12} sx={sx.proposalOverviewTabHead}>
          <Stack
            direction="row"
            spacing={2}
            sx={sx.proposalOverviewTabList}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Skeleton variant="text" width={80} />
            <Skeleton variant="text" width={80} />
            <Skeleton variant="text" width={80} />
          </Stack>
        </Grid>
        <Grid container columnSpacing={0} sx={sx.proposalOverviewTabContent}>
          <Grid size={8} sx={sx.proposalOverviewTabAbstractWrap}>
            <Stack spacing={6}>
              <Box>
                <Skeleton variant="text" width={200} />
                <Divider sx={sx.proposalOverviewTabAbstractDivider} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </Box>
              <Box>
                <Skeleton variant="text" width={200} />
                <Divider sx={sx.proposalOverviewTabAbstractDivider} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </Box>
              <Box>
                <Skeleton variant="text" width={200} />
                <Divider sx={sx.proposalOverviewTabAbstractDivider} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </Box>
              <Box>
                <Skeleton variant="text" width={200} />
                <Divider sx={sx.proposalOverviewTabAbstractDivider} />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </Box>
            </Stack>
          </Grid>
          <Grid
            container
            size={4}
            rowSpacing={4}
            sx={sx.proposalOverviewTabMetadata}
          >
            <Grid size={12}>
              <Box>
                <Skeleton variant="text" width={150} />
                <Divider sx={sx.proposalOverviewTabAbstractDivider} />
              </Box>
              <Stack spacing={1}>
                <Skeleton variant="text" width={150} />
                <Skeleton variant="text" width={120} />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack spacing={1}>
                <Skeleton variant="text" width={150} />
                <Skeleton variant="text" width={120} />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack spacing={1}>
                <Skeleton variant="text" width={150} />
                <Skeleton variant="text" width={80} />
                <Skeleton variant="text" width={80} />
                <Skeleton variant="text" width={80} />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack spacing={1}>
                <Skeleton variant="text" width={150} />
                <Skeleton variant="text" width={120} />
              </Stack>
            </Grid>
            <Grid size={12}>
              <Stack spacing={1}>
                <Skeleton variant="text" width={150} />
                <Skeleton variant="text" width={120} />
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ProposalOverviewTabSkeleton;

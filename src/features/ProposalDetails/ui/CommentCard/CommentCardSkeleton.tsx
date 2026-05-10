import { Box, Grid, Skeleton, Stack } from '@mui/material';
import { styles } from './styles';

const CommentCardSkeleton = () => {
  const sx = styles({ role: 'speaker' });

  return (
    <Grid container columnSpacing={2}>
      <Grid size="auto">
        <Skeleton variant="text" width={40} />
      </Grid>
      <Grid size="grow">
        <Stack direction="row" spacing={1} sx={sx.bioWrapper}>
          <Skeleton variant="text" width={150} />
          <Skeleton variant="text" width={80} />
        </Stack>
        <Box sx={sx.timeWrapper}>
          <Skeleton variant="text" width={250} />
        </Box>
        <Box>
          <Skeleton variant="text" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CommentCardSkeleton;

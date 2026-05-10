import { Skeleton, Stack } from '@mui/material';

const SecondaryStickyButtonsSkeleton = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="text" width={'30%'} />
      <Stack direction="row" spacing={1}>
        <Skeleton variant="text" width={'5%'} />
        <Skeleton variant="text" width={'5%'} />
        <Skeleton variant="text" width={'5%'} />
      </Stack>
    </Stack>
  );
};

export default SecondaryStickyButtonsSkeleton;

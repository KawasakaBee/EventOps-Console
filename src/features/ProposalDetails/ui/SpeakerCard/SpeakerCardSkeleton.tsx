import { Box, Skeleton, Stack } from '@mui/material';
import { styles } from './styles';

const SpeakerCardSkeleton = () => {
  const sx = styles();

  return (
    <Stack spacing={4} sx={sx.cardWrapper}>
      <Stack direction="row" spacing={2} sx={sx.headingWrapper}>
        <Stack>
          <Stack direction="row" spacing={2} sx={sx.cardNameWrapper}>
            <Skeleton variant="text" width={50} sx={sx.avatarSkeleton} />
            <Skeleton variant="text" width={250} />
          </Stack>
          <Skeleton variant="text" />
        </Stack>
        <Stack spacing={1} sx={sx.cardInfoWrapper}>
          <Stack direction="row" spacing={1} sx={sx.cardInfoEmailWrapper}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width={100} />
          </Stack>
          <Stack direction="row" spacing={1} sx={sx.cardContactsWrapper}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width={100} />
          </Stack>
        </Stack>
      </Stack>
      <Box>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Box>
      <Skeleton variant="text" width={400} />
    </Stack>
  );
};

export default SpeakerCardSkeleton;

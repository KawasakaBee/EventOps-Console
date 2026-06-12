import { Box, Skeleton, Stack } from '@mui/material';
import { styles } from './styles';

const SpeakerCardSkeleton = () => {
  const sx = styles();

  return (
    <Stack spacing={4} sx={sx.speakerCard}>
      <Stack direction="row" spacing={2} sx={sx.speakerCardHeadingWrap}>
        <Stack>
          <Stack direction="row" spacing={2} sx={sx.speakerCardNameWrap}>
            <Skeleton
              variant="text"
              width={50}
              sx={sx.speakerCardAvatarSkeleton}
            />
            <Skeleton variant="text" width={250} />
          </Stack>
          <Skeleton variant="text" />
        </Stack>
        <Stack spacing={1} sx={sx.speakerCardInfoWrap}>
          <Stack direction="row" spacing={1} sx={sx.speakerCardInfoEmailWrap}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" width={100} />
          </Stack>
          <Stack direction="row" spacing={1} sx={sx.speakerCardContactsWrap}>
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

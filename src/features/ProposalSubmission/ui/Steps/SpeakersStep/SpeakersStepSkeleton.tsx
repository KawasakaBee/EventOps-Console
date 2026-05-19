import { Skeleton, Stack } from '@mui/material';
import { styles } from './styles';
import { speakerFields } from '@/entities/speaker/api/dictionary';

const SpeakersStepSkeleton = () => {
  const sx = styles();

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} sx={sx.countWrapper}>
        <Skeleton variant="text" width={100} />
        <Skeleton variant="circular" width={30} height={30} />
        <Skeleton variant="circular" width={30} height={30} />
      </Stack>
      <Stack spacing={4}>
        {Array.from({ length: 1 }).map((_, idx) => (
          <Stack key={idx}>
            <Skeleton variant="text" width={160} height={30} />
            <Stack spacing={2}>
              {speakerFields.map((field) => (
                <Skeleton key={field} variant="text" height={60} />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
export default SpeakersStepSkeleton;

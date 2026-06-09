import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { Box, Skeleton, Stack } from '@mui/material';

const DashboardAttentionsSkeleton = () => {
  return (
    <SectionCard title="Требует внимания!">
      <Stack spacing={2}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <Box key={idx}>
            <Stack direction="row" spacing={1}>
              <Skeleton variant="text" width={150} />
              <Skeleton variant="text" width={80} />
            </Stack>
          </Box>
        ))}
      </Stack>
    </SectionCard>
  );
};
export default DashboardAttentionsSkeleton;

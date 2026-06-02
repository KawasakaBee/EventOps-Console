import { Skeleton, Stack } from '@mui/material';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';

const ScheduleTabsSkeleton = () => {
  return (
    <SectionCard title={null}>
      <Stack direction="row" spacing={1}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton key={idx} variant="text" width={100} />
        ))}
      </Stack>
    </SectionCard>
  );
};
export default ScheduleTabsSkeleton;

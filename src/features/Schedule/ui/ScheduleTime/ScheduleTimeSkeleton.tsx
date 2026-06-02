import { Skeleton } from '@mui/material';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { styles } from './styles';
import { IScheduleTimeSkeletonProps } from './ScheduleTime.types';

const ScheduleTimeSkeleton: React.FC<IScheduleTimeSkeletonProps> = ({
  idx,
}) => {
  const sx = styles({ rowDurationMinutes: 50, startRow: idx * 10 + 1 });

  return (
    <>
      <SectionCard title={null} restSx={sx.timeCell}>
        <Skeleton variant="text" width={50} />
        <Skeleton variant="text" width={50} />
      </SectionCard>
    </>
  );
};
export default ScheduleTimeSkeleton;

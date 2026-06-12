import { IScheduleEmptySkeletonProps } from './ScheduleEmpty.types';
import { styles } from './styles';
import { Box, Skeleton } from '@mui/material';

const ScheduleEmptySkeleton: React.FC<IScheduleEmptySkeletonProps> = ({
  trackIdx,
  lineIdx,
}) => {
  const gridColumn = trackIdx + 2;

  const gridStartRow = lineIdx * 10 + 1;
  const gridEndRow = gridStartRow + 10;

  const sx = styles({
    column: gridColumn,
    startRow: gridStartRow,
    endRow: gridEndRow,
  });

  return (
    <Box sx={sx.scheduleEmpty}>
      <Skeleton variant="text" width={160} />
    </Box>
  );
};
export default ScheduleEmptySkeleton;

import { getGridLinesByTime } from '@/entities/schedule/lib/grid';
import { IScheduleEmptyProps } from './ScheduleEmpty.types';
import { styles } from './styles';
import { Box, Typography } from '@mui/material';

const ScheduleEmpty: React.FC<IScheduleEmptyProps> = ({
  time,
  trackIdx,
  dayStart,
}) => {
  const gridColumn = trackIdx + 2;

  const gridStartRow = getGridLinesByTime(time.from, dayStart);
  const gridEndRow = getGridLinesByTime(time.to, dayStart);

  const sx = styles({
    column: gridColumn,
    startRow: gridStartRow,
    endRow: gridEndRow,
  });

  return (
    <Box sx={sx.scheduleEmpty}>
      <Typography variant="body2">Свободно</Typography>
    </Box>
  );
};
export default ScheduleEmpty;

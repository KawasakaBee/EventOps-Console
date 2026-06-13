import { Typography } from '@mui/material';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { styles } from './styles';
import { useMemo } from 'react';
import { IScheduleTimeProps } from './ScheduleTime.types';
import { formatScheduleTime } from '@/shared/utils/formatTimeAndDate';

const ScheduleTime: React.FC<IScheduleTimeProps> = ({ time, startRow }) => {
  const rowDurationMinutes = useMemo(
    () =>
      (new Date(time.to).getTime() - new Date(time.from).getTime()) /
      (60 * 1000),
    [time.from, time.to],
  );

  const sx = styles({ rowDurationMinutes, startRow });

  return (
    <>
      <SectionCard title={null} restSx={sx.scheduleTime}>
        <Typography variant="subtitle2" sx={sx.scheduleTimeText}>
          C {formatScheduleTime(time.from)}
        </Typography>
        <Typography variant="subtitle2" sx={sx.scheduleTimeText}>
          До {formatScheduleTime(time.to)}
        </Typography>
      </SectionCard>
    </>
  );
};
export default ScheduleTime;

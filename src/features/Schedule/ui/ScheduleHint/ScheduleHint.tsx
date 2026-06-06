import { Box, Tooltip } from '@mui/material';
import { IScheduleHintProps } from './ScheduleHint.types';
import { styles } from './styles';
import { getGridLinesByTime } from '@/entities/schedule/lib/grid';
import { toMs } from '@/entities/schedule/lib/getFreeIntervals';
import { APPBAR_HEIGHT } from '@/shared/config/layout';

const ScheduleHint: React.FC<IScheduleHintProps> = ({
  scheduleSlots,
  selectedSlot,
  tracks,
  dayStart,
  dayEnd,
}) => {
  const { trackId, startTime, endTime } = selectedSlot;

  const from = toMs(startTime);
  const to = toMs(endTime);

  const trackIdx = tracks.findIndex((track) => track.id === trackId);

  const gridColumn = trackIdx === -1 ? 0 : trackIdx + 2;

  const gridStartRow = getGridLinesByTime(startTime, dayStart);
  const gridEndRow = getGridLinesByTime(endTime, dayStart);

  const hasOverlap = scheduleSlots
    .filter((item) => item.slot.trackId === trackId)
    .some(
      (item) =>
        from < toMs(item.slot.endTime) && to > toMs(item.slot.startTime),
    );

  const hasDayEndOverlap = toMs(dayEnd) < to;

  const hintTitle = hasOverlap
    ? 'Слот занят'
    : hasDayEndOverlap
      ? 'Выступление не может заканчиваться позже мероприятия'
      : 'Можно назначить в данный слот';

  const sx = styles({
    column: gridColumn,
    startRow: gridStartRow,
    endRow: gridEndRow,
    hasOverlap: hasOverlap || hasDayEndOverlap,
  });

  return (
    <Tooltip
      open
      title={hintTitle}
      placement="right-start"
      slotProps={{
        tooltip: { sx: sx.tooltip },
        popper: {
          popperOptions: {
            strategy: 'fixed',
          },
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
                altAxis: true,
                padding: {
                  top: APPBAR_HEIGHT + 8,
                  right: 8,
                  bottom: 8,
                  left: 8,
                },
              },
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['left-start', 'top', 'bottom'],
              },
            },
          ],
        },
      }}
    >
      <Box sx={sx.cellHint} />
    </Tooltip>
  );
};
export default ScheduleHint;

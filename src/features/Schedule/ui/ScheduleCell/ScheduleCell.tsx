import { ID } from '@/shared/types/primitives.types';
import { IScheduleCellProps } from './ScheduleCell.types';
import { useRouter } from 'next/navigation';
import { styles } from './styles';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { Stack, Typography } from '@mui/material';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import { formatDictionary } from '@/entities/proposal/model/dictionaries';
import formatMinutesDuration from '@/shared/utils/formatMinutesDuration';
import { getGridLinesByTime } from '@/entities/schedule/lib/grid';

const ScheduleCell: React.FC<IScheduleCellProps> = ({
  respSlot,
  tracks,
  dayStart,
}) => {
  const router = useRouter();

  const trackIdx = tracks.findIndex(
    (track) => track.id === respSlot.slot.trackId,
  );

  if (trackIdx === -1) return null;

  const gridColumn = trackIdx + 2;

  const gridStartRow = getGridLinesByTime(respSlot.slot.startTime, dayStart);
  const gridEndRow = getGridLinesByTime(respSlot.slot.endTime, dayStart);

  const sx = styles({
    column: gridColumn,
    startRow: gridStartRow,
    endRow: gridEndRow,
  });

  const handleToDetailsRoute = (id: ID | null) => {
    if (!id) return;

    router.push(`/proposals/${id}`);
  };

  return (
    <SectionCard key={respSlot.slot.id} title={null} restSx={sx.slotCell}>
      <Stack
        spacing={1}
        component={'div'}
        onClick={() => handleToDetailsRoute(respSlot.slot.proposalId)}
        sx={sx.slotContainer}
      >
        <Stack direction="row" spacing={1} sx={sx.slotWrapper}>
          <Typography variant="caption">
            {respSlot.slot.startTime.slice(11, 16)} —{' '}
            {respSlot.slot.endTime.slice(11, 16)}
          </Typography>
          <StatusChip
            shape="rounded"
            size="small"
            status="scheduled"
            type="outlined"
          />
        </Stack>
        <Typography variant="subtitle2">
          <b>
            {respSlot.format
              ? formatDictionary[respSlot.format]
              : 'Не удалось загрузить формат'}
          </b>
        </Typography>
        <Typography variant="caption">
          {respSlot.duration
            ? formatMinutesDuration(respSlot.duration)
            : 'Не удалось загрузить продолжительность'}
        </Typography>
        <Typography variant="subtitle2">
          {respSlot.title ?? 'Не удалось загрузить название'}
        </Typography>
        {respSlot.speakerNames.length > 0 && (
          <Stack spacing={0.5}>
            <Typography variant="subtitle2">Спикеры:</Typography>
            <Stack direction="row" spacing={0.5} divider={<>,</>}>
              {respSlot.speakerNames.map((name) => (
                <Typography key={name} variant="caption" sx={sx.speakerName}>
                  {name}
                </Typography>
              ))}
            </Stack>
          </Stack>
        )}
      </Stack>
    </SectionCard>
  );
};
export default ScheduleCell;

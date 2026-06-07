import { ID } from '@/shared/types/primitives.types';
import { IScheduleCellProps } from './ScheduleCell.types';
import { useRouter } from 'next/navigation';
import { styles } from './styles';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { Popover, Stack, Typography } from '@mui/material';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import { formatDictionary } from '@/entities/proposal/model/dictionaries';
import formatMinutesDuration from '@/shared/utils/formatMinutesDuration';
import { getGridLinesByTime } from '@/entities/schedule/lib/grid';
import { useRef, useState } from 'react';
import Button from '@/shared/ui/Button/Button';
import CloseIcon from '@mui/icons-material/Close';

const ScheduleCell: React.FC<IScheduleCellProps> = ({
  respSlot,
  tracks,
  dayStart,
  setUnssign,
}) => {
  const router = useRouter();

  const trackIdx = tracks.findIndex(
    (track) => track.id === respSlot.slot.trackId,
  );

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (trackIdx === -1) return null;

  const gridColumn = trackIdx + 2;

  const gridStartRow = getGridLinesByTime(respSlot.slot.startTime, dayStart);
  const gridEndRow = getGridLinesByTime(respSlot.slot.endTime, dayStart);

  const sx = styles({
    column: gridColumn,
    startRow: gridStartRow,
    endRow: gridEndRow,
  });

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleToDetailsRoute = (id: ID | null) => {
    if (!id) return;

    router.push(`/proposals/${id}`);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    clearCloseTimer();
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handlePopoverCloseDelayed = () => {
    closeTimerRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, 120);
  };

  const handlePopoverKeepOpen = () => {
    clearCloseTimer();
  };

  const handleProposalUnassign = () => {
    setUnssign({ opened: true, id: respSlot.slot.id });
  };

  return (
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        sx={sx.popover}
        slotProps={{
          paper: {
            sx: sx.popoverPaper,
            onMouseEnter: handlePopoverKeepOpen,
            onMouseLeave: handlePopoverCloseDelayed,
          },
        }}
      >
        <Button
          mode="iconButton"
          variant="outlined"
          size="small"
          ariaLabel="Кнопка закрытия поповера"
          icon={CloseIcon}
          onClick={handlePopoverClose}
          sx={sx.popoverCloseButton}
        />
        <Button
          mode="button"
          variant="outlined"
          size="small"
          onClick={handleProposalUnassign}
        >
          Убрать из расписания
        </Button>
      </Popover>
      <SectionCard key={respSlot.slot.id} title={null} restSx={sx.slotCell}>
        <Stack
          spacing={1}
          component={'div'}
          onClick={() => handleToDetailsRoute(respSlot.slot.proposalId)}
          sx={sx.slotContainer}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverCloseDelayed}
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
    </>
  );
};
export default ScheduleCell;

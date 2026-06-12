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
  scheduleSlot,
  tracks,
  dayStart,
  setUnassign,
}) => {
  const router = useRouter();

  const trackIdx = tracks.findIndex(
    (track) => track.id === scheduleSlot.slot.trackId,
  );

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (trackIdx === -1) return null;

  const gridColumn = trackIdx + 2;

  const gridStartRow = getGridLinesByTime(
    scheduleSlot.slot.startTime,
    dayStart,
  );
  const gridEndRow = getGridLinesByTime(scheduleSlot.slot.endTime, dayStart);

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
    setUnassign({ opened: true, id: scheduleSlot.slot.id });
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
        sx={sx.scheduleCellPopover}
        slotProps={{
          paper: {
            sx: sx.scheduleCellPopoverPaper,
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
          sx={sx.scheduleCellPopoverCloseButton}
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
      <SectionCard
        key={scheduleSlot.slot.id}
        title={null}
        restSx={sx.scheduleCell}
      >
        <Stack
          spacing={1}
          component={'div'}
          onClick={() => handleToDetailsRoute(scheduleSlot.slot.proposalId)}
          sx={sx.scheduleCellSlotContainer}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverCloseDelayed}
        >
          <Stack direction="row" spacing={1} sx={sx.scheduleCellSlotWrap}>
            <Typography variant="caption">
              {scheduleSlot.slot.startTime.slice(11, 16)} —{' '}
              {scheduleSlot.slot.endTime.slice(11, 16)}
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
              {scheduleSlot.format
                ? formatDictionary[scheduleSlot.format]
                : 'Не удалось загрузить формат'}
            </b>
          </Typography>
          <Typography variant="caption">
            {scheduleSlot.duration
              ? formatMinutesDuration(scheduleSlot.duration)
              : 'Не удалось загрузить продолжительность'}
          </Typography>
          <Typography variant="subtitle2">
            {scheduleSlot.title ?? 'Не удалось загрузить название'}
          </Typography>
          {scheduleSlot.speakerNames.length > 0 && (
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">Спикеры:</Typography>
              <Stack direction="row" spacing={0.5} divider={<>,</>}>
                {scheduleSlot.speakerNames.map((name) => (
                  <Typography
                    key={name}
                    variant="caption"
                    sx={sx.scheduleCellSpeakerName}
                  >
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

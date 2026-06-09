'use client';

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import useScheduleData from '../../model/useScheduleData';
import ScheduleTime from '../ScheduleTime/ScheduleTime';
import ScheduleTabs from '../ScheduleTabs/ScheduleTabs';
import ScheduleTabsSkeleton from '../ScheduleTabs/ScheduleTabsSkeleton';
import { styles } from './styles';
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import getScheduleErrorState from '../../model/getScheduleErrorState';
import ScheduleCell from '../ScheduleCell/ScheduleCell';
import ScheduleEmpty from '../ScheduleEmpty/ScheduleEmpty';
import getFreeIntervals from '../../../../entities/schedule/lib/getFreeIntervals';
import ScheduleTimeSkeleton from '../ScheduleTime/ScheduleTimeSkeleton';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import ScheduleEmptySkeleton from '../ScheduleEmpty/ScheduleEmptySkeleton';
import ScheduleAssign from '../ScheduleAssign/ScheduleAssign';
import { useMemo } from 'react';
import ScheduleAssignSkeleton from '../ScheduleAssign/ScheduleAssignSkeleton';
import ScheduleHint from '../ScheduleHint/ScheduleHint';
import { addHourToIso } from '@/shared/utils/formatTimeAndDate';
import Button from '@/shared/ui/Button/Button';
import ScheduleSelect from '../ScheduleSelect/ScheduleSelect';

const SchedulePage = () => {
  const {
    schedule,
    tracks,
    unassignState,
    timeIntervals,
    rowsCount,
    timeStartRows,
    selectedSlot,
    unassignResult,
    unassignConfirm,
    selectedEvent,
    stringifySearchParams,
    getSchedule,
    setSelectedSlot,
    setUnassignConfirm,
    handleUnassignClose,
    handleUnassignConfirmDialogClose,
    handleProposalUnassign,
  } = useScheduleData();

  const tracksLength = tracks.data?.tracks.length ?? 5;
  const selectedScheduleDate =
    schedule.data?.times[0]?.time?.slice(0, 10) ?? '';
  const dayStart = schedule.data?.times[0]?.time;
  const lastTime = schedule.data?.times.at(-1)?.time;
  const dayEnd = lastTime ? addHourToIso(lastTime) : null;

  const scheduleSlots = useMemo(
    () => (schedule.data ? [...schedule.data.slots] : []),
    [schedule.data],
  );

  const isGridLoading =
    schedule.isLoading || tracks.isLoading || unassignState.isLoading;
  const canRenderGrid = schedule.data && tracks.data;

  const sx = styles({ tracksLength, rowsCount });

  return (
    <Stack spacing={2}>
      <ScheduleSelect />
      {selectedEvent !== '' ? (
        schedule.isError ? (
          isAppBaseQueryError(schedule.error) && (
            <ErrorState
              {...getScheduleErrorState(schedule.error.error, {
                retry: () =>
                  getSchedule({
                    id: selectedEvent,
                    searchParams: stringifySearchParams,
                  }),
              })}
            />
          )
        ) : tracks.isError ? (
          isAppBaseQueryError(tracks.error) && (
            <ErrorState
              {...getScheduleErrorState(tracks.error.error, {
                retry: tracks.refetch,
              })}
            />
          )
        ) : (
          <>
            {isGridLoading ? (
              <ScheduleAssignSkeleton />
            ) : (
              canRenderGrid && (
                <ScheduleAssign
                  key={`${selectedEvent}-${selectedScheduleDate}`}
                  tracks={tracks.data.tracks}
                  scheduleSlots={scheduleSlots}
                  days={schedule.data?.days ?? []}
                  timeIntervals={timeIntervals}
                  setSelectedSlot={setSelectedSlot}
                  selectedEvent={selectedEvent}
                />
              )
            )}
            {isGridLoading ? (
              <ScheduleTabsSkeleton />
            ) : (
              <ScheduleTabs days={schedule.data?.days ?? []} />
            )}
            <Box sx={sx.scheduleContainer}>
              <Box sx={sx.scheduleWrapper}>
                <Box />
                {isGridLoading
                  ? Array.from({ length: tracksLength }).map((_, idx) => (
                      <Skeleton key={idx} variant="text" width={200} />
                    ))
                  : canRenderGrid &&
                    tracks.data.tracks.map((track) => (
                      <Typography key={track.id} variant="subtitle2">
                        {track.title}
                      </Typography>
                    ))}
                {isGridLoading ? (
                  <>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <ScheduleTimeSkeleton key={idx} idx={idx} />
                    ))}
                    {Array.from({ length: 5 }).map((_, lineIdx) =>
                      Array.from({ length: tracksLength }).map(
                        (_, columnIdx) => (
                          <ScheduleEmptySkeleton
                            key={`${lineIdx}-${columnIdx}`}
                            trackIdx={columnIdx}
                            lineIdx={lineIdx}
                          />
                        ),
                      ),
                    )}
                  </>
                ) : canRenderGrid &&
                  schedule.data.times.length > 0 &&
                  tracks.data.tracks.length > 0 ? (
                  <>
                    {timeIntervals.map((time, idx) => (
                      <ScheduleTime
                        key={`${time.from}-${time.to}`}
                        time={time}
                        startRow={timeStartRows[idx]}
                      />
                    ))}
                    {timeIntervals.flatMap((time) =>
                      tracks.data.tracks.map((track, idx) => {
                        if (!dayStart) return;

                        const busySlots = scheduleSlots.filter(
                          (respSlot) => respSlot.slot.trackId === track.id,
                        );

                        const freeIntervals = getFreeIntervals(
                          time,
                          busySlots.map((slot) => ({
                            startTime: slot.slot.startTime,
                            endTime: slot.slot.endTime,
                          })),
                        );

                        return freeIntervals.map((freeTime) => (
                          <ScheduleEmpty
                            key={`${freeTime.from}-${freeTime.to}-${track.id}`}
                            time={freeTime}
                            trackIdx={idx}
                            dayStart={dayStart}
                          />
                        ));
                      }),
                    )}
                    {scheduleSlots.map((respSlot) => {
                      if (!dayStart) return;

                      return (
                        <ScheduleCell
                          key={respSlot.slot.id}
                          respSlot={respSlot}
                          tracks={tracks.data?.tracks ?? []}
                          dayStart={dayStart}
                          setUnssign={setUnassignConfirm}
                        />
                      );
                    })}
                    {selectedSlot && dayStart && dayEnd && (
                      <ScheduleHint
                        scheduleSlots={scheduleSlots}
                        selectedSlot={selectedSlot}
                        tracks={tracks.data.tracks}
                        dayStart={dayStart}
                        dayEnd={dayEnd}
                      />
                    )}
                  </>
                ) : (
                  <EmptyState
                    title="Расписания пока что нет"
                    subtitle="Создайте новое расписание"
                  />
                )}
              </Box>
            </Box>
          </>
        )
      ) : (
        <></>
      )}
      {unassignConfirm.opened && (
        <Dialog
          open
          onClose={handleUnassignConfirmDialogClose}
          slotProps={{ paper: { sx: sx.dialogPaper } }}
        >
          <DialogTitle>Убрать выбранную заявку из расписания?</DialogTitle>
          <DialogContent>
            Это действие удалит выбранную заявку из расписания и переведёт её в
            статус «Принята»
          </DialogContent>
          <DialogActions>
            <Button
              mode="button"
              variant="contained"
              size="medium"
              intent="success"
              onClick={handleProposalUnassign}
              isDisabled={isGridLoading}
            >
              Продолжить
            </Button>
            <Button
              mode="button"
              variant="contained"
              size="medium"
              intent="danger"
              onClick={handleUnassignConfirmDialogClose}
              isDisabled={isGridLoading}
            >
              Отменить
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {unassignResult && (
        <Dialog
          open
          onClose={handleUnassignClose}
          slotProps={{ paper: { sx: sx.dialogPaper } }}
        >
          {unassignResult.ok ? (
            <>
              <DialogTitle>Заявка успешно убрана из расписания</DialogTitle>
            </>
          ) : (
            <ErrorState {...unassignResult.error} />
          )}
          <DialogActions>
            <Button
              mode="button"
              variant="contained"
              size="medium"
              onClick={handleUnassignClose}
              isDisabled={isGridLoading}
            >
              Продолжить
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Stack>
  );
};
export default SchedulePage;

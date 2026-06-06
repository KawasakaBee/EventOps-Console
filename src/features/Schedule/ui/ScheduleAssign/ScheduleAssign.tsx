import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { IScheduleAssignProps } from './ScheduleAssign.types';
import { formatScheduleTime } from '@/shared/utils/formatTimeAndDate';
import Button from '@/shared/ui/Button/Button';
import useScheduleAssignData from '../../model/useScheduleAssignData';
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import getScheduleErrorState from '../../model/getScheduleErrorState';
import { styles } from './styles';

const ScheduleAssign: React.FC<IScheduleAssignProps> = ({
  tracks,
  scheduleSlots,
  days,
  timeIntervals,
  setSelectedSlot,
}) => {
  const {
    proposalsState,
    assignState,
    isAssignDialogOpened,
    selectedTrack,
    selectedProposal,
    selectedInterval,
    isLoading,
    freeIntervals,
    handleTrackSelect,
    handleProposalSelect,
    handleIntervalSelect,
    handleProposalAssign,
    handleCloseAssignDialog,
  } = useScheduleAssignData(
    scheduleSlots,
    timeIntervals,
    days,
    setSelectedSlot,
  );

  const sx = styles();

  return (
    <>
      <SectionCard title="Назначение заявки в слот расписания">
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth disabled={isLoading}>
            <InputLabel id="schedule-track-select">Трек</InputLabel>
            <Select
              labelId="schedule-track-select"
              label="Трек"
              value={selectedTrack}
              onChange={(event) => handleTrackSelect(event.target.value)}
            >
              {tracks.length > 0
                ? tracks.map((track) => (
                    <MenuItem key={track.id} value={track.id}>
                      {track.title}
                    </MenuItem>
                  ))
                : 'Нет доступных треков'}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Autocomplete
              options={proposalsState.data?.proposals ?? []}
              value={selectedProposal}
              getOptionLabel={(option) => option.label}
              getOptionKey={(option) => option.id}
              noOptionsText="Нет доступных заявок"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Выберите заявку"
                  label="Заявка"
                />
              )}
              onChange={(_, option) => handleProposalSelect(option)}
              disabled={selectedTrack === '' || isLoading}
              slotProps={{ paper: { sx: sx.noOptionText } }}
            />
          </FormControl>

          <FormControl
            fullWidth
            disabled={selectedTrack === '' || !selectedProposal || isLoading}
          >
            <InputLabel id="schedule-time-select">Время</InputLabel>
            <Select
              labelId="schedule-time-select"
              label="Время"
              value={selectedInterval}
              onChange={(event) => handleIntervalSelect(event.target.value)}
            >
              {freeIntervals.length > 0
                ? freeIntervals.map((interval) => (
                    <MenuItem
                      key={`${interval.from}-${interval.to}`}
                      value={`${interval.from},${interval.to}`}
                    >{`${formatScheduleTime(interval.from)}-${formatScheduleTime(interval.to)}`}</MenuItem>
                  ))
                : 'Нет доступных слотов'}
            </Select>
          </FormControl>

          <Button
            mode="button"
            variant="contained"
            size="medium"
            onClick={handleProposalAssign}
            isDisabled={
              isLoading ||
              selectedTrack === '' ||
              !selectedProposal ||
              selectedInterval === ''
            }
          >
            Назначить
          </Button>
        </Stack>
      </SectionCard>
      {!assignState.isLoading && (
        <Dialog
          open={isAssignDialogOpened}
          onClose={handleCloseAssignDialog}
          slotProps={{ paper: { sx: sx.dialogPaper } }}
        >
          {!assignState.isError && (
            <DialogTitle>Заявка успешно назначена</DialogTitle>
          )}
          <DialogContent>
            {assignState.isError
              ? isAppBaseQueryError(assignState.error) && (
                  <ErrorState
                    {...getScheduleErrorState(assignState.error.error, {
                      retry: () => null,
                    })}
                  />
                )
              : 'Вы можете продолжить работу с расписанием'}
          </DialogContent>
          <DialogActions>
            <Button
              mode="button"
              variant="contained"
              size="medium"
              onClick={handleCloseAssignDialog}
            >
              Продолжить
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ScheduleAssign;

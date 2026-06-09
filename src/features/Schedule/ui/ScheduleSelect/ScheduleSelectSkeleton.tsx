import { FormControl, InputLabel, Select, Stack } from '@mui/material';

const ScheduleSelectSkeleton = () => {
  return (
    <Stack direction="row" spacing={2}>
      <FormControl fullWidth disabled>
        <InputLabel id="schedule-event-select">Событие</InputLabel>
        <Select value={''} labelId="schedule-event-select" label="Событие" />
      </FormControl>
    </Stack>
  );
};
export default ScheduleSelectSkeleton;

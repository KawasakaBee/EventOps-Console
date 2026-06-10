import { FormControl, InputLabel, Select, Stack } from '@mui/material';

const AnalyticsSelectSkeleton = () => {
  return (
    <Stack direction="row" spacing={2}>
      <FormControl fullWidth disabled>
        <InputLabel id="analytics-event-select">Событие</InputLabel>
        <Select value={''} labelId="analytics-event-select" label="Событие" />
      </FormControl>
      <FormControl fullWidth disabled>
        <InputLabel id="analytics-range-select">
          Временной промежуток
        </InputLabel>
        <Select
          value={''}
          labelId="analytics-range-select"
          label="Временной промежуток"
        />
      </FormControl>
    </Stack>
  );
};
export default AnalyticsSelectSkeleton;

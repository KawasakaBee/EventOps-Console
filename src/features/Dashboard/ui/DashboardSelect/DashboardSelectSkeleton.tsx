import { FormControl, InputLabel, Select, Stack } from '@mui/material';

const DashboardSelectSkeleton = () => {
  return (
    <Stack direction="row" spacing={2}>
      <FormControl fullWidth disabled>
        <InputLabel id="dashboard-event-select">Событие</InputLabel>
        <Select value={''} labelId="dashboard-event-select" label="Событие" />
      </FormControl>
      <FormControl fullWidth disabled>
        <InputLabel id="dashboard-range-select">
          Временной промежуток
        </InputLabel>
        <Select
          value={''}
          labelId="dashboard-range-select"
          label="Временной промежуток"
        />
      </FormControl>
    </Stack>
  );
};
export default DashboardSelectSkeleton;

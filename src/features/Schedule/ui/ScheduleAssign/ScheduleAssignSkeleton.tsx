import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { FormControl, InputLabel, Select, Stack } from '@mui/material';
import Button from '@/shared/ui/Button/Button';

const ScheduleAssignSkeleton = () => {
  return (
    <SectionCard title="Назначение заявки в слот расписания">
      <Stack direction="row" spacing={2}>
        <FormControl fullWidth disabled>
          <InputLabel id="schedule-track-select">Трек</InputLabel>
          <Select labelId="schedule-track-select" label="Трек" value="" />
        </FormControl>

        <FormControl fullWidth disabled>
          <InputLabel id="schedule-proposal-select">Заявка</InputLabel>
          <Select labelId="schedule-proposal-select" label="Заявка" value="" />
        </FormControl>

        <FormControl fullWidth disabled>
          <InputLabel id="schedule-time-select">Время</InputLabel>
          <Select labelId="schedule-time-select" label="Время" value="" />
        </FormControl>

        <Button mode="button" variant="contained" size="medium" isDisabled>
          Назначить
        </Button>
      </Stack>
    </SectionCard>
  );
};

export default ScheduleAssignSkeleton;

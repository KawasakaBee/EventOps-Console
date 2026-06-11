import { SettingsValues } from '@/entities/event/api/schema';
import Button from '@/shared/ui/Button/Button';
import { FormControl, Grid, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ISettingsFormProps } from './SettingsForm.types';

const SettingsForm: React.FC<ISettingsFormProps> = ({ isDisabled }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SettingsValues>();

  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <FormControl fullWidth disabled={isDisabled}>
          <TextField
            {...register('title')}
            required
            label="Название"
            placeholder="Введите название события, минимум 10 символов"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        </FormControl>
      </Grid>
      <Grid size={4}>
        <FormControl fullWidth disabled={isDisabled}>
          <TextField
            {...register('place')}
            required
            label="Место проведения"
            placeholder="Введите место проведения события"
            error={!!errors.place}
            helperText={errors.place?.message}
          />
        </FormControl>
      </Grid>
      <Grid size={4}>
        <FormControl fullWidth disabled={isDisabled}>
          <TextField
            {...register('startTime')}
            required
            error={!!errors.startTime}
            helperText={errors.startTime?.message}
            type="datetime-local"
          />
        </FormControl>
      </Grid>
      <Grid size={12}>
        <FormControl fullWidth disabled={isDisabled}>
          <TextField
            {...register('description')}
            required
            label="Описание"
            placeholder="Введите описание события, минимум 30 символов"
            error={!!errors.description}
            helperText={errors.description?.message}
            multiline
          />
        </FormControl>
      </Grid>
      <Grid size={3}>
        <Button
          mode="button"
          variant="contained"
          size="medium"
          type="submit"
          isDisabled={isDisabled}
        >
          Создать
        </Button>
      </Grid>
    </Grid>
  );
};

export default SettingsForm;

import { Controller, useWatch } from 'react-hook-form';
import { IDurationRowProps } from './BasicStep.types';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';
import { formatDurationMap } from '@/entities/proposal/model/dictionaries';
import { styles } from './styles';

const DurationRow: React.FC<IDurationRowProps> = ({ control }) => {
  const format = useWatch({ control, name: 'format' });

  const sx = styles();

  return (
    <Stack spacing={1}>
      <Controller
        name={'duration'}
        control={control}
        render={({ field, fieldState }) => (
          <FormControl fullWidth error={!!fieldState.error} required>
            <InputLabel id={`${'duration'}-label`}>
              {proposalSubmitFieldsDictionary['duration']}
            </InputLabel>
            <Select
              {...field}
              labelId={'duration-label'}
              id={'duration'}
              label={proposalSubmitFieldsDictionary['duration']}
            >
              {formatDurationMap[format].map((duration) => (
                <MenuItem key={duration} value={duration}>
                  {duration} минут
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <Typography variant="caption" sx={sx.durationCaption}>
        Варианты продолжительности для выбранного формата доклада:{' '}
        <b>
          {formatDurationMap[format].map((time) => time + ' минут').join(', ')}
        </b>
      </Typography>
    </Stack>
  );
};

export default DurationRow;

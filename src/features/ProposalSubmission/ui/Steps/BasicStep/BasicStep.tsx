import {
  formatDictionary,
  levelDictionary,
} from '@/entities/proposal/model/dictionaries';
import {
  proposalFormats,
  proposalLevels,
} from '@/entities/proposal/model/types';
import { BasicValues } from '@/features/ProposalSubmission/model/schema';
import { steps } from '@/features/ProposalSubmission/model/steps';
import Button from '@/shared/ui/Button/Button';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { styles } from './styles';
import { useTracksResource } from '@/features/ProposalSubmission/model/resources';
import {
  formatDurationMap,
  submitFieldsDictionary,
} from '@/features/ProposalSubmission/model/dictionary';

const BasicStep = () => {
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<BasicValues>();

  const format = watch('format');
  const { tracks, reFetchTracks } = useTracksResource();

  const isTracksResourceLoaded =
    tracks.status === 'success' || tracks.status === 'error';
  const isTracksError = tracks.status === 'error';
  const isTracksEmpty = tracks.status === 'success' && tracks.data.length === 0;
  const isTracksSelectDisabled =
    !isTracksResourceLoaded || isTracksError || isTracksEmpty;

  const sx = styles();

  const basicInput = (type: keyof BasicValues) => {
    switch (type) {
      case 'format':
        return (
          <Controller
            key={type}
            name={type}
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth error={!!fieldState.error} required>
                <InputLabel id={`${type}-label`}>
                  {submitFieldsDictionary[type]}
                </InputLabel>
                <Select
                  {...field}
                  labelId={`${type}-label`}
                  id={type}
                  label={submitFieldsDictionary[type]}
                  onChange={(event) => {
                    field.onChange(event);

                    const currentDuration = getValues('duration');

                    if (currentDuration === '') return;

                    const isDurationStillAllowed =
                      formatDurationMap[event.target.value].includes(
                        currentDuration,
                      );

                    if (isDurationStillAllowed) return;

                    setValue('duration', '', {
                      shouldDirty: true,
                      shouldTouch: false,
                      shouldValidate: false,
                    });
                  }}
                >
                  {proposalFormats.map((format) => (
                    <MenuItem key={format} value={format}>
                      {formatDictionary[format]}
                    </MenuItem>
                  ))}
                </Select>
                {fieldState.error && (
                  <FormHelperText>{fieldState.error.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );
      case 'duration':
        return (
          <Stack key={type} spacing={1}>
            <Controller
              name={type}
              control={control}
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={!!fieldState.error} required>
                  <InputLabel id={`${type}-label`}>
                    {submitFieldsDictionary[type]}
                  </InputLabel>
                  <Select
                    {...field}
                    labelId={`${type}-label`}
                    id={type}
                    label={submitFieldsDictionary[type]}
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
                {formatDurationMap[format]
                  .map((time) => time + ' минут')
                  .join(', ')}
              </b>
            </Typography>
          </Stack>
        );
      case 'level':
        return (
          <Controller
            key={type}
            name={type}
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth error={!!fieldState.error} required>
                <InputLabel id={`${type}-label`}>
                  {submitFieldsDictionary[type]}
                </InputLabel>
                <Select
                  {...field}
                  labelId={`${type}-label`}
                  id={type}
                  label={submitFieldsDictionary[type]}
                >
                  {proposalLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {levelDictionary[level]}
                    </MenuItem>
                  ))}
                </Select>
                {fieldState.error && (
                  <FormHelperText>{fieldState.error.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );
      case 'trackId':
        return (
          <Controller
            key={type}
            name={type}
            control={control}
            render={({ field, fieldState }) => (
              <Stack spacing={2} sx={sx.tracksWrapper}>
                <FormControl
                  fullWidth
                  error={!!fieldState.error}
                  disabled={isTracksSelectDisabled}
                  required
                >
                  {isTracksResourceLoaded ? (
                    isTracksError ? (
                      <InputLabel id={`${type}-label`} disabled>
                        {tracks.message}
                      </InputLabel>
                    ) : isTracksEmpty ? (
                      <InputLabel id={`${type}-label`} disabled>
                        Нет треков для выбора
                      </InputLabel>
                    ) : (
                      <InputLabel id={`${type}-label`}>
                        {submitFieldsDictionary[type]}
                      </InputLabel>
                    )
                  ) : (
                    <InputLabel id={`${type}-label`} disabled>
                      Загрузка треков
                    </InputLabel>
                  )}
                  <Select
                    {...field}
                    labelId={`${type}-label`}
                    id={type}
                    label={submitFieldsDictionary[type]}
                    disabled={isTracksSelectDisabled}
                  >
                    {isTracksResourceLoaded ? (
                      isTracksError ? (
                        <MenuItem>{tracks.message}</MenuItem>
                      ) : isTracksEmpty ? (
                        <MenuItem>Нет треков для выбора</MenuItem>
                      ) : (
                        tracks.data.map((track) => (
                          <MenuItem key={track.id} value={track.id}>
                            {track.title}
                          </MenuItem>
                        ))
                      )
                    ) : (
                      <MenuItem>Загрузка треков</MenuItem>
                    )}
                  </Select>
                  {fieldState.error && (
                    <FormHelperText>{fieldState.error.message}</FormHelperText>
                  )}
                </FormControl>
                {(isTracksError || isTracksEmpty) && (
                  <Button
                    mode="button"
                    variant="contained"
                    size="small"
                    type="button"
                    onClick={reFetchTracks}
                  >
                    Повторить
                  </Button>
                )}
              </Stack>
            )}
          />
        );

      default:
        return (
          <TextField
            key={type}
            required
            label={submitFieldsDictionary[type]}
            {...register(type)}
            error={!!errors[type]}
            helperText={errors[type]?.message}
          />
        );
    }
  };

  return (
    <Stack spacing={2}>
      {steps.basic.fields.map((field) => basicInput(field))}
    </Stack>
  );
};
export default BasicStep;

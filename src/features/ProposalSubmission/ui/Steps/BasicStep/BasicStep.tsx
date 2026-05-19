import {
  formatDictionary,
  formatDurationMap,
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
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { styles } from './styles';
import { IBasicStepProps } from './BasicStep.types';
import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';
import TitleRow from './TitleRow';
import DurationRow from './DurationRow';

const BasicStep: React.FC<IBasicStepProps> = ({ tracks, reFetchTracks }) => {
  const { register, control, setValue, getValues } =
    useFormContext<BasicValues>();

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
                  {proposalSubmitFieldsDictionary[type]}
                </InputLabel>
                <Select
                  {...field}
                  labelId={`${type}-label`}
                  id={type}
                  label={proposalSubmitFieldsDictionary[type]}
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
        return <DurationRow key={type} control={control} />;
      case 'level':
        return (
          <Controller
            key={type}
            name={type}
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fullWidth error={!!fieldState.error} required>
                <InputLabel id={`${type}-label`}>
                  {proposalSubmitFieldsDictionary[type]}
                </InputLabel>
                <Select
                  {...field}
                  labelId={`${type}-label`}
                  id={type}
                  label={proposalSubmitFieldsDictionary[type]}
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
                        {proposalSubmitFieldsDictionary[type]}
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
                    label={proposalSubmitFieldsDictionary[type]}
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

      default: {
        return <TitleRow key={type} control={control} register={register} />;
      }
    }
  };

  return (
    <Stack spacing={2}>
      {steps.basic.fields.map((field) => basicInput(field))}
    </Stack>
  );
};
export default BasicStep;

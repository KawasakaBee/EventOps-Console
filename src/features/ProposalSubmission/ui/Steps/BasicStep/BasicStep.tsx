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
import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';
import TitleRow from './TitleRow';
import DurationRow from './DurationRow/DurationRow';
import { getApiErrorMessage } from '@/shared/api/getApiErrorMessage';
import { useGetTracksQuery } from '@/entities/track/api/trackApi';
import { useGetEventsQuery } from '@/entities/event/api/eventApi';
import { useGetProposalQuery } from '@/entities/proposal/api/proposalApi';
import { isId } from '@/shared/utils/typeGuards';
import { useParams } from 'next/navigation';
import { skipToken } from '@reduxjs/toolkit/query';

const BasicStep = () => {
  const { register, control, setValue, getValues } =
    useFormContext<BasicValues>();

  const draftId = useParams().id;
  const proposalId = isId(draftId) ? draftId : skipToken;
  const draft = useGetProposalQuery(proposalId, {
    refetchOnMountOrArgChange: true,
  });

  const { data, isLoading, isError, error, refetch } = useGetTracksQuery();
  const events = useGetEventsQuery();

  const isEventsSelectDisabled =
    (proposalId &&
      draft.data &&
      draft.data.proposal.status !== 'draft' &&
      events.isLoading) ||
    events.isError ||
    !events.data ||
    events.data.events.length === 0;
  const isTracksSelectDisabled =
    isLoading || isError || !data || data.tracks.length === 0;

  const sx = styles();

  const basicInput = (type: keyof BasicValues) => {
    switch (type) {
      case 'eventId':
        return (
          <Controller
            key={type}
            name={type}
            control={control}
            render={({ field, fieldState }) => {
              const selectedEventExists = events.data?.events.some(
                (event) => event.id === field.value,
              );
              return (
                <Stack spacing={2} sx={sx.basicStepTracksWrap}>
                  <FormControl
                    fullWidth
                    error={!!fieldState.error}
                    disabled={isEventsSelectDisabled}
                    required
                  >
                    {events.isLoading ? (
                      <InputLabel id={`${type}-label`} disabled>
                        Загрузка событий
                      </InputLabel>
                    ) : events.isError ? (
                      <InputLabel id={`${type}-label`} disabled>
                        {getApiErrorMessage(events.error)}
                      </InputLabel>
                    ) : events.data ? (
                      events.data.events.length === 0 ? (
                        <InputLabel id={`${type}-label`} disabled>
                          Нет событий для выбора
                        </InputLabel>
                      ) : (
                        <InputLabel id={`${type}-label`}>
                          {proposalSubmitFieldsDictionary[type]}
                        </InputLabel>
                      )
                    ) : (
                      <InputLabel id={`${type}-label`}>
                        Не удалось загрузить событие
                      </InputLabel>
                    )}
                    <Select
                      {...field}
                      value={selectedEventExists ? field.value : ''}
                      labelId={`${type}-label`}
                      id={type}
                      label={proposalSubmitFieldsDictionary[type]}
                      disabled={isEventsSelectDisabled}
                    >
                      {events.isLoading ? (
                        <MenuItem>Загрузка событий</MenuItem>
                      ) : events.isError ? (
                        <MenuItem>{getApiErrorMessage(events.error)}</MenuItem>
                      ) : events.data ? (
                        events.data.events.length === 0 ? (
                          <MenuItem>Нет событий для выбора</MenuItem>
                        ) : (
                          events.data.events.map((event) => (
                            <MenuItem key={event.id} value={event.id}>
                              {event.title}
                            </MenuItem>
                          ))
                        )
                      ) : (
                        <MenuItem>Не удалось загрузить событие</MenuItem>
                      )}
                    </Select>
                    {fieldState.error && (
                      <FormHelperText>
                        {fieldState.error.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  {(events.isError ||
                    !events.data ||
                    events.data.events.length === 0) && (
                    <Button
                      mode="button"
                      variant="contained"
                      size="small"
                      type="button"
                      onClick={events.refetch}
                    >
                      Повторить
                    </Button>
                  )}
                </Stack>
              );
            }}
          />
        );
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
              <Stack spacing={2} sx={sx.basicStepTracksWrap}>
                <FormControl
                  fullWidth
                  error={!!fieldState.error}
                  disabled={isTracksSelectDisabled}
                  required
                >
                  {isLoading ? (
                    <InputLabel id={`${type}-label`} disabled>
                      Загрузка треков
                    </InputLabel>
                  ) : isError ? (
                    <InputLabel id={`${type}-label`} disabled>
                      {getApiErrorMessage(error)}
                    </InputLabel>
                  ) : data ? (
                    data.tracks.length === 0 ? (
                      <InputLabel id={`${type}-label`} disabled>
                        Нет треков для выбора
                      </InputLabel>
                    ) : (
                      <InputLabel id={`${type}-label`}>
                        {proposalSubmitFieldsDictionary[type]}
                      </InputLabel>
                    )
                  ) : (
                    <InputLabel id={`${type}-label`}>
                      Не удалось загрузить трек
                    </InputLabel>
                  )}
                  <Select
                    {...field}
                    labelId={`${type}-label`}
                    id={type}
                    label={proposalSubmitFieldsDictionary[type]}
                    disabled={isTracksSelectDisabled}
                  >
                    {isLoading ? (
                      <MenuItem>Загрузка треков</MenuItem>
                    ) : isError ? (
                      <MenuItem>{getApiErrorMessage(error)}</MenuItem>
                    ) : data ? (
                      data.tracks.length === 0 ? (
                        <MenuItem>Нет треков для выбора</MenuItem>
                      ) : (
                        data.tracks.map((track) => (
                          <MenuItem key={track.id} value={track.id}>
                            {track.title}
                          </MenuItem>
                        ))
                      )
                    ) : (
                      <MenuItem>Не удалось загрузить трек</MenuItem>
                    )}
                  </Select>
                  {fieldState.error && (
                    <FormHelperText>{fieldState.error.message}</FormHelperText>
                  )}
                </FormControl>
                {(isError || !data || data.tracks.length === 0) && (
                  <Button
                    mode="button"
                    variant="contained"
                    size="small"
                    type="button"
                    onClick={refetch}
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

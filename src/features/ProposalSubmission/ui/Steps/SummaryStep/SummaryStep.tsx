import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';
import {
  Chip,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useMemo } from 'react';
import { steps } from '@/features/ProposalSubmission/model/steps';
import { SubmitValues } from '@/features/ProposalSubmission/model/schema';
import {
  formatDictionary,
  levelDictionary,
} from '@/entities/proposal/model/dictionaries';
import {
  speakerFields,
  speakerFieldsDictionary,
} from '@/entities/speaker/api/dictionary';
import { getApiErrorMessage } from '@/shared/api/getApiErrorMessage';
import { useGetTracksQuery } from '@/entities/track/api/trackApi';
import { useGetEventsQuery } from '@/entities/event/api/eventApi';
import { styles } from './styles';

const SummaryStep = () => {
  const { getValues } = useFormContext<SubmitValues>();

  const { data, isLoading, isError, error } = useGetTracksQuery();
  const events = useGetEventsQuery();

  const currentEvent = useMemo(
    () =>
      !events.isLoading &&
      !events.isError &&
      events.data &&
      events.data.events.length !== 0
        ? events.data.events.find((event) => event.id === getValues('eventId'))
        : undefined,
    [events.data, getValues, events.isError, events.isLoading],
  );

  const currentTrack = useMemo(
    () =>
      !isLoading && !isError && data && data.tracks.length !== 0
        ? data.tracks.find((track) => track.id === getValues('trackId'))
        : undefined,
    [data, getValues, isError, isLoading],
  );

  const sx = styles();

  return (
    <Stack spacing={3} sx={sx.summaryStep}>
      <Stack spacing={2}>
        <Typography variant="subtitle1">Основное:</Typography>
        <Stack spacing={1}>
          {steps.basic.fields.map((field) =>
            field === 'eventId' ? (
              <Grid key={field} container spacing={0.5}>
                <Grid size={1}>
                  <Typography variant="subtitle2" sx={sx.summaryStepFieldName}>
                    {proposalSubmitFieldsDictionary[field]}:
                  </Typography>
                </Grid>
                <Grid size={11}>
                  {events.isLoading ? (
                    <Skeleton variant="text" width={250} />
                  ) : events.isError ? (
                    <Typography variant="body2">
                      {getApiErrorMessage(events.error)}
                    </Typography>
                  ) : !currentEvent ? (
                    <Typography variant="body2">
                      Не удалось определить событие
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      {currentEvent.title}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            ) : field === 'trackId' ? (
              <Grid key={field} container spacing={0.5}>
                <Grid size={1}>
                  <Typography variant="subtitle2" sx={sx.summaryStepFieldName}>
                    {proposalSubmitFieldsDictionary[field]}:
                  </Typography>
                </Grid>
                <Grid size={11}>
                  {isLoading ? (
                    <Skeleton variant="text" width={250} />
                  ) : isError ? (
                    <Typography variant="body2">
                      {getApiErrorMessage(error)}
                    </Typography>
                  ) : !currentTrack ? (
                    <Typography variant="body2">
                      Не удалось определить трек
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      {currentTrack.title}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            ) : (
              <Grid key={field} container spacing={0.5}>
                <Grid size={1}>
                  <Typography variant="subtitle2" sx={sx.summaryStepFieldName}>
                    {proposalSubmitFieldsDictionary[field]}:
                  </Typography>
                </Grid>
                <Grid size={11}>
                  <Typography variant="body2">
                    {field === 'format'
                      ? formatDictionary[getValues(field)]
                      : field === 'level'
                        ? levelDictionary[getValues(field)]
                        : getValues(field)}
                  </Typography>
                </Grid>
              </Grid>
            ),
          )}
        </Stack>
      </Stack>
      <Divider />
      <Stack spacing={2}>
        <Typography variant="subtitle1">Описание:</Typography>
        <Stack spacing={3}>
          {steps.description.fields.map((field) => (
            <Grid key={field} container columnSpacing={0.5}>
              <Grid size={1}>
                <Typography variant="subtitle2" sx={sx.summaryStepFieldName}>
                  {proposalSubmitFieldsDictionary[field]}:
                </Typography>
              </Grid>
              <Grid size={11}>
                <Typography variant="body2">{getValues(field)}</Typography>
              </Grid>
            </Grid>
          ))}
        </Stack>
      </Stack>
      <Divider />
      <Stack spacing={2}>
        <Typography variant="subtitle1">Спикеры:</Typography>
        <Stack spacing={3}>
          {getValues('speakers').map((speaker, idx) => (
            <Stack key={`${speaker.email}-${idx}`} spacing={1}>
              <Typography variant="h3">
                <b>Спикер - {idx + 1}</b>
              </Typography>
              {speakerFields.map((field) => (
                <Grid key={`${speaker.email}-${field}`} container spacing={0.5}>
                  <Grid size={1}>
                    <Typography
                      variant="subtitle2"
                      sx={sx.summaryStepFieldName}
                    >
                      {speakerFieldsDictionary[field]}:
                    </Typography>
                  </Grid>
                  <Grid size={11}>
                    <Typography variant="body2">
                      {speaker[field] || '–'}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Divider />
      <Stack spacing={2}>
        <Typography variant="subtitle1">Дополнительно:</Typography>
        <Stack spacing={1}>
          {steps.extra.fields.map((field) => {
            if (field === 'consent') return null;

            if (field === 'tags') {
              const tags = getValues(field);

              return (
                tags.length !== 0 && (
                  <Grid key={field} container spacing={0.5}>
                    <Grid size={1}>
                      <Typography
                        variant="subtitle2"
                        sx={sx.summaryStepFieldName}
                      >
                        {proposalSubmitFieldsDictionary[field]}:
                      </Typography>
                    </Grid>
                    <Grid container spacing={1} size={11}>
                      {tags.map((tag) => (
                        <Chip key={tag} label={tag} />
                      ))}
                    </Grid>
                  </Grid>
                )
              );
            }

            const notes = getValues(field);

            return (
              notes && (
                <Grid key={field} container spacing={0.5}>
                  <Grid size={1}>
                    <Typography
                      variant="subtitle2"
                      sx={sx.summaryStepFieldName}
                    >
                      {proposalSubmitFieldsDictionary[field]}:
                    </Typography>
                  </Grid>
                  <Grid size={11}>
                    <Typography variant="body2">{getValues(field)}</Typography>
                  </Grid>
                </Grid>
              )
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};
export default SummaryStep;

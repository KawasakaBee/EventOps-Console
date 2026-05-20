import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';
import { Chip, Skeleton, Stack, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ISummaryStepProps } from './SummaryStep.types';
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

const SummaryStep: React.FC<ISummaryStepProps> = ({ tracks }) => {
  const { getValues } = useFormContext<SubmitValues>();

  const isTracksResourceLoaded =
    tracks.status === 'success' || tracks.status === 'error';
  const isTracksError = tracks.status === 'error';
  const isTracksEmpty = tracks.status === 'success' && tracks.data.length === 0;
  const currentTrack = useMemo(
    () =>
      isTracksResourceLoaded && !isTracksError && !isTracksEmpty
        ? tracks.data.find((track) => track.id === getValues('trackId'))
        : undefined,
    [tracks, getValues, isTracksEmpty, isTracksError, isTracksResourceLoaded],
  );

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="h2">Основное:</Typography>
        <Stack spacing={1}>
          {steps.basic.fields.map((field) =>
            field === 'trackId' ? (
              <Stack key={field} direction="row" spacing={1}>
                <Typography variant="subtitle2">
                  {proposalSubmitFieldsDictionary[field]}:
                </Typography>
                {isTracksResourceLoaded ? (
                  isTracksError ? (
                    <Typography variant="body2">{tracks.message}</Typography>
                  ) : isTracksEmpty || !currentTrack ? (
                    <Typography variant="body2">
                      Не удалось определить трек
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      {currentTrack.title}
                    </Typography>
                  )
                ) : (
                  <Skeleton variant="text" width={250} />
                )}
              </Stack>
            ) : (
              <Stack key={field} direction="row" spacing={1}>
                <Typography variant="subtitle2">
                  {proposalSubmitFieldsDictionary[field]}:
                </Typography>
                <Typography variant="body2">
                  {field === 'format'
                    ? formatDictionary[getValues(field)]
                    : field === 'level'
                      ? levelDictionary[getValues(field)]
                      : getValues(field)}
                </Typography>
              </Stack>
            ),
          )}
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h2">Описание:</Typography>
        <Stack spacing={1}>
          {steps.description.fields.map((field) => (
            <Stack key={field} direction="row" spacing={1}>
              <Typography variant="subtitle2">
                {proposalSubmitFieldsDictionary[field]}:
              </Typography>
              <Typography variant="body2">{getValues(field)}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h2">Спикеры:</Typography>
        <Stack spacing={3}>
          {getValues('speakers').map((speaker, idx) => (
            <Stack key={`${speaker.email}-${idx}`} spacing={1}>
              <Typography variant="h3">
                <b>Спикер - {idx + 1}</b>
              </Typography>
              {speakerFields.map((field) => (
                <Stack
                  key={`${speaker.email}-${field}`}
                  direction="row"
                  spacing={1}
                >
                  <Typography variant="subtitle2">
                    {speakerFieldsDictionary[field]}:
                  </Typography>
                  <Typography variant="body2">
                    {speaker[field] || '–'}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h2">Дополнительно:</Typography>
        <Stack spacing={1}>
          {steps.extra.fields.map((field) => {
            if (field === 'consent') return null;

            if (field === 'tags') {
              const tags = getValues(field);

              return (
                tags.length !== 0 && (
                  <Stack key={field} direction="row" spacing={1}>
                    <Typography variant="subtitle2">
                      {proposalSubmitFieldsDictionary[field]}:
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      {tags.map((tag) => (
                        <Chip key={tag} label={tag} />
                      ))}
                    </Stack>
                  </Stack>
                )
              );
            }

            const notes = getValues(field);

            return (
              notes && (
                <Stack key={field} direction="row" spacing={1}>
                  <Typography variant="subtitle2">
                    {proposalSubmitFieldsDictionary[field]}:
                  </Typography>
                  <Typography variant="body2">{getValues(field)}</Typography>
                </Stack>
              )
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};
export default SummaryStep;

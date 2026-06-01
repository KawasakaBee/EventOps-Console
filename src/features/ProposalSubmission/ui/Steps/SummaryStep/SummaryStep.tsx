import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';
import { Chip, Skeleton, Stack, Typography } from '@mui/material';
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

const SummaryStep = () => {
  const { getValues } = useFormContext<SubmitValues>();

  const { data, isLoading, isError, error } = useGetTracksQuery();

  const currentTrack = useMemo(
    () =>
      !isLoading && !isError && data && data.tracks.length !== 0
        ? data.tracks.find((track) => track.id === getValues('trackId'))
        : undefined,
    [data, getValues, isError, isLoading],
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
                  <Typography variant="body2">{currentTrack.title}</Typography>
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

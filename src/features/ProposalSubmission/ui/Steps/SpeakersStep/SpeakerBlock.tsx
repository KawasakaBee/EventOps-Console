import { useWatch } from 'react-hook-form';
import { ISpeakerBlockProps } from './SpeakersStep.types';
import { speakerFields } from '@/entities/speaker/api/dictionary';
import { Stack, Typography } from '@mui/material';
import EmailRow from './EmailRow';
import SpeakerRow from './SpeakerRow';
import { memo, useCallback, useRef } from 'react';
import { fetchSpeakerFind } from '@/features/ProposalSubmission/api/ProposalSubmissionApi';
import { styles } from './styles';

const SpeakerBlock: React.FC<ISpeakerBlockProps> = memo(
  ({ control, register, getValues, setValue, idx }) => {
    const isReadonly = !!useWatch({
      control,
      name: `speakers.${idx}.id`,
    });

    const lookupRequestIdRef = useRef<Record<number, number>>({});
    const searchTimerRef = useRef<
      Record<number, ReturnType<typeof setTimeout>>
    >({});

    const sx = styles();

    const handleSpeakerSearch = useCallback(
      async (email: string, idx: number) => {
        lookupRequestIdRef.current[idx] =
          (lookupRequestIdRef.current[idx] ?? 0) + 1;

        const requestId = lookupRequestIdRef.current[idx];

        const foundedSpeaker = await fetchSpeakerFind(email);

        if (lookupRequestIdRef.current[idx] !== requestId) return;

        const currentEmail = getValues(`speakers.${idx}.email`);

        if (currentEmail.trim() !== email.trim()) return;

        if (!foundedSpeaker.found) {
          setValue(`speakers.${idx}.id`, null, {
            shouldDirty: true,
            shouldValidate: false,
          });
          return;
        }

        const speaker = foundedSpeaker.speaker;

        const speakerBody = {
          id: speaker.id,
          name: speaker.name,
          email: speaker.email,
          company: speaker.company,
          position: speaker.position,
          bio: speaker.bio,
          links: speaker.contacts,
        };

        setValue(`speakers.${idx}`, speakerBody, {
          shouldDirty: true,
          shouldValidate: true,
        });
      },
      [getValues, setValue],
    );

    const handleSpeakerSearchDebounced = useCallback(
      (value: string, idx: number) => {
        const email = value.trim();

        clearTimeout(searchTimerRef.current[idx]);

        searchTimerRef.current[idx] = setTimeout(() => {
          handleSpeakerSearch(email, idx);
        }, 500);
      },
      [handleSpeakerSearch],
    );

    return (
      <Stack spacing={2}>
        {speakerFields.map((field) => (
          <Stack key={field} spacing={1}>
            {field === 'email' ? (
              <EmailRow
                field={field}
                register={register}
                idx={idx}
                control={control}
                handleSpeakerSearchDebounced={handleSpeakerSearchDebounced}
              />
            ) : (
              <SpeakerRow
                field={field}
                register={register}
                idx={idx}
                control={control}
                isReadonly={isReadonly}
              />
            )}

            {field === 'email' && (
              <Typography variant="caption" sx={sx.emailClue}>
                Вы можете ввести Email спикера для автозаполнения данных.
              </Typography>
            )}
          </Stack>
        ))}
      </Stack>
    );
  },
);

SpeakerBlock.displayName = 'SpeakerBlock';

export default SpeakerBlock;

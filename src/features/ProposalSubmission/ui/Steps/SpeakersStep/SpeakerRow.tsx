import { TextField } from '@mui/material';
import { ISpeakerRowProps } from './SpeakersStep.types';
import { speakerFieldsDictionary } from '@/entities/speaker/api/dictionary';
import { styles } from './styles';
import { useFormState, useWatch } from 'react-hook-form';
import { memo } from 'react';

const SpeakerRow: React.FC<ISpeakerRowProps> = memo(
  ({ field, register, idx, control, isReadonly }) => {
    const fieldName = `speakers.${idx}.${field}` as const;

    const value = useWatch({ control, name: fieldName });
    const { errors } = useFormState({ control, name: fieldName, exact: true });
    const fieldError = errors.speakers?.[idx]?.[field];

    const shouldShrink =
      value !== undefined && value !== null && String(value).length > 0;

    const sx = styles();

    return (
      <TextField
        required={field !== 'links'}
        label={speakerFieldsDictionary[field]}
        {...register(fieldName)}
        error={!!fieldError}
        helperText={fieldError?.message}
        slotProps={{
          inputLabel: shouldShrink ? { shrink: true } : {},
          input: {
            readOnly: isReadonly,
          },
        }}
        sx={sx.speakerTextField}
      />
    );
  },
);

SpeakerRow.displayName = 'SpeakerRow';

export default SpeakerRow;

import { TextField } from '@mui/material';
import { IEmailRowProps } from './SpeakersStep.types';
import { speakerFieldsDictionary } from '@/entities/speaker/api/dictionary';
import { useFormState, useWatch } from 'react-hook-form';
import { styles } from './styles';
import { memo } from 'react';

const EmailRow: React.FC<IEmailRowProps> = memo(
  ({
    field,
    register,
    idx,
    ownerIdx,
    control,
    handleSpeakerSearchDebounced,
  }) => {
    const fieldName = `speakers.${idx}.${field}` as const;

    const registered = register(fieldName);
    const value = useWatch({ control, name: fieldName });
    const { errors } = useFormState({ control, name: fieldName, exact: true });
    const fieldError = errors.speakers?.[idx]?.[field];

    const shouldShrink =
      value !== undefined && value !== null && String(value).length > 0;

    const sx = styles();

    return (
      <TextField
        required
        label={speakerFieldsDictionary[field]}
        {...registered}
        onChange={(event) => {
          registered.onChange(event);

          if (field === 'email') {
            handleSpeakerSearchDebounced(event.currentTarget.value, idx);
          }
        }}
        error={!!fieldError}
        helperText={fieldError?.message}
        slotProps={{
          inputLabel: shouldShrink ? { shrink: true } : {},
          input: {
            readOnly: ownerIdx === idx,
          },
        }}
        sx={sx.speakerTextField}
      />
    );
  },
);

EmailRow.displayName = 'EmailRow';

export default EmailRow;

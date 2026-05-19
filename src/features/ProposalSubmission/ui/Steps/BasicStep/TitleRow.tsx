import { TextField } from '@mui/material';
import { ITitleRowProps } from './BasicStep.types';
import { useFormState, useWatch } from 'react-hook-form';
import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';

const TitleRow: React.FC<ITitleRowProps> = ({ control, register }) => {
  const titleValue = useWatch({ control, name: 'title' });
  const { errors } = useFormState({ control, name: 'title', exact: true });

  const shouldShrink =
    titleValue !== undefined &&
    titleValue !== null &&
    String(titleValue).length > 0;

  return (
    <TextField
      required
      label={proposalSubmitFieldsDictionary['title']}
      {...register('title')}
      error={!!errors['title']}
      helperText={errors['title']?.message}
      slotProps={{ inputLabel: shouldShrink ? { shrink: true } : {} }}
    />
  );
};

export default TitleRow;

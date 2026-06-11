import { TextField } from '@mui/material';
import { INotesRawProps } from './ExtraStep.types';
import { useFormState } from 'react-hook-form';
import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';

const NotesRaw: React.FC<INotesRawProps> = ({ control, register }) => {
  const { errors } = useFormState({ control, name: 'notes', exact: true });

  return (
    <TextField
      label={proposalSubmitFieldsDictionary['notes']}
      {...register('notes')}
      error={!!errors['notes']}
      multiline
      helperText={errors['notes']?.message}
    />
  );
};
export default NotesRaw;

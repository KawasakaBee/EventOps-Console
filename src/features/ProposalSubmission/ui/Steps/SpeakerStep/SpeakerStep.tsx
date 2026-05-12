import { submitFieldsDictionary } from '@/features/ProposalSubmission/model/dictionary';
import { SpeakerValues } from '@/features/ProposalSubmission/model/schema';
import { steps } from '@/features/ProposalSubmission/model/steps';
import { Stack, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const SpeakerStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SpeakerValues>();

  return (
    <Stack spacing={2}>
      {steps.speaker.fields.map((field) => (
        <TextField
          key={field}
          required={field !== 'links'}
          label={submitFieldsDictionary[field]}
          {...register(field)}
          error={!!errors[field]}
          helperText={errors[field]?.message}
        />
      ))}
    </Stack>
  );
};
export default SpeakerStep;

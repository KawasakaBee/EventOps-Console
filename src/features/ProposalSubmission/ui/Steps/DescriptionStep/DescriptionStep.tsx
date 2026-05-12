import { submitFieldsDictionary } from '@/features/ProposalSubmission/model/dictionary';
import { DescriptionValues } from '@/features/ProposalSubmission/model/schema';
import { steps } from '@/features/ProposalSubmission/model/steps';
import { Stack, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const DescriptionStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<DescriptionValues>();

  return (
    <Stack spacing={2}>
      {steps.description.fields.map((field) => (
        <TextField
          key={field}
          required
          label={submitFieldsDictionary[field]}
          {...register(field)}
          error={!!errors[field]}
          helperText={errors[field]?.message}
        />
      ))}
    </Stack>
  );
};
export default DescriptionStep;

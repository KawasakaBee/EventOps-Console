import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';
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
          label={proposalSubmitFieldsDictionary[field]}
          {...register(field)}
          error={!!errors[field]}
          multiline
          helperText={errors[field]?.message}
        />
      ))}
    </Stack>
  );
};
export default DescriptionStep;

import { Skeleton, Stack, Step, StepLabel, Stepper } from '@mui/material';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { submitSteps } from '../../model/steps';

const SubmitStepperSkeleton = () => {
  return (
    <Stack spacing={4}>
      <Stepper>
        {submitSteps.map((step) => (
          <Step key={step}>
            <StepLabel>
              <Skeleton variant="text" width={200} />
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <SectionCard title={null}>
        <Skeleton variant="text" height={80} />
        <Skeleton variant="text" height={80} />
        <Skeleton variant="text" height={80} />
        <Skeleton variant="text" height={80} />
        <Skeleton variant="text" height={80} />
      </SectionCard>
    </Stack>
  );
};
export default SubmitStepperSkeleton;

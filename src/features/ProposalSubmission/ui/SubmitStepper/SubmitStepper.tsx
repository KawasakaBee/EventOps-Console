import { Stack, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';
import Button from '@/shared/ui/Button/Button';
import changeStep from '../../model/changeStep';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import BasicStep from '../Steps/BasicStep/BasicStep';
import DescriptionStep from '../Steps/DescriptionStep/DescriptionStep';
import SpeakerStep from '../Steps/SpeakerStep/SpeakerStep';
import ExtraStep from '../Steps/ExtraStep/ExtraStep';
import SummaryStep from '../Steps/SummaryStep/SummaryStep';
import { useFormContext } from 'react-hook-form';
import { SubmitValues } from '../../model/schema';
import {
  steps,
  stepsNumbersByName,
  SubmitStep,
  submitSteps,
} from '../../model/steps';
import { submitStepsDictionary } from '../../model/dictionary';

const SubmitStepper = () => {
  const { trigger } = useFormContext<SubmitValues>();

  const [activeStep, setActiveStep] = useState<SubmitStep>('basic');
  const activeStepNumber = stepsNumbersByName[activeStep];

  const firstStep = activeStep === 'basic';
  const lastStep = activeStep === 'summary';

  const handleStepBack = () => {
    if (firstStep) return;
    setActiveStep((prev) => changeStep(prev, 'back'));
  };

  const handleStepNext = async () => {
    if (lastStep) return;

    const isStepValid = await trigger(steps[activeStep].fields, {
      shouldFocus: true,
    });
    if (!isStepValid) return;

    setActiveStep((prev) => changeStep(prev, 'next'));
  };

  const sumbissionStep = () => {
    switch (activeStep) {
      case 'description':
        return <DescriptionStep />;
      case 'speaker':
        return <SpeakerStep />;
      case 'extra':
        return <ExtraStep />;
      case 'summary':
        return <SummaryStep />;
      default:
        return <BasicStep />;
    }
  };

  return (
    <Stack spacing={4}>
      <Stepper activeStep={activeStepNumber}>
        {submitSteps.map((step) => (
          <Step key={step}>
            <StepLabel>{submitStepsDictionary[step]}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <SectionCard title={submitStepsDictionary[activeStep]}>
        {sumbissionStep()}
      </SectionCard>
      <Stack direction="row" spacing={2}>
        <Button
          mode="button"
          variant="contained"
          size="medium"
          type="button"
          isDisabled={firstStep}
          onClick={handleStepBack}
        >
          Назад
        </Button>
        {lastStep ? (
          <Button
            mode="button"
            variant="contained"
            size="medium"
            type="button"
            isDisabled
          >
            Отправить
          </Button>
        ) : (
          <Button
            mode="button"
            variant="contained"
            size="medium"
            type="button"
            isDisabled={lastStep}
            onClick={handleStepNext}
          >
            Далее
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
export default SubmitStepper;

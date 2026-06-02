import { useFormContext } from 'react-hook-form';
import { SubmitValues } from './schema';
import { useState } from 'react';
import { steps, stepsNumbersByName, SubmitStep } from './steps';
import changeStep from './changeStep';
import { useRouter } from 'next/navigation';
import { ID } from '@/shared/types/primitives.types';
import { useCreateProposalMutation } from '../api/ProposalSubmissionApi';

const useStepper = (id: ID | null, clearStorage: () => void) => {
  // state
  const router = useRouter();
  const { trigger, getValues } = useFormContext<SubmitValues>();

  const [createProposal, createState] = useCreateProposalMutation();

  const [activeStep, setActiveStep] = useState<SubmitStep>('basic');
  const [isDraftDialogOpened, setIsDraftDialogOpened] =
    useState<boolean>(false);
  const activeStepNumber = stepsNumbersByName[activeStep];

  const firstStep = activeStep === 'basic';
  const lastStep = activeStep === 'summary';

  // handlers

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

  const handleDraftSubmit = async () => {
    if (createState.isSuccess || createState.isLoading) return;

    const formValues = getValues();

    const { duration, ...restValues } = formValues;
    const normalizeDuration = Number(duration);

    const requestBody = {
      ...restValues,
      status: 'draft' as const,
      duration: normalizeDuration,
    };

    await createProposal(requestBody);

    setIsDraftDialogOpened(true);
  };

  const handleDraftDialogClose = () => {
    setIsDraftDialogOpened(false);
  };

  const handleDraftContinue = () => {
    if (createState.data && !id) {
      router.push(`/submit/${createState.data.proposal.id}`);
    }
    clearStorage();
  };

  return {
    activeStep,
    activeStepNumber,
    firstStep,
    lastStep,
    handleStepBack,
    handleStepNext,
    handleDraftSubmit,
    isDraftDialogOpened,
    createState,
    handleDraftDialogClose,
    handleDraftContinue,
  };
};

export default useStepper;

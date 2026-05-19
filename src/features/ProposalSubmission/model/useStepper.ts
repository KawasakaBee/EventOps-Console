import { useFormContext } from 'react-hook-form';
import { SubmitValues } from './schema';
import { useState } from 'react';
import { steps, stepsNumbersByName, SubmitStep } from './steps';
import changeStep from './changeStep';
import { fetchCreateProposal } from '../api/ProposalSubmissionApi';
import { useRouter } from 'next/navigation';
import { SumbitProposalResource } from './types';
import { ID } from '@/shared/types/primitives.types';

const useStepper = (id: ID | null, clearStorage: () => void) => {
  // state
  const router = useRouter();
  const { trigger, getValues } = useFormContext<SubmitValues>();

  const [draft, setDraft] = useState<SumbitProposalResource>({
    status: 'idle',
    data: null,
    errorProps: null,
  });

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
    if (draft.status === 'success') return;

    setDraft({
      status: 'loading',
      data: null,
      errorProps: null,
    });

    const formValues = getValues();

    const createdResource = await fetchCreateProposal(formValues, 'draft', () =>
      setIsDraftDialogOpened(false),
    );

    setDraft(createdResource);
    setIsDraftDialogOpened(true);
  };

  const handleDraftDialogClose = () => {
    setIsDraftDialogOpened(false);
  };

  const handleDraftContinue = () => {
    if (draft.data && !id) {
      router.push(`/submit/${draft.data.id}`);
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
    draft,
    handleDraftDialogClose,
    handleDraftContinue,
  };
};

export default useStepper;

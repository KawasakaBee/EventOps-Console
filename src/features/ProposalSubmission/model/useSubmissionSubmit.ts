import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SubmitValues } from './schema';
import { ID } from '@/shared/types/primitives.types';
import { isId } from '@/shared/utils/typeGuards';
import {
  useChangeProposalMutation,
  useCreateProposalMutation,
} from '../api/ProposalSubmissionApi';

const useSubmissionSubmit = (
  methods: UseFormReturn<SubmitValues>,
  draftId: unknown,
  deleteFormFromStorage: () => void,
  clearAutosaveTimer: () => void,
) => {
  // state
  const router = useRouter();
  const { getValues } = methods;

  const [isSubmitDialogOpened, setIsSubmitDialogOpened] =
    useState<boolean>(false);

  const [createProposal, createState] = useCreateProposalMutation();
  const [changeProposal, changeState] = useChangeProposalMutation();

  //  handlers

  const handleFormSubmit = async () => {
    if (createState.isSuccess || changeState.isSuccess) return;

    clearAutosaveTimer();
    setIsSubmitDialogOpened(false);

    const formValues = getValues();

    const { duration, ...restValues } = formValues;
    const normalizeDuration = Number(duration);

    const requestBody = {
      ...restValues,
      status: 'submitted' as const,
      duration: normalizeDuration,
    };

    if (draftId && isId(draftId)) {
      await changeProposal({
        id: draftId,
        payload: requestBody,
      });

      setIsSubmitDialogOpened(true);

      return;
    }

    const response = await createProposal(requestBody);

    setIsSubmitDialogOpened(true);

    if (response.error) return;

    deleteFormFromStorage();
  };

  const handleSubmitDialogClose = () => {
    if (createState.isSuccess || changeState.isSuccess) return;

    setIsSubmitDialogOpened(false);
  };

  const handleRedirectToProposals = (id: ID) => {
    router.push(`/proposals/${id}`);
  };

  return {
    createState,
    changeState,
    isSubmitDialogOpened,
    handleFormSubmit,
    handleSubmitDialogClose,
    handleRedirectToProposals,
  };
};

export default useSubmissionSubmit;

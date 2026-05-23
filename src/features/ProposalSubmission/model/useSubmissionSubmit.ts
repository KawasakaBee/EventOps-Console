import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  fetchChangeProposal,
  fetchCreateProposal,
} from '../api/ProposalSubmissionApi';
import { SubmitValues } from './schema';
import { ID } from '@/shared/types/primitives.types';
import { isId } from '@/shared/utils/typeGuards';
import { SubmitProposalResource } from './types';

const useSubmissionSubmit = (
  methods: UseFormReturn<SubmitValues>,
  draftId: unknown,
  deleteFormFromStorage: () => void,
) => {
  const router = useRouter();
  const { getValues } = methods;

  const [isSubmitDialogOpened, setIsSubmitDialogOpened] =
    useState<boolean>(false);

  const [submitData, setSubmitData] = useState<SubmitProposalResource>({
    status: 'idle',
    data: null,
    errorProps: null,
  });

  const handleFormSubmit = async () => {
    if (submitData.status === 'success') return;

    setIsSubmitDialogOpened(false);
    setSubmitData({
      status: 'loading',
      data: null,
      errorProps: null,
    });

    const formValues = getValues();

    if (draftId && isId(draftId)) {
      const response = await fetchChangeProposal(
        formValues,
        'submitted',
        draftId,
        () => setIsSubmitDialogOpened(false),
      );

      if (response === null) return;

      setSubmitData(response);
      setIsSubmitDialogOpened(true);

      return;
    }

    const response = await fetchCreateProposal(
      formValues,
      'submitted',
      handleFormSubmit,
    );

    deleteFormFromStorage();
    setSubmitData(response);
    setIsSubmitDialogOpened(true);
  };

  const handleSubmitDialogClose = () => {
    if (submitData.status === 'success') return;

    setIsSubmitDialogOpened(false);
  };

  const handleRedirectToProposals = (id: ID) => {
    router.push(`/proposals/${id}`);
  };

  return {
    handleFormSubmit,
    isSubmitDialogOpened,
    handleSubmitDialogClose,
    submitData,
    handleRedirectToProposals,
  };
};

export default useSubmissionSubmit;

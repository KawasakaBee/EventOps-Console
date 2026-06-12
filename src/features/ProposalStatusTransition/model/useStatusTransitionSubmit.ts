import { useRef, useState } from 'react';
import { StatusTransitionSubmitProps } from './types';
import { useChangeStatusMutation } from '../api/proposalStatusTransitionApi';
import { PatchProposalStatusRequest } from '@/entities/proposal/api/schema';

const useStatusTransitionSubmit = (props: StatusTransitionSubmitProps) => {
  // state
  const [changeStatus, changeState] = useChangeStatusMutation();

  const [reasonValue, setReasonValue] = useState<string>('');
  const [reasonError, setReasonError] = useState<boolean>(false);

  const reasonInputRef = useRef<HTMLInputElement | null>(null);

  const { nextStatus } = props;

  const isMustHaveReason =
    (nextStatus && nextStatus === 'changes_requested') ||
    nextStatus === 'rejected';

  const isReasonInvalid = isMustHaveReason && reasonValue.trim().length === 0;

  //  handlers

  const handleStatusChange = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isReasonInvalid) {
      setReasonError(true);
      reasonInputRef.current?.focus();
      return;
    }

    const { nextStatus } = props;
    const requestBody: PatchProposalStatusRequest = {
      status: nextStatus,
      reason: isMustHaveReason ? reasonValue : undefined,
    };

    if (props.mode === 'single') {
      await changeStatus({
        id: props.proposalId,
        payload: requestBody,
      }).unwrap();
      return;
    }

    if (props.mode === 'multiple') {
      const { onSuccess } = props;

      const requests = props.proposalIds.map(async (proposalId) => {
        try {
          const data = await changeStatus({
            id: proposalId,
            payload: requestBody,
          }).unwrap();

          return {
            status: 'fulfilled' as const,
            proposalId,
            data,
          };
        } catch (error) {
          return {
            status: 'rejected' as const,
            proposalId,
            error,
          };
        }
      });

      const results = await Promise.all(requests);

      const failedCount = results.flatMap((result) =>
        result.status === 'rejected'
          ? [{ id: result.proposalId, error: result.error }]
          : [],
      ).length;

      onSuccess(failedCount);
    }
  };

  const handleReasonValueChange = (value: string) => {
    setReasonValue(value);

    if (reasonError) {
      setReasonError(false);
    }
  };

  return {
    changeState,
    reasonValue,
    reasonError,
    isMustHaveReason,
    reasonInputRef,
    handleStatusChange,
    handleReasonValueChange,
  };
};

export default useStatusTransitionSubmit;

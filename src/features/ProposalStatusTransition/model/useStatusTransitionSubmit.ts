import { useRef, useState } from 'react';
import { DialogResource, StatusTransitionSubmitProps } from './types';
import { patchProposalStatusChange } from '../api/proposalStatusTransitionApi';

const useStatusTransitionSubmit = (props: StatusTransitionSubmitProps) => {
  // state
  const [dialog, setDialog] = useState<DialogResource>({
    status: 'idle',
    errorProps: null,
  });
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
    if (dialog.status === 'loading') return;

    event.preventDefault();

    if (isReasonInvalid) {
      setReasonError(true);
      reasonInputRef.current?.focus();
      return;
    }

    setDialog({
      status: 'loading',
      errorProps: null,
    });

    const DialogResource = await patchProposalStatusChange(
      props,
      isMustHaveReason,
      reasonValue,
    );
    setDialog(DialogResource);
  };

  const handleReasonValueChange = (value: string) => {
    if (dialog.status === 'loading') return;

    setReasonValue(value);

    if (reasonError) {
      setReasonError(false);
    }
  };

  return {
    dialog,
    reasonValue,
    reasonError,
    isMustHaveReason,
    reasonInputRef,
    handleStatusChange,
    handleReasonValueChange,
  };
};

export default useStatusTransitionSubmit;

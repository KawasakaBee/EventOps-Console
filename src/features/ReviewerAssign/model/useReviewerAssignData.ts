import { ID } from '@/shared/types/primitives.types';
import { useMemo, useRef, useState } from 'react';
import { AssignReviewerProps } from './types';
import { useGetReviewersQuery } from '@/entities/reviewer/api/reviewerApi';
import { useAssignReviewerMutation } from '../api/reviewerAssignApi';

const useReviewerAssignData = (props: AssignReviewerProps) => {
  // state

  const reviewers = useGetReviewersQuery();
  const [assignReviewer, assignState] = useAssignReviewerMutation();

  const [currentReviewer, setCurrentReviewer] = useState<{
    label: string;
    id: ID;
  } | null>(null);
  const [emptyReviewerError, setEmptyReviewerError] = useState<string>('');

  const autocompleteAnchor = useRef<HTMLInputElement | null>(null);

  const reviewersOptions = useMemo(
    () =>
      (reviewers.data?.reviewers ?? [])
        .filter((reviewer) =>
          props.eventIds.every((eventId) =>
            reviewer.eventIds.includes(eventId),
          ),
        )
        .map((item) => ({
          label: item.name,
          id: item.id,
        })),
    [reviewers.data, props.eventIds],
  );

  // handlers

  const handleReviewerSet = (reviewerId: ID | undefined) => {
    const reviewer = reviewersOptions.find((item) => item.id === reviewerId);

    if (reviewer) {
      setEmptyReviewerError('');
    }

    setCurrentReviewer(reviewer ?? null);
  };

  const handleReviewerAssign = async () => {
    if (!currentReviewer) {
      autocompleteAnchor.current?.focus();
      setEmptyReviewerError('Выберите ревьюера');
      return;
    }
    if (props.mode === 'single') {
      await assignReviewer({
        id: props.proposalId,
        payload: { reviewerId: currentReviewer.id },
      }).unwrap();
      return;
    }

    if (props.mode === 'multiple') {
      const { onSuccess } = props;

      const requests = props.proposalIds.map(async (proposalId) => {
        try {
          const data = await assignReviewer({
            id: proposalId,
            payload: { reviewerId: currentReviewer.id },
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

  const handleCloseDialog = (onClose: () => void) => {
    onClose();
  };

  return {
    reviewers,
    reviewersOptions,
    currentReviewer,
    autocompleteAnchor,
    emptyReviewerError,
    handleReviewerSet,
    handleReviewerAssign,
    assignState,
    handleCloseDialog,
  };
};

export default useReviewerAssignData;

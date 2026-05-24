import { fetchReviewers } from '@/entities/reviewer/api/reviewerApi';
import { ReviewersResource } from '@/entities/reviewer/api/types';
import { ID } from '@/shared/types/primitives.types';
import toLoadableResource from '@/shared/utils/toLoadableResource';
import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchReviewerAssign } from '../api/ReviewerAssignApi';
import { AssignResource, AssignReviewerProps } from './types';

const useReviewerAssignData = (props: AssignReviewerProps) => {
  // state
  const [reviewers, setReviewers] = useState<ReviewersResource>({
    status: 'loading',
    data: [],
  });
  const [assignData, setAssignData] = useState<AssignResource>({
    status: 'idle',
    errorProps: null,
  });

  const [currentReviewer, setCurrentReviewer] = useState<{
    label: string;
    id: ID;
  } | null>(null);
  const [emptyReviewerError, setEmptyReviewerError] = useState<string>('');

  const mountedRef = useRef(false);
  const versionRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const autocompleteAnchor = useRef<HTMLInputElement | null>(null);

  const reviewersOptions = useMemo(
    () => reviewers.data.map((item) => ({ label: item.name, id: item.id })),
    [reviewers.data],
  );

  const reviewersToResource = toLoadableResource(
    reviewers.status,
    reviewersOptions,
    'Не удалось загрузить список ревьюверов',
  );

  const abortRequest = () => {
    abortRef.current?.abort();
    abortRef.current = null;
  };

  // useEffect

  useEffect(() => {
    const getReviewers = async () => {
      const reviewersResource = await fetchReviewers();

      if (!mountedRef.current) return;

      setReviewers(reviewersResource);
    };

    getReviewers();
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

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

    abortRequest();

    const saveVersion = ++versionRef.current;
    const controller = new AbortController();
    abortRef.current = controller;

    setAssignData({
      status: 'loading',
      errorProps: null,
    });

    const response = await fetchReviewerAssign(
      props,
      currentReviewer.id,
      handleReviewerAssign,
      controller.signal,
    );

    if (abortRef.current === controller) {
      abortRef.current = null;
    }

    if (!mountedRef.current) return;
    if (saveVersion !== versionRef.current) return;

    if (response === null) return;

    setAssignData(response);
  };

  const handleCloseDialog = (onClose: () => void) => {
    onClose();
    setAssignData({
      status: 'idle',
      errorProps: null,
    });
  };

  return {
    reviewers: reviewersToResource,
    assignData,
    currentReviewer,
    autocompleteAnchor,
    emptyReviewerError,
    handleReviewerSet,
    handleReviewerAssign,
    handleCloseDialog,
  };
};

export default useReviewerAssignData;

import { useEffect, useRef, useState } from 'react';
import { CreateReviewResource } from './types';
import { fetchReviewCreate } from '../api/ReviewCreateApi';
import { UseFormGetValues } from 'react-hook-form';
import { CreateReviewValues } from './schema';
import { ID } from '@/shared/types/primitives.types';
import { PostCreateReviewResponse } from '@/entities/proposal/api/contracts';

const useCreateReviewData = (
  getValues: UseFormGetValues<CreateReviewValues>,
  proposalId: ID,
  onSuccess: (result: PostCreateReviewResponse) => void,
) => {
  // state
  const [createReviewData, setCreateReviewData] =
    useState<CreateReviewResource>({
      status: 'idle',
      data: null,
      errorProps: null,
    });

  const mountedRef = useRef(false);
  const versionRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const abortRequest = () => {
    abortRef.current?.abort();
    abortRef.current = null;
  };

  // useEffect
  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  // handlers

  const handleCreateReviewSubmit = async () => {
    setCreateReviewData({
      status: 'loading',
      data: null,
      errorProps: null,
    });

    abortRequest();
    const saveVersion = ++versionRef.current;
    const controller = new AbortController();
    abortRef.current = controller;

    const fields = getValues();

    const response = await fetchReviewCreate(
      proposalId,
      fields,
      handleCreateReviewSubmit,
      controller.signal,
    );

    if (!mountedRef.current) return;
    if (saveVersion !== versionRef.current) return;

    if (abortRef.current === controller) {
      abortRef.current = null;
    }

    if (response === null) return;

    setCreateReviewData(response);

    if (response.data) {
      onSuccess(response.data);
    }
  };

  return { createReviewData, handleCreateReviewSubmit };
};

export default useCreateReviewData;

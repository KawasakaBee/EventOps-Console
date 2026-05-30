import { UseFormGetValues } from 'react-hook-form';
import { AddCommentValues } from './schema';
import { useEffect, useRef, useState } from 'react';
import { AddCommentResource } from './types';
import { fetchCommentAdd } from '../api/CommentAddApi';
import { ID } from '@/shared/types/primitives.types';
import { PostCreateCommentResponse } from '@/entities/proposal/api/contracts';

const useCommentAddData = (
  proposalId: ID,
  getValues: UseFormGetValues<AddCommentValues>,
  onSubmit: (comment: string) => string,
  onError: (tempId: ID) => void,
  onSuccess: (result: PostCreateCommentResponse, tempId: ID) => void,
) => {
  // state
  const [addCommentData, setAddCommentData] = useState<AddCommentResource>({
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
      abortRequest();
      mountedRef.current = false;
    };
  }, []);

  // handlers

  const handleAddCommentSubmit = async () => {
    setAddCommentData({
      status: 'loading',
      data: null,
      errorProps: null,
    });

    abortRequest();
    const saveVersion = ++versionRef.current;
    const controller = new AbortController();
    abortRef.current = controller;

    const fields = getValues();
    const tempId = onSubmit(fields.message);

    const response = await fetchCommentAdd(
      proposalId,
      fields,
      handleAddCommentSubmit,
      controller.signal,
    );

    if (!mountedRef.current) {
      onError(tempId);
      return;
    }
    if (saveVersion !== versionRef.current) {
      onError(tempId);
      return;
    }

    if (abortRef.current === controller) {
      abortRef.current = null;
    }

    if (response === null) {
      onError(tempId);
      return;
    }

    setAddCommentData(response);

    if (response.data) {
      onSuccess(response.data, tempId);
    } else {
      onError(tempId);
    }
  };

  return { addCommentData, handleAddCommentSubmit };
};

export default useCommentAddData;

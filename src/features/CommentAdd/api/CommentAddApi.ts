import { ID } from '@/shared/types/primitives.types';
import { AddCommentValues } from '../model/schema';
import { AddCommentResource } from '../model/types';
import { normalizeFetch } from '@/shared/api/normalizeResponse';
import { PostCreateCommentResponse } from '@/entities/proposal/api/contracts';
import getAddCommentErrorState from '../model/getAddCommentErrorState';

export const fetchCommentAdd = async (
  id: ID,
  payload: AddCommentValues,
  retry: () => void,
  signal?: AbortSignal,
): Promise<AddCommentResource | null> => {
  const getErrorActions = () => ({
    retry,
  });

  const addComment: AddCommentResource = {
    status: 'loading',
    data: null,
    errorProps: null,
  };

  const response = await normalizeFetch<PostCreateCommentResponse>(
    `/api/proposals/${id}/comments`,
    { method: 'POST', body: JSON.stringify(payload), signal },
  );

  if (!response.ok && response.error.code === 'REQUEST_ABORTED') {
    return null;
  }

  if (!response.ok) {
    addComment.status = 'error';
    addComment.errorProps = getAddCommentErrorState(
      response.error,
      getErrorActions(),
    );
    return addComment;
  }

  addComment.status = 'success';
  addComment.data = response.data;
  return addComment;
};

import { normalizeFetch } from '@/shared/api/normalizeResponse';
import { GetCommentsResponse } from './contracts';
import { CommentsResource } from './types';

export const fetchComments = async (): Promise<CommentsResource> => {
  const comments: CommentsResource = {
    status: 'loading',
    data: [],
  };

  const response = await normalizeFetch<GetCommentsResponse>('/api/comments');

  if (!response.ok) {
    comments.status = 'error';
    return comments;
  }

  comments.data = response.data.comments;
  comments.status = 'success';
  return comments;
};

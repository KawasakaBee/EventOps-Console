import { TagsResource } from './types';
import { GetTagsResponse } from './contracts';
import { normalizeFetch } from '@/shared/api/normalizeResponse';

export const fetchTags = async (): Promise<TagsResource> => {
  const tags: TagsResource = {
    status: 'loading',
    data: [],
  };

  const response = await normalizeFetch<GetTagsResponse>('/api/tags');

  if (!response.ok) {
    tags.status = 'error';
    return tags;
  }

  tags.data = response.data.tags;
  tags.status = 'success';
  return tags;
};

import { fetchWithDemoAuth } from '@/entities/user/api/fetchWithDemoAuth';
import normalizeResponse from '@/shared/api/normalizeResponse';
import { TagsResource } from './types';
import { GetTagsResponse } from './contracts';

export const fetchTags = async (): Promise<TagsResource> => {
  const tags: TagsResource = {
    status: 'loading',
    data: [],
  };

  const response = await fetchWithDemoAuth('/api/tags');

  if (!response.ok) {
    tags.status = 'error';
    return tags;
  }

  const result = await normalizeResponse<GetTagsResponse>(response.data);

  if (!result.ok) {
    tags.status = 'error';
    return tags;
  }

  tags.data = result.data.tags;
  tags.status = 'success';
  return tags;
};

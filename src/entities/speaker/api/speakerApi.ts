import { fetchWithDemoAuth } from '@/entities/user/api/fetchWithDemoAuth';
import normalizeResponse from '../../../shared/api/normalizeResponse';
import { SpeakersResource } from '../model/types';
import { GetSpeakersListResponse } from './contracts';

export const fetchSpeakers = async (): Promise<SpeakersResource> => {
  const speakers: SpeakersResource = {
    status: 'loading',
    data: [],
  };

  const response = await fetchWithDemoAuth('/api/speakers');

  if (!response.ok) {
    speakers.status = 'error';
    return speakers;
  }

  const result = await normalizeResponse<GetSpeakersListResponse>(
    response.data,
  );

  if (!result.ok) {
    speakers.status = 'error';
    return speakers;
  }

  speakers.data = result.data.speakers;
  speakers.status = 'success';
  return speakers;
};

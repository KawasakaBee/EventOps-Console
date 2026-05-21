import { normalizeFetch } from '@/shared/api/normalizeResponse';
import { SpeakersResource } from '../model/types';
import { GetSpeakersListResponse } from './contracts';

export const fetchSpeakers = async (): Promise<SpeakersResource> => {
  const speakers: SpeakersResource = {
    status: 'loading',
    data: [],
  };

  const response =
    await normalizeFetch<GetSpeakersListResponse>('/api/speakers');

  if (!response.ok) {
    speakers.status = 'error';
    return speakers;
  }

  speakers.data = response.data.speakers;
  speakers.status = 'success';
  return speakers;
};

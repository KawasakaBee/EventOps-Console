import { GetTracksResponse } from '@/entities/track/api/contracts';
import { TracksResource } from './types';
import { normalizeFetch } from '@/shared/api/normalizeResponse';

export const fetchTracks = async (): Promise<TracksResource> => {
  const tracks: TracksResource = {
    status: 'loading',
    data: [],
  };

  const response = await normalizeFetch<GetTracksResponse>('/api/tracks');

  if (!response.ok) {
    tracks.status = 'error';
    return tracks;
  }

  tracks.data = response.data.tracks;
  tracks.status = 'success';
  return tracks;
};

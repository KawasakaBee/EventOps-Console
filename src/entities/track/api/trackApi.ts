import { GetTracksResponse } from '@/entities/track/api/contracts';
import { fetchWithDemoAuth } from '@/shared/api/fetchWithDemoAuth';
import normalizeResponse from '@/shared/api/normalizeResponse';
import { TracksResource } from '@/shared/types/resource.types';

export const fetchTracks = async (): Promise<TracksResource> => {
  const tracks: TracksResource = {
    status: 'loading',
    data: [],
  };

  const response = await fetchWithDemoAuth('/api/tracks');

  if (!response.ok) {
    tracks.status = 'error';
    return tracks;
  }

  const result = await normalizeResponse<GetTracksResponse>(response.data);

  if (!result.ok) {
    tracks.status = 'error';
    return tracks;
  }

  tracks.data = result.data.tracks;
  tracks.status = 'success';
  return tracks;
};

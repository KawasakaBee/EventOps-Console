import { isRole } from '@/shared/utils/typeGuards';
import { http, HttpResponse } from 'msw';
import { userError } from '../db/errors';
import { tracks } from '../db/track';
import { GetTracksResponse } from '@/shared/api/contracts/track.contract';
import { Track } from '@/entities/track/model/types';

export const trackHandlers = [
  http.get('/api/tracks', ({ request }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');

    if (!userId || !isRole(userRole)) return userError;

    const response: GetTracksResponse = {
      tracks: structuredClone(tracks) satisfies Track[],
    };

    return HttpResponse.json(response);
  }),
];

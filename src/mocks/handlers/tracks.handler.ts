import { http, HttpResponse } from 'msw';
import { tracks } from '../db/tracks';
import { GetTracksResponse } from '@/entities/track/api/contracts';
import { Track } from '@/entities/track/model/types';
import { userError } from '../utils/httpErrors';
import { isRole } from '@/entities/user/model/typeGuards';

export const trackHandlers = [
  http.get('/api/tracks', ({ request }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');

    if (!userId || !isRole(userRole)) return userError();

    const response: GetTracksResponse = {
      tracks: structuredClone(tracks) satisfies Track[],
    };

    return HttpResponse.json(response);
  }),
];

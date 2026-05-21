import { http, HttpResponse } from 'msw';
import { tracks } from '../db/tracks';
import { GetTracksResponse } from '@/entities/track/api/contracts';
import { Track } from '@/entities/track/model/types';
import { unauthorizedError } from '../utils/httpErrors';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { getUserById } from '@/entities/user/lib/userSelectors';

export const tracksHandlers = [
  http.get('/api/tracks', ({ cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    const response: GetTracksResponse = {
      tracks: structuredClone(tracks) satisfies Track[],
    };

    return HttpResponse.json(response);
  }),
];

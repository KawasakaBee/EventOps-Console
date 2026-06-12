import { http, HttpResponse } from 'msw';
import {
  forbiddenError,
  unauthorizedError,
  userError,
} from '../utils/httpErrors';
import {
  GetSpeakerFindResponse,
  GetSpeakerItemResponse,
} from '@/entities/speaker/api/contracts';
import { getSpeakerByEmail } from '../utils/proposalSelectors';
import { AUTH_SESSION_COOKIE } from '@/shared/config/layout';
import { getUserById } from '@/entities/user/lib/userSelectors';
import { getSpeakerById } from '@/entities/speaker/lib/speakerSelectors';

export const speakersHandlers = [
  http.get('/api/speaker', ({ cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    if (!user.speakerId || user.role !== 'speaker') return forbiddenError();

    const speaker = getSpeakerById(user.speakerId);

    if (!speaker) return userError();

    const response: GetSpeakerItemResponse = {
      speaker: {
        id: speaker.id,
        name: speaker.name,
        email: speaker.email,
        company: speaker.company,
        position: speaker.position,
        bio: speaker.bio,
        contacts: speaker.contacts,
      },
    };

    return HttpResponse.json(response);
  }),
  http.get('/api/speakers/find', async ({ request, cookies }) => {
    const userId = cookies[AUTH_SESSION_COOKIE];
    const user = getUserById(userId);

    if (!user) return unauthorizedError();

    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (!email || email === '') return userError();

    const foundedSpeaker = getSpeakerByEmail(email);

    const response: GetSpeakerFindResponse = foundedSpeaker
      ? {
          found: true,
          speaker: foundedSpeaker,
        }
      : {
          found: false,
          speaker: null,
        };

    return HttpResponse.json(response);
  }),
];

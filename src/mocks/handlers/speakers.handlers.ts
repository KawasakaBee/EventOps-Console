import { http, HttpResponse } from 'msw';
import { userError } from '../utils/httpErrors';
import { isRole } from '@/entities/user/model/typeGuards';
import {
  GetSpeakerFindResponse,
  GetSpeakersListResponse,
} from '@/entities/speaker/api/contracts';
import { speakers } from '../db/speakers';
import { getSpeakerByEmail } from '../utils/proposalSelectors';

export const speakersHandlers = [
  http.get('/api/speakers', ({ request }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');

    if (!userId || !isRole(userRole)) return userError();

    const response: GetSpeakersListResponse = {
      speakers: speakers.map((s) => ({
        id: s.id,
        name: s.name,
        email: s.email,
        company: s.company,
        position: s.position,
        bio: s.bio,
        contacts: s.contacts,
      })),
    };

    return HttpResponse.json(response);
  }),
  http.get('/api/speakers/find', async ({ request }) => {
    const userId = request.headers.get('x-demo-user-id');
    const userRole = request.headers.get('x-demo-user-role');

    if (!userId || !isRole(userRole)) return userError();

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

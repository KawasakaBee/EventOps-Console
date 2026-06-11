import { Event } from '../model/types';

export interface GetEventsListResponse {
  events: Event[];
}

export interface PostEventCreateResponse {
  ok: true;
  event: Event;
}

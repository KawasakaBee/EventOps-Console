import { Event } from '@/entities/event/model/types';
import { tracks } from './tracks';

const initialEvents = [
  {
    id: '1',
    title: 'Test conf',
    description: 'Test conf description',
    place: 'Moscow',
    trackIds: tracks.map((track) => track.id),
    startTime: '2026-04-21T07:00:00.00Z',
    createdAt: '2026-04-21T07:00:00.00Z',
  },
] satisfies Event[];

export const events: Event[] = [...initialEvents];

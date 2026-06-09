import { Event } from '@/entities/event/model/types';
import { tracks } from './tracks';

const initialEvents = [
  {
    id: '1',
    title: 'Frontend Platform Summit 2026',
    description:
      'Практическая конференция о frontend-платформах, дизайн-системах, производительности, доступности и развитии инженерных команд.',
    place: 'Helsinki, Finland',
    trackIds: tracks.map((track) => track.id),
    startTime: '2026-04-21T07:00:00.00Z',
    createdAt: '2026-01-10T09:00:00.00Z',
  },
  {
    id: '2',
    title: 'API & Cloud Reliability Forum',
    description:
      'Событие для инженеров, которые проектируют REST API, интеграции, облачную инфраструктуру, observability и надёжные backend-сервисы.',
    place: 'Berlin, Germany',
    trackIds: tracks.map((track) => track.id),
    startTime: '2026-05-12T07:00:00.00Z',
    createdAt: '2026-02-05T09:00:00.00Z',
  },
  {
    id: '3',
    title: 'Product Analytics & UX Conference',
    description:
      'Конференция о продуктовой разработке, UX research, аналитике, принятии решений и связке инженерных метрик с пользовательской ценностью.',
    place: 'Amsterdam, Netherlands',
    trackIds: tracks.map((track) => track.id),
    startTime: '2026-06-16T07:00:00.00Z',
    createdAt: '2026-03-01T09:00:00.00Z',
  },
  {
    id: '4',
    title: 'AI DataOps Summit',
    description:
      'Событие о production-подходах к AI, LLM, data engineering, мониторингу моделей и внедрению AI-функций в B2B-продукты.',
    place: 'Warsaw, Poland',
    trackIds: tracks.map((track) => track.id),
    startTime: '2026-09-08T07:00:00.00Z',
    createdAt: '2026-04-02T09:00:00.00Z',
  },
] satisfies Event[];

export const events: Event[] = [...initialEvents];

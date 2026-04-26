import { Track } from '@/entities/track/model/types';

export const initialTracks = [
  {
    id: '1',
    title: 'Frontend Platform',
    description:
      'React, TypeScript, архитектура frontend-приложений и UI-инфраструктура.',
    order: 1,
  },
  {
    id: '2',
    title: 'Backend & API',
    description:
      'REST API, контракты, интеграции, хранение данных и серверная архитектура.',
    order: 2,
  },
  {
    id: '3',
    title: 'DevOps & Cloud',
    description: 'CI/CD, Docker, инфраструктура, observability и эксплуатация.',
    order: 3,
  },
  {
    id: '4',
    title: 'Product & UX',
    description:
      'Продуктовая разработка, UX, аналитика, процессы и управление.',
    order: 4,
  },
  {
    id: '5',
    title: 'AI & Data',
    description: 'AI, LLM, data engineering, ML и прикладная работа с данными.',
    order: 5,
  },
] satisfies Track[];

export const tracks: Track[] = [...initialTracks];

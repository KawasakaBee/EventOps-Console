import { ProposalFormat } from '@/entities/proposal/model/types';
import type { SubmitStep, SubmitStepsName } from './steps';
import type { SubmitField } from './types';

export const formatDurationMap: Record<ProposalFormat, readonly string[]> = {
  talk: ['30', '45'],
  workshop: ['90', '120'],
  lightning: ['10'],
};

export const submitStepsDictionary: Record<SubmitStep, SubmitStepsName> = {
  basic: 'Основное',
  description: 'Описание',
  speaker: 'Спикер',
  extra: 'Дополнительно',
  summary: 'Итого',
};

export type SubmitFieldsName =
  | 'Название'
  | 'Формат'
  | 'Продолжительность, мин'
  | 'Уровень'
  | 'Трек'
  | 'Описание доклада'
  | 'Ключевые выводы'
  | 'Целевая аудитория'
  | 'Требования'
  | 'Имя'
  | 'Email'
  | 'Компания'
  | 'Должность'
  | 'О себе'
  | 'Ссылки'
  | 'Тэги'
  | 'Дополнение'
  | 'Согласие';

export const submitFieldsDictionary: Record<SubmitField, SubmitFieldsName> = {
  title: 'Название',
  format: 'Формат',
  duration: 'Продолжительность, мин',
  level: 'Уровень',
  trackId: 'Трек',
  abstract: 'Описание доклада',
  takeaways: 'Ключевые выводы',
  targetAudience: 'Целевая аудитория',
  prerequisites: 'Требования',
  name: 'Имя',
  email: 'Email',
  company: 'Компания',
  position: 'Должность',
  bio: 'О себе',
  links: 'Ссылки',
  tags: 'Тэги',
  notes: 'Дополнение',
  consent: 'Согласие',
};

export const proposalSubmitFields = [
  'status',
  'title',
  'format',
  'duration',
  'level',
  'trackId',
  'abstract',
  'takeaways',
  'targetAudience',
  'prerequisites',
  'speakers',
  'tags',
  'notes',
  'consent',
];

export type ProposalSubmitField = (typeof proposalSubmitFields)[number];

export type ProposalSubmitFieldsName =
  | 'Статус'
  | 'Событие'
  | 'Название'
  | 'Формат'
  | 'Продолжительность, мин'
  | 'Уровень'
  | 'Трек'
  | 'Описание доклада'
  | 'Ключевые выводы'
  | 'Целевая аудитория'
  | 'Требования'
  | 'Спикеры'
  | 'Теги'
  | 'Дополнительно'
  | 'Согласие';

export const proposalSubmitFieldsDictionary: Record<
  ProposalSubmitField,
  ProposalSubmitFieldsName
> = {
  status: 'Статус',
  eventId: 'Событие',
  title: 'Название',
  format: 'Формат',
  duration: 'Продолжительность, мин',
  level: 'Уровень',
  trackId: 'Трек',
  abstract: 'Описание доклада',
  takeaways: 'Ключевые выводы',
  targetAudience: 'Целевая аудитория',
  prerequisites: 'Требования',
  speakers: 'Спикеры',
  tags: 'Теги',
  notes: 'Дополнительно',
  consent: 'Согласие',
};

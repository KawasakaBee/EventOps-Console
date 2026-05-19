export const speakerFields = [
  'name',
  'email',
  'company',
  'position',
  'bio',
  'links',
] as const;

export type SpeakerField = (typeof speakerFields)[number];

type SpeakerFieldName =
  | 'Имя'
  | 'Email'
  | 'Компания'
  | 'Должность'
  | 'О себе'
  | 'Контакты';

export const speakerFieldsDictionary: Record<SpeakerField, SpeakerFieldName> = {
  name: 'Имя',
  email: 'Email',
  company: 'Компания',
  position: 'Должность',
  bio: 'О себе',
  links: 'Контакты',
};

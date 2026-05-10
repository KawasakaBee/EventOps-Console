export const settings = [
  'Настойка события',
  'Настойка треков',
  'Настойка форматов',
  'Настойка критериев ревью',
  'Настойка длительности',
] as const;

export type Settings = (typeof settings)[number];

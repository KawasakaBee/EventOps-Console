export const submitSteps = [
  'basic',
  'description',
  'speaker',
  'extra',
  'summary',
] as const;

export type SubmitStep = (typeof submitSteps)[number];

export type SubmitStepsName =
  | 'Основное'
  | 'Описание'
  | 'Спикер'
  | 'Дополнительно'
  | 'Итого';

export const stepsNumbersByName: Record<SubmitStep, number> = {
  basic: 0,
  description: 1,
  speaker: 2,
  extra: 3,
  summary: 4,
};

export const steps = {
  basic: {
    id: 'basic',
    fields: ['title', 'format', 'duration', 'level', 'trackId'],
  },
  description: {
    id: 'description',
    fields: ['abstract', 'takeaways', 'targetAudience', 'prerequisites'],
  },
  speaker: {
    id: 'speaker',
    fields: ['name', 'email', 'company', 'position', 'bio', 'links'],
  },
  extra: {
    id: 'extra',
    fields: ['tags', 'notes', 'consent'],
  },
} as const;

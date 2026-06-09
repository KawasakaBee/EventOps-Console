export const submitSteps = [
  'basic',
  'description',
  'speakers',
  'extra',
  'summary',
] as const;

export type SubmitStep = (typeof submitSteps)[number];

export type SubmitStepsName =
  | 'Основное'
  | 'Описание'
  | 'Спикеры'
  | 'Дополнительно'
  | 'Итого';

export const stepsNumbersByName: Record<SubmitStep, number> = {
  basic: 0,
  description: 1,
  speakers: 2,
  extra: 3,
  summary: 4,
};

export const steps = {
  basic: {
    id: 'basic',
    fields: ['eventId', 'title', 'format', 'duration', 'level', 'trackId'],
  },
  description: {
    id: 'description',
    fields: ['abstract', 'takeaways', 'targetAudience', 'prerequisites'],
  },
  speakers: {
    id: 'speakers',
    fields: ['speakers'],
  },
  extra: {
    id: 'extra',
    fields: ['tags', 'notes', 'consent'],
  },
} as const;

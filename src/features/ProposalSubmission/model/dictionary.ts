import type { SubmitStep, SubmitStepsName } from './steps';

export const submitStepsDictionary: Record<SubmitStep, SubmitStepsName> = {
  basic: 'Основное',
  description: 'Описание',
  speakers: 'Спикеры',
  extra: 'Дополнительно',
  summary: 'Итого',
};

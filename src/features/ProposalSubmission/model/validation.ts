import z from 'zod';
import type { SubmitValues } from './schema';
import { formatDurationMap } from './dictionary';

export const validateDurationByFormat = (
  values: Pick<SubmitValues, 'format' | 'duration'>,
  ctx: z.RefinementCtx,
) => {
  if (!values.duration) return;

  const allowedDurations = formatDurationMap[values.format];

  if (!allowedDurations.includes(values.duration)) {
    ctx.addIssue({
      code: 'custom',
      path: ['duration'],
      message: 'Длительность не подходит для выбранного формата',
    });
  }
};

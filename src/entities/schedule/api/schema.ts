import z from 'zod';

export const scheduleSchema = z.object({
  trackId: z.string().min(1, 'Обязательное значение'),
  date: z.string().min(1, 'Обязательное значение'),
  startTime: z.string().min(1, 'Обязательное значение'),
  endTime: z.string().min(1, 'Обязательное значение'),
  proposalId: z.string().min(1, 'Обязательное значение'),
});

export type PatchScheduleAssignRequest = z.infer<typeof scheduleSchema>;

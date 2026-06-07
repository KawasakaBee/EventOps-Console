import z from 'zod';

export const scheduleSchema = z.object({
  trackId: z.string().min(1, 'Обязательное значение'),
  date: z.string().min(1, 'Обязательное значение'),
  startTime: z.string().min(1, 'Обязательное значение'),
  endTime: z.string().min(1, 'Обязательное значение'),
  proposalId: z.string().min(1, 'Обязательное значение'),
});

export const unassignScheduleSchema = z.object({
  slotId: z.string().min(1, 'Обязательное значение'),
});

export type PatchScheduleAssignRequest = z.infer<typeof scheduleSchema>;

export type PatchScheduleUnassignRequest = z.infer<
  typeof unassignScheduleSchema
>;

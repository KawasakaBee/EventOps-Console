import z from 'zod';

const datetimeLocalRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

export const settingsSchema = z.object({
  title: z.string().trim().min(10, 'Минимальная длина названия - 10 символов'),
  description: z
    .string()
    .trim()
    .min(30, 'Минимальная длина описания - 30 символов'),
  place: z.string().trim().min(1, 'Обязательное поле'),
  startTime: z
    .string()
    .trim()
    .min(1, 'Обязательное поле')
    .refine(
      (value) => datetimeLocalRegex.test(value),
      'Некорректный формат даты и времени',
    )
    .refine(
      (value) => new Date(value).getTime() > new Date().getTime(),
      'Событие не может начинаться в прошедшем времени',
    ),
});

export type SettingsValues = z.infer<typeof settingsSchema>;

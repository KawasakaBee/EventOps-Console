import { recommendations } from '@/entities/review/model/types';
import z from 'zod';

export const createReviewBaseSchema = z.object({
  scoreContent: z
    .string()
    .trim()
    .refine(
      (val) => Number(val) >= 1 && Number(val) <= 10,
      'Обязательное поле',
    ),
  scoreRelevance: z
    .string()
    .trim()
    .refine(
      (val) => Number(val) >= 1 && Number(val) <= 10,
      'Обязательное поле',
    ),
  scoreDelivery: z
    .string()
    .trim()
    .refine(
      (val) => Number(val) >= 1 && Number(val) <= 10,
      'Обязательное поле',
    ),
  recommendation: z.enum(recommendations),
  comment: z.string().min(10, 'Минимальная длина комментария - 10 символов'),
});

export type CreateReviewValues = z.infer<typeof createReviewBaseSchema>;

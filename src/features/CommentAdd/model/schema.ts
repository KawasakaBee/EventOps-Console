import z from 'zod';

export const addCommentBaseSchema = z.object({
  message: z.string().min(10, 'Минимальная длина комментария - 10 символов'),
});

export type AddCommentValues = z.infer<typeof addCommentBaseSchema>;

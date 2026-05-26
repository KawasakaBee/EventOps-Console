import z from 'zod';

export const addCommentSchema = z.object({
  message: z.string().min(10, 'Минимальная длина комментария - 10 символов'),
});

export type PostAddCommentRequest = z.infer<typeof addCommentSchema>;

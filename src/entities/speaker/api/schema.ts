import { z } from 'zod';

export const speakerDraftSchema = z.object({
  id: z.string().nullable(),
  name: z.string().trim().optional(),
  email: z.string().optional(),
  company: z.string().trim().optional(),
  position: z.string().trim().optional(),
  bio: z.string().trim().optional(),
  links: z.string().optional(),
});

export const speakerSubmitSchema = z.object({
  id: z.string().nullable(),
  name: z.string().trim().min(1, 'Обязательное поле'),
  email: z.email('Email должен быть валидным'),
  company: z.string().trim().min(1, 'Обязательное поле'),
  position: z.string().trim().min(1, 'Обязательное поле'),
  bio: z
    .string()
    .trim()
    .min(50, 'Поле "О себе" должно содержать минимум 50 символов'),
  links: z.string().optional(),
});

export const postSpeakerRequestSchema = z.union([
  speakerDraftSchema,
  speakerSubmitSchema,
]);

export type PostDraftSpeakerRequest = z.infer<typeof speakerDraftSchema>;

export type PostSpeakerRequest = z.infer<typeof postSpeakerRequestSchema>;

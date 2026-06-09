import {
  proposalFormats,
  proposalLevels,
} from '@/entities/proposal/model/types';
import { z } from 'zod';
import { validateDurationByFormat } from './validation';
import { tags } from '@/entities/tag/model/types';

export const speakerBaseSchema = z.object({
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

const proposalSubmissionBaseSchema = z.object({
  eventId: z.string().trim().min(1, 'Обязательное поле'),
  title: z
    .string()
    .trim()
    .min(10, 'Название должно иметь длину минимум в 10 символов')
    .max(120, 'Максимальная длина названия - 120 символов'),
  format: z.enum(proposalFormats, 'Некорректный формат'),
  duration: z.string().min(1, 'Обязательное поле'),
  level: z.enum(proposalLevels, 'Некорректный уровень'),
  trackId: z.string().trim().min(1, 'Обязательное поле'),

  abstract: z
    .string()
    .trim()
    .min(100, 'Описание должно иметь длину минимум в 100 символов')
    .max(3000, 'Максимальная длина описания - 3000 символов'),
  takeaways: z.string().trim().min(1, 'Обязательное поле'),
  targetAudience: z.string().trim().min(1, 'Обязательное поле'),
  prerequisites: z.string().trim().min(1, 'Обязательное поле'),

  speakers: z
    .array(speakerBaseSchema)
    .min(1, 'У заявки должен быть хотя бы 1 спикер'),

  tags: z.array(z.enum(tags)),
  notes: z.string().trim().optional(),
  consent: z
    .boolean()
    .refine((value) => value === true, 'Нужно подтвердить согласие'),
});

export const basicSchema = proposalSubmissionBaseSchema
  .pick({
    eventId: true,
    title: true,
    format: true,
    duration: true,
    level: true,
    trackId: true,
  })
  .superRefine(validateDurationByFormat);

export const descriptionSchema = proposalSubmissionBaseSchema.pick({
  abstract: true,
  takeaways: true,
  targetAudience: true,
  prerequisites: true,
});

export const speakersSchema = proposalSubmissionBaseSchema.pick({
  speakers: true,
});

export const extraSchema = proposalSubmissionBaseSchema.pick({
  tags: true,
  notes: true,
  consent: true,
});

export const submitSchema = proposalSubmissionBaseSchema.superRefine(
  validateDurationByFormat,
);

export type SubmitValues = z.infer<typeof submitSchema>;

export type BasicValues = z.infer<typeof basicSchema>;

export type DescriptionValues = z.infer<typeof descriptionSchema>;

export type SpeakerValues = z.infer<typeof speakersSchema>;

export type ExtraValues = z.infer<typeof extraSchema>;

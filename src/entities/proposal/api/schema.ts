import {
  proposalFormats,
  proposalLevels,
} from '@/entities/proposal/model/types';
import { z } from 'zod';
import { tags } from '@/entities/tag/model/types';
import {
  speakerDraftSchema,
  speakerSubmitSchema,
} from '@/entities/speaker/api/schema';

const proposalDraftSchema = z.object({
  status: z.literal('draft'),
  title: z.string().trim().optional(),
  format: z.enum(proposalFormats, 'Некорректный формат'),
  duration: z.number().optional(),
  level: z.enum(proposalLevels, 'Некорректный уровень'),
  trackId: z.string().trim().optional(),

  abstract: z.string().trim().optional(),
  takeaways: z.string().trim().optional(),
  targetAudience: z.string().trim().optional(),
  prerequisites: z.string().trim().optional(),

  speakers: z.array(speakerDraftSchema).optional(),

  tags: z.array(z.enum(tags)).optional(),
  notes: z.string().trim().optional(),
  consent: z.boolean().optional(),
});

const proposalSubmitSchema = z.object({
  status: z.literal('submitted'),
  title: z
    .string()
    .trim()
    .min(10, 'Название должно иметь длину минимум в 10 символов')
    .max(120, 'Максимальная длина названия - 120 символов'),
  format: z.enum(proposalFormats, 'Некорректный формат'),
  duration: z.number(),
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
    .array(speakerSubmitSchema)
    .min(1, 'У заявки должен быть хотя бы 1 спикер'),

  tags: z.array(z.enum(tags)),
  notes: z.string().trim().optional(),
  consent: z
    .boolean()
    .refine((value) => value === true, 'Нужно подтвердить согласие'),
});

const proposalDraftPatchSchema = proposalDraftSchema.partial().extend({
  status: z.literal('draft').optional(),
});

export const patchProposalRequestSchema = z.union([
  proposalDraftPatchSchema,
  proposalSubmitSchema,
]);

export type PatchProposalRequestSchema = z.infer<
  typeof patchProposalRequestSchema
>;

export const postProposalRequestSchema = z.discriminatedUnion('status', [
  proposalDraftSchema,
  proposalSubmitSchema,
]);

export type PostProposalRequest = z.infer<typeof postProposalRequestSchema>;

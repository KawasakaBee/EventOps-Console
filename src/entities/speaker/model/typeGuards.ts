import { SpeakerField, speakerFields } from '../api/dictionary';

export const isSpeakerField = (value: unknown): value is SpeakerField =>
  typeof value === 'string' && speakerFields.some((field) => field === value);

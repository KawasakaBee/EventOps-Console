import { Proposal } from '@/entities/proposal/model/types';
import { SpeakerInput } from '@/entities/speaker/model/types';
import { SubmitValues } from './schema';
import { SubmitDirtyFields } from './types';

type SubmitSpeaker = SubmitValues['speakers'][number];

export const mapSpeakerToSubmitSpeaker = (
  speaker: SpeakerInput,
): SubmitSpeaker => ({
  id: speaker.id,
  name: speaker.name,
  email: speaker.email,
  company: speaker.company,
  position: speaker.position,
  bio: speaker.bio,
  links: speaker.contacts,
});

export const mapDraftSpeakerToSubmitSpeaker = (
  speaker: Proposal['draftSpeakers'][number],
): SubmitSpeaker => ({
  id: speaker.id,
  name: speaker.name ?? '',
  email: speaker.email ?? '',
  company: speaker.company ?? '',
  position: speaker.position ?? '',
  bio: speaker.bio ?? '',
  links: speaker.links ?? '',
});

export const mapDraftToSubmitValues = (
  draft: Proposal,
  speakersData: SpeakerInput[] | null,
): SubmitValues => {
  const speakersByIds = speakersData
    ? speakersData
        .filter((speaker) => draft.speakerIds.includes(speaker.id))
        .map(mapSpeakerToSubmitSpeaker)
    : [];

  const draftSpeakers = draft.draftSpeakers.map(mapDraftSpeakerToSubmitSpeaker);

  return {
    eventId: draft.eventId,
    title: draft.title,
    format: draft.format,
    duration: draft.duration === 0 ? '' : String(draft.duration),
    level: draft.level,
    trackId: draft.trackId,
    abstract: draft.abstract,
    takeaways: draft.takeaways,
    targetAudience: draft.targetAudience,
    prerequisites: draft.prerequisites,
    speakers: [...speakersByIds, ...draftSpeakers],
    tags: draft.tags,
    notes: draft.notes,
    consent: false,
  };
};

export const hasFilledSpeakerData = (
  speakers: SubmitValues['speakers'],
): boolean => {
  return speakers.some((speaker) => {
    return Boolean(
      speaker.id ||
      speaker.name.trim() ||
      speaker.email.trim() ||
      speaker.company.trim() ||
      speaker.position.trim() ||
      speaker.bio.trim() ||
      speaker.links?.trim(),
    );
  });
};

export const buildDirtySubmitPayload = (
  dirtyFields: SubmitDirtyFields,
  formValues: SubmitValues,
): Record<string, unknown> => {
  const requestBody: Record<string, unknown> = {};

  (Object.keys(dirtyFields) as Array<keyof SubmitValues>).forEach((key) => {
    const value = formValues[key];

    if (value === undefined) return;

    if (key === 'duration') {
      const normalizeDuration = Number(formValues[key]);

      requestBody[key] = normalizeDuration;
      return;
    }

    requestBody[key] = value;
  });

  return requestBody;
};

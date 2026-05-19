import { Speaker, SpeakerInput } from '@/entities/speaker/model/types';

export type GetSpeakersListResponse = {
  speakers: SpeakerInput[];
};

export type GetSpeakerFindResponse =
  | {
      found: true;
      speaker: Speaker;
    }
  | { found: false; speaker: null };

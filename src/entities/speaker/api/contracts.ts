import { SpeakerInput } from '@/entities/speaker/model/types';

export type GetSpeakersListResponse = {
  speakers: SpeakerInput[];
};

export type GetSpeakerItemResponse = {
  speaker: SpeakerInput;
};

export type GetSpeakerFindResponse =
  | {
      found: true;
      speaker: SpeakerInput;
    }
  | { found: false; speaker: null };

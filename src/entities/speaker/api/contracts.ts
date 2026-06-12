import { SpeakerInput } from '@/entities/speaker/model/types';

export interface GetSpeakerItemResponse {
  speaker: SpeakerInput;
}

export type GetSpeakerFindResponse =
  | {
      found: true;
      speaker: SpeakerInput;
    }
  | { found: false; speaker: null };

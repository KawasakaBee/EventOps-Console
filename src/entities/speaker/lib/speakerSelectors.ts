import { ID } from '@/shared/types/primitives.types';
import { Speaker } from '../model/types';
import { speakers } from '@/mocks/db/speakers';

export const getSpeakerById = (id: ID): Speaker | undefined =>
  speakers.find((speaker) => speaker.id === id);

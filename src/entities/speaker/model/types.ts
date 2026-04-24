import { ID } from '@/shared/types/primitives.types';

export interface Speaker {
  id: ID;
  userId: ID;
  name: string;
  email: string;
  company: string;
  position: string;
  bio: string;
  contacts: string;
  pastTalks: string;
  avatarUrl: string;
}

export type SpeakerInput = Pick<
  Speaker,
  'name' | 'email' | 'company' | 'position' | 'bio' | 'contacts'
>;

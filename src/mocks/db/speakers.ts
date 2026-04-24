import { Speaker, SpeakerInput } from '@/entities/speaker/model/types';

export const initialSpeakers = [
  {
    id: '4',
    userId: '4',
    name: 'Speaker 4',
    email: 'speaker4@gmail.com',
    company: 'Speaker 4 company',
    position: 'Speaker 4 positions',
    bio: 'Speaker 4 bio',
    contacts: 'Speaker 4 contacts',
    pastTalks: 'Speaker 4 past talks',
    avatarUrl: 'Speaker 4 avatarUrl',
  },
  {
    id: '5',
    userId: '5',
    name: 'Speaker 5',
    email: 'speaker5@gmail.com',
    company: 'Speaker 5 company',
    position: 'Speaker 5 positions',
    bio: 'Speaker 5 bio',
    contacts: 'Speaker 5 contacts',
    pastTalks: 'Speaker 5 past talks',
    avatarUrl: 'Speaker 5 avatarUrl',
  },
] satisfies Speaker[];

export const speakers: Speaker[] = [...initialSpeakers];

export const createSpeaker = (input: SpeakerInput): Speaker => {
  const randomId = crypto.randomUUID();

  const speaker: Speaker = {
    id: randomId,
    userId: randomId,
    name: input.name,
    email: input.email,
    company: input.company,
    position: input.position,
    bio: input.bio,
    contacts: input.contacts,
    pastTalks: `${randomId} speaker past talks`,
    avatarUrl: `${randomId} speaker avatarUrl`,
  };

  speakers.push(speaker);

  return speaker;
};

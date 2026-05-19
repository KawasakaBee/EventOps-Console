import { SpeakerInput } from '@/entities/speaker/model/types';
import { Tag } from '@/entities/tag/model/types';
import { Track } from '@/entities/track/model/types';
import { ID } from '@/shared/types/primitives.types';
import { Resource } from '@/shared/types/resource.types';

export interface ISubmitStepperProps {
  id: ID | null;
  speakers: Resource<SpeakerInput[]>;
  tracks: Resource<Track[]>;
  reFetchTracks: () => Promise<void>;
  tags: Resource<Tag[]>;
  reFetchTags: () => Promise<void>;
  clearStorage: () => void;
}

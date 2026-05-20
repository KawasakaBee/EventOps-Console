import { Track } from '@/entities/track/model/types';
import { Resource } from '@/shared/types/resource.types';

export interface ISummaryStepProps {
  tracks: Resource<Track[]>;
}

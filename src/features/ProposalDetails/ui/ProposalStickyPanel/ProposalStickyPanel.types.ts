import { Resource } from '@/shared/types/primitives.types';
import { DetailsState } from '../../model/proposalDetailsSlice';
import { Track } from '@/entities/track/model/types';

export interface IProposalStickyPanelProps {
  data: DetailsState;
  tracks: Resource<Track[]>;
}

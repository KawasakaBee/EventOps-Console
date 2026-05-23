import { ProposalListItem } from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';
import { Resource } from '@/shared/types/resource.types';

export interface IMyProposalsTableProps {
  data: ProposalListItem[];
  tracks: Resource<Track[]>;
}

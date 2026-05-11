import { ProposalListItem } from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';
import { Role } from '@/entities/user/model/types';
import { Resource } from '@/shared/types/resource.types';

export interface IProposalsTableProps {
  proposals: ProposalListItem[];
  tracks: Resource<Track[]>;
  role: Role;
}

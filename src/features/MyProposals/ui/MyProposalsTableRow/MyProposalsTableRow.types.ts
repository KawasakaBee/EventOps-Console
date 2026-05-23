import { ProposalListItem } from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';
import { Role } from '@/entities/user/model/types';
import { Resource } from '@/shared/types/resource.types';

export interface IMyProposalsTableRowProps {
  proposal: ProposalListItem;
  role: Role;
  tracks: Resource<Track[]>;
}

export interface IMyTableRowProps {
  rowName: keyof ProposalListItem | 'actions';
  data: ProposalListItem;
}

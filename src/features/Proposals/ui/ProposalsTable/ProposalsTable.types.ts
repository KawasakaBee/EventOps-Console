import {
  ProposalListItem,
  ProposalStatus,
} from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';
import { ID, Role } from '@/shared/types/primitives.types';

export interface IProposalsTableProps {
  proposals: ProposalListItem[];
  tracks: Track[];
  role: Role;
  setProposal: React.Dispatch<
    React.SetStateAction<{
      status: ProposalStatus;
      id: ID;
    } | null>
  >;
}

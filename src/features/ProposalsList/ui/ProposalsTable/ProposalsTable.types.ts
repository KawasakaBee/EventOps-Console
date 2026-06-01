import { ProposalListItem } from '@/entities/proposal/model/types';
import { Role } from '@/entities/user/model/types';

export interface IProposalsTableProps {
  proposals: ProposalListItem[];
  role: Role;
}

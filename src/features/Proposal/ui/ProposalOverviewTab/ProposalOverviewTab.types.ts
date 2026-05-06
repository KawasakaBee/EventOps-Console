import { Proposal } from '@/entities/proposal/model/types';

export interface IProposalOverviewTabProps {
  proposal: Proposal | null;
  track: string | null | undefined;
}

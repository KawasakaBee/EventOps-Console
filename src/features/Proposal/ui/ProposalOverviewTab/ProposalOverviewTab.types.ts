import { Proposal } from '@/entities/proposal/model/types';

export interface IProposalOverviewTabProps {
  proposal: Proposal;
  track: string | null | undefined;
}

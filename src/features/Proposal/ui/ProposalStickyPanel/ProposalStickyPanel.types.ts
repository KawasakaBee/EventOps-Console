import { GetProposalResponse } from '@/shared/api/contracts/proposal.contract';

export interface IProposalStickyPanelProps {
  data: GetProposalResponse;
  trackName: string | null | undefined;
  isPageUnavailable: boolean;
}

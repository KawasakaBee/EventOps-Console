import { ProposalDetailsTab, proposalDetailsTabs } from './types';

export const isProposalDetailsTab = (
  value: unknown,
): value is ProposalDetailsTab =>
  typeof value === 'string' && proposalDetailsTabs.some((tab) => tab === value);

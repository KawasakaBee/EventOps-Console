import { MyProposalsTab, myProposalsTabs } from './types';

export const isMyPropsalsTab = (value: unknown): value is MyProposalsTab =>
  typeof value === 'string' && myProposalsTabs.some((tab) => tab === value);

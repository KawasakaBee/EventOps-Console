export const myProposalsTabs = ['proposals', 'drafts'] as const;

export type MyProposalsTab = (typeof myProposalsTabs)[number];

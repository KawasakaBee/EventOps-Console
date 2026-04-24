import { Proposal, ProposalStatus } from '@/entities/proposal/model/types';
import {
  PatchProposalRequest,
  PostProposalRequest,
} from '@/shared/api/contracts/proposal.contract';
import { ID } from '@/shared/types/primitives.types';
import { createHistory } from './history';
import { createSpeaker } from './speakers';

export const initialProposals = [
  {
    id: '1',
    title: 'Proposal 1',
    abstract: 'Abstract 1',
    format: 'talk',
    level: 'junior',
    duration: 90,
    status: 'in_review',
    trackId: '1',
    speakerIds: ['4'],
    tags: ['Frontend', 'Backend'],
    createdAt: '2026-04-21T07:00:00+03:00',
    updatedAt: '2026-04-21T07:00:00+03:00',
  },
  {
    id: '2',
    title: 'Proposal 2',
    abstract: 'Abstract 2',
    format: 'workshop',
    level: 'middle',
    duration: 65,
    status: 'submitted',
    trackId: '2',
    speakerIds: ['5'],
    tags: ['DevOps', 'CEO', 'CSS'],
    createdAt: '2026-04-21T07:00:00+03:00',
    updatedAt: '2026-04-21T07:00:00+03:00',
  },
  {
    id: '3',
    title: 'Proposal 3',
    abstract: 'Abstract 3',
    format: 'lightning',
    level: 'senior',
    duration: 105,
    status: 'accepted',
    trackId: '3',
    speakerIds: ['4', '5'],
    tags: ['Frontend', 'CEO'],
    createdAt: '2026-04-21T07:00:00+03:00',
    updatedAt: '2026-04-21T07:00:00+03:00',
  },
] satisfies Proposal[];

export const proposals: Proposal[] = [...initialProposals];

export const createProposal = (
  input: PostProposalRequest,
  actorId: ID,
): Proposal => {
  const {
    abstract,
    duration,
    format,
    level,
    speakers,
    status,
    tags,
    title,
    trackId,
  } = input;
  const id = crypto.randomUUID();

  const speakerIds: string[] = [];

  for (const speaker of speakers) {
    speakerIds.push(createSpeaker(speaker).id);
  }

  const proposal: Proposal = {
    id: id,
    title,
    abstract,
    format,
    level,
    duration,
    status,
    trackId,
    tags,
    speakerIds,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  createHistory(id, actorId, 'created');
  proposals.push(proposal);

  return proposal;
};

export const updateProposal = (
  id: ID,
  patch: PatchProposalRequest,
): Proposal | null => {
  const idx = proposals.findIndex((proposal) => proposal.id === id);

  if (idx === -1) return null;

  proposals[idx] = {
    ...proposals[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  return proposals[idx];
};

export const updateProposalStatus = (
  id: ID,
  status: ProposalStatus,
): Proposal | null => {
  const idx = proposals.findIndex((proposal) => proposal.id === id);

  if (idx === -1) return null;

  proposals[idx] = {
    ...proposals[idx],
    status,
    updatedAt: new Date().toISOString(),
  };

  return proposals[idx];
};

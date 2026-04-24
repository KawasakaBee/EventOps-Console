import {
  HistoryAction,
  HistoryEntry,
  ProposalFieldChange,
} from '@/entities/history/model/types';
import { ID } from '@/shared/types/primitives.types';
import { proposals } from './proposals';
import { Proposal } from '@/entities/proposal/model/types';

export const initialHistory = [
  {
    id: '1',
    proposalId: '1',
    actorId: '3',
    action: 'created',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    proposalId: '2',
    actorId: '3',
    action: 'created',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    proposalId: '3',
    actorId: '3',
    action: 'created',
    createdAt: new Date().toISOString(),
  },
] satisfies HistoryEntry[];

export const history: HistoryEntry[] = [...initialHistory];

export const createHistory = (
  proposalId: ID,
  actorId: ID,
  action: HistoryAction,
): HistoryEntry => {
  const historyItem: HistoryEntry = {
    id: crypto.randomUUID(),
    proposalId,
    actorId,
    action,
    createdAt: new Date().toISOString(),
  };

  history.push(historyItem);

  return historyItem;
};

export const appendProposalHistory = (
  proposalId: ID,
  userId: ID,
  patch: Partial<Proposal>,
  action: HistoryAction,
  payload?: Record<string, unknown>,
): HistoryEntry | null => {
  const proposal = proposals.find((proposal) => proposal.id === proposalId);
  if (!proposal) return null;

  const historyItem = createHistory(proposalId, userId, action);

  const changedValues = Object.keys(patch) as (keyof Partial<Proposal>)[];

  let resultValues: ProposalFieldChange[] = changedValues.map((value) => ({
    field: value,
    previousValue: proposal[value],
    nextValue: patch[value],
  }));

  resultValues = resultValues.filter(
    (item) => item.previousValue !== item.nextValue,
  );

  historyItem.changes = resultValues;
  if (payload) historyItem.payload = payload;

  return historyItem;
};

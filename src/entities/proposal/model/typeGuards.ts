import {
  AdditionalAction,
  additionalActions,
  CriticalAction,
  criticalActions,
  ProposalFormat,
  proposalFormats,
  ProposalLevel,
  proposalLevels,
  ProposalStatus,
  proposalStatuses,
} from './types';

export const isProposalStatus = (value: unknown): value is ProposalStatus =>
  typeof value === 'string' &&
  proposalStatuses.some((status) => status === value);

export const isProposalFormat = (value: unknown): value is ProposalFormat =>
  typeof value === 'string' &&
  proposalFormats.some((format) => format === value);

export const isProposalLevel = (value: unknown): value is ProposalLevel =>
  typeof value === 'string' && proposalLevels.some((level) => level === value);

export const isCriticalAvailableAction = (
  value: unknown,
): value is CriticalAction =>
  typeof value === 'string' &&
  criticalActions.some((action) => action === value);

export const isAdditionalAvailableAction = (
  value: unknown,
): value is AdditionalAction =>
  typeof value === 'string' &&
  additionalActions.some((action) => action === value);

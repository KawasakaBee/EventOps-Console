import {
  DashboardRange,
  dashboardRanges,
} from '@/entities/dashboard/model/types';
import { PostDemoLoginRequest } from '../api/contracts/auth.contract';
import {
  ErrorCode,
  errorCodes,
  ID,
  PageSize,
  Role,
  roles,
  sortBy,
  SortBy,
  sortOrder,
  SortOrder,
} from '../types/primitives.types';
import {
  ProposalFormat,
  proposalFormats,
  ProposalLevel,
  proposalLevels,
  ProposalStatus,
  proposalStatuses,
} from '@/entities/proposal/model/types';
import { PAGE_SIZE_OPTIONS } from '../config/layout';
import { ErrorEnvelope } from '../types/api.types';

export const isRole = (value: unknown): value is Role =>
  typeof value === 'string' && roles.some((role) => role === value);

export const isDemoRole = (
  value: unknown,
): value is PostDemoLoginRequest['role'] =>
  typeof value === 'string' &&
  roles.some((role) => role === value && role !== 'admin');

export const isRange = (value: unknown): value is DashboardRange =>
  typeof value === 'string' && dashboardRanges.some((range) => range === value);

export const isId = (value: unknown): value is ID => typeof value === 'string';

export const isProposalStatus = (value: unknown): value is ProposalStatus =>
  typeof value === 'string' &&
  proposalStatuses.some((status) => status === value);

export const isProposalFormat = (value: unknown): value is ProposalFormat =>
  typeof value === 'string' &&
  proposalFormats.some((format) => format === value);

export const isProposalLevel = (value: unknown): value is ProposalLevel =>
  typeof value === 'string' && proposalLevels.some((level) => level === value);

export const isPageSize = (value: unknown): value is PageSize =>
  typeof value === 'number' &&
  PAGE_SIZE_OPTIONS.some((option) => option === value);

export const isSortBy = (value: unknown): value is SortBy =>
  typeof value === 'string' && sortBy.some((option) => option === value);

export const isSortOrder = (value: unknown): value is SortOrder =>
  typeof value === 'string' && sortOrder.some((option) => option === value);

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isStringRecord = (value: unknown): value is Record<string, string> =>
  isObject(value) &&
  Object.values(value).every((obj) => typeof obj === 'string');

const isErrorCode = (value: unknown): value is ErrorCode =>
  typeof value === 'string' && errorCodes.some((code) => code === value);

export const isErrorEnvelope = (value: unknown): value is ErrorEnvelope => {
  if (!isObject(value)) return false;
  if (!isObject(value.error)) return false;

  const { code, message, fields } = value.error;

  return (
    isErrorCode(code) &&
    typeof message === 'string' &&
    (fields === undefined || isStringRecord(fields))
  );
};

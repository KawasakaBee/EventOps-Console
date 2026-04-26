import {
  DashboardRange,
  dashboardRanges,
} from '@/entities/dashboard/model/types';
import { PostDemoLoginRequest } from '../api/contracts/auth.contract';
import { ID, PageSize, Role, roles } from '../types/primitives.types';
import {
  ProposalFormat,
  proposalFormats,
  ProposalLevel,
  proposalLevels,
  ProposalStatus,
  proposalStatuses,
} from '@/entities/proposal/model/types';
import { PAGE_SIZE_OPTIONS } from '../config/layout';

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

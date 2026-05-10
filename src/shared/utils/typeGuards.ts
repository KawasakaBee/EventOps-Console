import {
  DashboardRange,
  dashboardRanges,
} from '@/entities/dashboard/model/types';
import {
  ID,
  ISODateString,
  PageSize,
  sortBy,
  SortBy,
  sortOrder,
  SortOrder,
} from '../types/primitives.types';
import { PAGE_SIZE_OPTIONS } from '../config/layout';
import { ErrorCode, errorCodes, ErrorEnvelope } from '../types/api.types';
import { Recommendation, recommendations } from '@/entities/review/model/types';
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
} from '@/entities/proposal/model/types';
import { DemoRole, demoRoles, Role, roles } from '@/entities/user/model/types';
import { Route } from 'next';
import {
  BreadcrumbsRoute,
  breadcrumbsRoutes,
  NavigationRoute,
  navigationRoutes,
  routes,
} from '../config/routes';
import {
  ProposalDetailsTab,
  proposalDetailsTabs,
} from '@/features/ProposalDetails/model/types';

export const isRole = (value: unknown): value is Role =>
  typeof value === 'string' && roles.some((role) => role === value);

export const isDemoRole = (value: unknown): value is DemoRole =>
  typeof value === 'string' && demoRoles.some((role) => role === value);

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

export const isRoute = (value: unknown): value is Route =>
  typeof value === 'string' && routes.some((route) => route === value);

export const isNavigationRoute = (value: unknown): value is NavigationRoute =>
  typeof value === 'string' &&
  navigationRoutes.some((route) => route === value);

export const isBreadcrumbsRoute = (value: unknown): value is BreadcrumbsRoute =>
  typeof value === 'string' &&
  breadcrumbsRoutes.some((route) => route === value);

export const isIsoTime = (value: unknown): value is ISODateString => {
  if (typeof value !== 'string') return false;
  const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;

  return isoDateTimeRegex.test(value) && !Number.isNaN(Date.parse(value));
};

export const isRecommendation = (value: unknown): value is Recommendation =>
  typeof value === 'string' && recommendations.some((item) => item === value);

export const isProposalDetailsTab = (
  value: unknown,
): value is ProposalDetailsTab =>
  typeof value === 'string' && proposalDetailsTabs.some((tab) => tab === value);

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

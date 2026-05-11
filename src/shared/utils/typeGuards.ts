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

export const isId = (value: unknown): value is ID => typeof value === 'string';

export const isPageSize = (value: unknown): value is PageSize =>
  typeof value === 'number' &&
  PAGE_SIZE_OPTIONS.some((option) => option === value);

export const isSortBy = (value: unknown): value is SortBy =>
  typeof value === 'string' && sortBy.some((option) => option === value);

export const isSortOrder = (value: unknown): value is SortOrder =>
  typeof value === 'string' && sortOrder.some((option) => option === value);

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isIsoDateTime = (value: unknown): value is ISODateString => {
  if (typeof value !== 'string') return false;
  const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;

  return isoDateTimeRegex.test(value) && !Number.isNaN(Date.parse(value));
};

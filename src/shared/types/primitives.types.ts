import { PAGE_SIZE_OPTIONS } from '../config/layout';

export type ID = string;
export type ISODateString = string;

export const roles = ['admin', 'manager', 'reviewer', 'speaker'] as const;

export type Role = (typeof roles)[number];

export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

export const routes = [
  '/login',
  '/dashboard',
  '/proposals',
  '/proposals/[id]',
  '/submit',
  '/my-proposals',
  '/speakers',
  '/schedule',
  '/analytics',
  '/settings',
  '/audit',
] as const;

export type Route = (typeof routes)[number];

export const permissions = [
  'dashboard:view',
  'proposals:list',
  'proposals:view',
  'proposals:create',
  'proposals:update',
  'proposals:change-status',
  'review:create',
  'review:assign',
  'review:comment',
  'speakers:list',
  'schedule:view',
  'schedule:assign',
  'audit:view',
  'settings:view',
  'settings:update',
] as const;

export type Permission = (typeof permissions)[number];

export const errorCodes = [
  'INVALID_ROLE',
  'ROLE_NOT_FOUND',
  'USER_NOT_FOUND',
  'PROPOSAL_NOT_FOUND',
  'REVIEWER_NOT_FOUND',
  'HISTORY_NOT_FOUND',
  'FORBIDDEN',
  'INVALID_QUERY',
] as const;

export type ErrorCode = (typeof errorCodes)[number];

export const proposalListRowActions = [
  'viewDetails',
  'assignReviewer',
  'changeStatus',
  'createReview',
  'editDraft',
] as const;

export type ProposalListRowActions = (typeof proposalListRowActions)[number];

export const sortBy = [
  'id',
  'title',
  'status',
  'format',
  'level',
  'trackId',
  'updatedAt',
] as const;

export type SortBy = (typeof sortBy)[number];

export const sortOrder = ['asc', 'desc'] as const;

export type SortOrder = (typeof sortOrder)[number];

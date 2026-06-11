import getResponsiveValue from '../utils/getResponsiveValue';

export const SIDEBAR_WIDTH = (isDesktop: boolean, viewportWidth: number) =>
  isDesktop ? getResponsiveValue(200, 160, 1920, 1440, viewportWidth) : 160;
export const APPBAR_HEIGHT = 80 as const;
export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;
export const DEFAULT_PAGE_SIZE = 20;
export const PROPOSAL_DRAFT_STORAGE_KEY = 'proposal-submission-recovery:v1';
export const AUTH_SESSION_COOKIE = 'eventops-session';
export const SCHEDULE_STEP_MINUTES = 5;
export const SCHEDULE_STEP_HEIGHT = 20;
export const NEXT_HEADER_ROWS = 2;

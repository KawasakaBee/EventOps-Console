import { setupWorker } from 'msw/browser';
import { proposalHandlers } from './handlers/proposals.handlers';
import { dashboardHandlers } from './handlers/dashboard.handlers';
import { trackHandlers } from './handlers/track.handler';
import { reviewersHandlers } from './handlers/reviewers.handlers';

export const worker = setupWorker(
  ...dashboardHandlers,
  ...proposalHandlers,
  ...trackHandlers,
  ...reviewersHandlers,
);

import { setupWorker } from 'msw/browser';
import { proposalHandlers } from './handlers/proposals.handlers';
import { dashboardHandlers } from './handlers/dashboard.handlers';
import { reviewersHandlers } from './handlers/reviewers.handlers';
import { usersHandlers } from './handlers/users.handlers';
import { authHandlers } from './handlers/auth.handlers';
import { tracksHandlers } from './handlers/tracks.handler';
import { tagsHandlers } from './handlers/tags.handler';

export const worker = setupWorker(
  ...dashboardHandlers,
  ...proposalHandlers,
  ...tracksHandlers,
  ...tagsHandlers,
  ...reviewersHandlers,
  ...usersHandlers,
  ...authHandlers,
);

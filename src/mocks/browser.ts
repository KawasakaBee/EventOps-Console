import { setupWorker } from 'msw/browser';
import { proposalHandlers } from './handlers/proposals.handlers';
import { dashboardHandlers } from './handlers/dashboard.handlers';
import { reviewersHandlers } from './handlers/reviewers.handlers';
import { usersHandlers } from './handlers/users.handlers';
import { authHandlers } from './handlers/auth.handlers';
import { tracksHandlers } from './handlers/tracks.handler';
import { tagsHandlers } from './handlers/tags.handler';
import { speakersHandlers } from './handlers/speakers.handlers';
import { auditHandlers } from './handlers/audit.handlers';
import { commentsHandlers } from './handlers/comments.handlers';

export const worker = setupWorker(
  ...dashboardHandlers,
  ...proposalHandlers,
  ...tracksHandlers,
  ...tagsHandlers,
  ...reviewersHandlers,
  ...usersHandlers,
  ...speakersHandlers,
  ...authHandlers,
  ...auditHandlers,
  ...commentsHandlers,
);

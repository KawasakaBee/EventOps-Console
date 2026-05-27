import { setupServer } from 'msw/node';

import { authHandlers } from '@/mocks/handlers/auth.handlers';
import { dashboardHandlers } from '@/mocks/handlers/dashboard.handlers';
import { proposalHandlers } from '@/mocks/handlers/proposals.handlers';
import { reviewersHandlers } from '@/mocks/handlers/reviewers.handlers';
import { speakersHandlers } from '@/mocks/handlers/speakers.handlers';
import { tagsHandlers } from '@/mocks/handlers/tags.handler';
import { tracksHandlers } from '@/mocks/handlers/tracks.handler';
import { usersHandlers } from '@/mocks/handlers/users.handlers';

export const server = setupServer(
  ...dashboardHandlers,
  ...proposalHandlers,
  ...tracksHandlers,
  ...tagsHandlers,
  ...reviewersHandlers,
  ...usersHandlers,
  ...speakersHandlers,
  ...authHandlers,
);

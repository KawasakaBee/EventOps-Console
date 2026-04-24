import { setupWorker } from 'msw/browser';
import { proposalHandlers } from './handlers/proposals.handlers';
import { dashboardHandlers } from './handlers/dashboard.handlers';

export const worker = setupWorker(...dashboardHandlers, ...proposalHandlers);

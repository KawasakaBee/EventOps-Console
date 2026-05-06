import { GetDashboardResponse } from '@/shared/api/contracts/dashboard.contract';
import { http, HttpResponse } from 'msw';
import { getDashboard } from '../db/dashboard';
import { isRange } from '@/shared/utils/typeGuards';
import { queryError } from '../db/errors';

export const dashboardHandlers = [
  http.get('/api/events/:eventId/dashboard', async ({ request }) => {
    const url = new URL(request.url);
    const range = url.searchParams.get('range') ?? '30d';

    if (!isRange(range)) return queryError();

    const dashboard = getDashboard(range);
    const response: GetDashboardResponse = dashboard;

    return HttpResponse.json(response);
  }),
];

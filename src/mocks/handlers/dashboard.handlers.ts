import { GetDashboardResponse } from '@/entities/dashboard/api/contracts';
import { http, HttpResponse } from 'msw';
import { getDashboard } from '../db/dashboard';
import { queryError } from '../utils/httpErrors';
import { isDashboardRange } from '@/entities/dashboard/model/typeGuards';

export const dashboardHandlers = [
  http.get('/api/events/:eventId/dashboard', async ({ request }) => {
    const url = new URL(request.url);
    const range = url.searchParams.get('range') ?? '30d';

    if (!isDashboardRange(range)) return queryError();

    const dashboard = getDashboard(range);
    const response: GetDashboardResponse = dashboard;

    return HttpResponse.json(response);
  }),
];

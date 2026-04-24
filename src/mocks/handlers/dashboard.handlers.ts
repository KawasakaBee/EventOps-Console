import { GetDashboardResponse } from '@/shared/api/contracts/dashboard.contract';
import { http, HttpResponse } from 'msw';
import { getDashboard } from '../db/dashboard';
import { DashboardRange } from '@/entities/dashboard/model/types';

export const dashboardHandlers = [
  http.get('/api/events/:eventId/dashboard', async ({ request }) => {
    const url = new URL(request.url);
    const range = url.searchParams.get('range') ?? '30d';

    const dashboard = getDashboard(range as DashboardRange);
    const response: GetDashboardResponse = dashboard;

    return HttpResponse.json(response);
  }),
];

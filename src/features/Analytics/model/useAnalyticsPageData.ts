import { useLazyGetDashboardQuery } from '@/entities/dashboard/api/dashboardApi';
import { isDashboardRange } from '@/entities/dashboard/model/typeGuards';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const useAnalyticsPageData = () => {
  // state
  const searchParams = useSearchParams();
  const [getAnalytics, analyticsQuery] = useLazyGetDashboardQuery();

  const currentEventId = searchParams.get('eventId') ?? '';
  const currentRange = searchParams.get('range') ?? '';

  // useEffect

  useEffect(() => {
    if (currentEventId === '' || !isDashboardRange(currentRange)) return;

    getAnalytics({ id: currentEventId, range: currentRange });
  }, [currentEventId, currentRange, getAnalytics]);

  return {
    analytics: analyticsQuery,
    currentEventId,
    currentRange,
    getAnalytics,
  };
};

export default useAnalyticsPageData;

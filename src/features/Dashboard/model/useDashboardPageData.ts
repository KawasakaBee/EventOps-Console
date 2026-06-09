import { useLazyGetDashboardQuery } from '@/entities/dashboard/api/dashboardApi';
import { isDashboardRange } from '@/entities/dashboard/model/typeGuards';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const useDashboardPageData = () => {
  // state
  const searchParams = useSearchParams();
  const [getDashboard, getState] = useLazyGetDashboardQuery();

  const currentEventId = searchParams.get('eventId') ?? '';
  const currentRange = searchParams.get('range') ?? '';

  // useEffect

  useEffect(() => {
    if (currentEventId === '' || !isDashboardRange(currentRange)) return;

    getDashboard({ id: currentEventId, range: currentRange });
  }, [currentEventId, currentRange, getDashboard]);

  return {
    dashboard: getState,
    currentEventId,
    currentRange,
    getDashboard,
  };
};

export default useDashboardPageData;

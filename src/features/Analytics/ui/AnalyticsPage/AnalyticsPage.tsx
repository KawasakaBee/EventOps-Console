'use client';

import { Stack } from '@mui/material';
import useAnalyticsPageData from '../../model/useAnalyticsPageData';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import AnalyticsSelect from '../AnalyticsSelect/AnalyticsSelect';
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import getAnalyticsErrorState from '../../model/getAnalitycsErrorState';
import { isDashboardRange } from '@/entities/dashboard/model/typeGuards';
import AnalyticsFunnelChart from '../AnalyticsFunnelChart/AnalyticsFunnelChart';
import AnalyticsReviewerWorkload from '../AnalyticsReviewerWorkload/AnalyticsReviewerWorkload';
import AnalyticsFunnelChartSkeleton from '../AnalyticsFunnelChart/AnalyticsFunnelChartSkeleton';
import AnalyticsReviewerWorkloadSkeleton from '../AnalyticsReviewerWorkload/AnalyticsReviewerWorkloadSkeleton';

const AnalyticsPage = () => {
  const { analytics, currentEventId, currentRange, getAnalytics } =
    useAnalyticsPageData();

  return (
    <Stack spacing={4}>
      <PageHeader
        pageName="Аналитика"
        title={'Подробная сводка по выбранному событию'}
        mode="outer"
      >
        <AnalyticsSelect />
      </PageHeader>
      {analytics.isLoading ? (
        <>
          <AnalyticsFunnelChartSkeleton />
          <AnalyticsReviewerWorkloadSkeleton />
        </>
      ) : analytics.isError ? (
        isAppBaseQueryError(analytics.error) && (
          <ErrorState
            {...getAnalyticsErrorState(analytics.error.error, {
              retry: () => {
                if (currentEventId === '' || !isDashboardRange(currentRange))
                  return;

                getAnalytics({ id: currentEventId, range: currentRange });
              },
            })}
          />
        )
      ) : (
        analytics.data && (
          <>
            <AnalyticsFunnelChart
              byStatus={analytics.data.dashboard.submissionsByStatus}
              byTrack={analytics.data.dashboard.byTrack}
            />
            <AnalyticsReviewerWorkload
              workflow={analytics.data.dashboard.reviewersWorkflow}
            />
          </>
        )
      )}
    </Stack>
  );
};
export default AnalyticsPage;

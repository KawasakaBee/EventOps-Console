'use client';

import { Stack } from '@mui/material';
import useDashboardPageData from '../../model/useDashboardPageData';
import DashboardKpis from '../DashboardKpis/DashboardKpis';
import DashboardSelect from '../DashboardSelect/DashboardSelect';
import DashboardKpisSkeleton from '../DashboardKpis/DashboardKpisSkeleton';
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import getDashboardErrorState from '../../model/getDashboardErrorState';
import { isDashboardRange } from '@/entities/dashboard/model/typeGuards';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import DashboardAttentions from '../DashboardAttentions/DashboardAttentions';
import DashboardAttentionsSkeleton from '../DashboardAttentions/DashboardAttentionsSkeleton';
import DashboardRecentTable from '../DashboardRecentTable/DashboardRecentTable';
import DashboardRecentTableSkeleton from '../DashboardRecentTable/DashboardRecentTableSkeleton';

const DashboardPage = () => {
  const { dashboard, currentEventId, currentRange, getDashboard } =
    useDashboardPageData();

  return (
    <Stack spacing={4}>
      <PageHeader
        pageName="Панель управления"
        title={'Краткая сводка по выбранному событию'}
        mode="outer"
      >
        <DashboardSelect />
      </PageHeader>
      {dashboard.isLoading ? (
        <>
          <DashboardKpisSkeleton />
          <DashboardAttentionsSkeleton />
          <DashboardRecentTableSkeleton />
        </>
      ) : dashboard.isError ? (
        isAppBaseQueryError(dashboard.error) && (
          <ErrorState
            {...getDashboardErrorState(dashboard.error.error, {
              retry: () => {
                if (currentEventId === '' || !isDashboardRange(currentRange))
                  return;

                getDashboard({ id: currentEventId, range: currentRange });
              },
            })}
          />
        )
      ) : (
        dashboard.data && (
          <>
            <DashboardKpis dashboard={dashboard.data.dashboard} />
            <DashboardAttentions dashboard={dashboard.data.dashboard} />
            <DashboardRecentTable dashboard={dashboard.data.dashboard} />
          </>
        )
      )}
    </Stack>
  );
};
export default DashboardPage;

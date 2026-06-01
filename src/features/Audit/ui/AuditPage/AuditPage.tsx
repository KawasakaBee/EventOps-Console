'use client';

import { breadcrumbsDictionary } from '@/shared/lib/routes/dictionary';
import { getBreadcrumbsRoute } from '@/shared/lib/routes/utils';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import { Typography } from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation';
import useAuditData from '../../model/useAuditData';
import { useMemo } from 'react';
import AuditFilterBar from '../AuditFilterBar/AuditFilterBar';
import AuditTable from '../AuditTable/AuditTable';
import AuditTableSkeleton from '../AuditTable/AuditTableSkeleton';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import PaginationControl from '@/shared/ui/PaginationControl/PaginationControl';
import InfoCards from '@/shared/ui/InfoCards/InfoCards';
import { useGetAuditPaginationQuery } from '../../api/auditApi';
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import getAuditErrorState from '../../model/getAuditErrorState';

const AuditPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stringifySearchParams = searchParams.toString();
  const breadcrumbsRoute = getBreadcrumbsRoute(pathname);

  const { data, isLoading, isError, error, refetch } =
    useGetAuditPaginationQuery(stringifySearchParams);
  const { auditFiltersReset } = useAuditData();

  const activeFiltersCount = useMemo((): number => {
    const filters = new Set(
      Array.from(searchParams.entries()).flatMap((obj) => obj[0]),
    );

    filters.delete('page');
    filters.delete('pageSize');
    filters.delete('sortBy');
    filters.delete('sortOrder');
    filters.delete('owner');

    return filters.size;
  }, [searchParams]);

  return (
    <>
      <PageHeader
        mode="outer"
        pageName={
          breadcrumbsRoute ? breadcrumbsDictionary[breadcrumbsRoute] : null
        }
        title={
          <Typography variant="h3">
            Таблица действий пользователей в системе
          </Typography>
        }
      >
        {null}
      </PageHeader>
      {
        <InfoCards
          items={[
            { label: 'Всего действий:', value: data?.total },
            { label: 'Страница:', value: data?.page },
            {
              label: 'Действий на странице:',
              value: data?.pageSize,
            },
            { label: 'Активные фильтры:', value: activeFiltersCount },
          ]}
          isLoading={isLoading}
        />
      }
      <AuditFilterBar
        searchParams={stringifySearchParams}
        isDisabled={isLoading || isError}
        handleFiltersReset={auditFiltersReset}
      />
      {isLoading ? (
        <AuditTableSkeleton />
      ) : isError ? (
        isAppBaseQueryError(error) && (
          <ErrorState
            {...getAuditErrorState(error.error, {
              retry: refetch,
              resetFilters: auditFiltersReset,
            })}
          />
        )
      ) : data && data.items.length !== 0 ? (
        <AuditTable audit={data.items} />
      ) : activeFiltersCount === 0 ? (
        <EmptyState
          title="Данных пока нет"
          subtitle="Когда будут совершены какие-либо действия, они появятся в этом списке."
        />
      ) : (
        <EmptyState
          title="По текущим фильтрам ничего не найдено"
          subtitle="Попробуйте изменить условия поиска или сбросить фильтры."
          action={{
            handler: auditFiltersReset,
            buttonName: 'Сбросить фильтры',
          }}
        />
      )}
      {!isError && data?.totalPages !== 0 && (
        <PaginationControl
          totalPages={data?.totalPages}
          isDisabled={isLoading}
        />
      )}
    </>
  );
};

export default AuditPage;

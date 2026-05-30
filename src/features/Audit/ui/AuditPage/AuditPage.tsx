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

const AuditPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stringifySearchParams = searchParams.toString();
  const breadcrumbsRoute = getBreadcrumbsRoute(pathname);

  const { pagination, reviewers, comments, users, auditFiltersReset } =
    useAuditData(stringifySearchParams);

  const isPaginationDataLoaded =
    pagination.status === 'success' || pagination.status === 'error';
  const isPaginationError = pagination.status === 'error';

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
            { label: 'Всего действий:', value: pagination.data?.total },
            { label: 'Страница:', value: pagination.data?.page },
            {
              label: 'Действий на странице:',
              value: pagination.data?.pageSize,
            },
            { label: 'Активные фильтры:', value: activeFiltersCount },
          ]}
          isLoading={!isPaginationDataLoaded}
        />
      }
      <AuditFilterBar
        searchParams={stringifySearchParams}
        users={users}
        isDisabled={!isPaginationDataLoaded || isPaginationError}
        handleFiltersReset={auditFiltersReset}
      />
      {isPaginationDataLoaded ? (
        isPaginationError ? (
          pagination.errorProps && <ErrorState {...pagination.errorProps} />
        ) : pagination.data && pagination.data.items.length !== 0 ? (
          <AuditTable
            audit={pagination.data.items}
            users={users}
            reviewers={reviewers}
            comments={comments}
          />
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
        )
      ) : (
        <AuditTableSkeleton />
      )}
      {isPaginationDataLoaded &&
        !pagination.errorProps &&
        pagination.data &&
        pagination.data.items &&
        pagination.data.items.length !== 0 && (
          <PaginationControl
            totalPages={pagination.data?.totalPages}
            isDisabled={pagination.status !== 'success'}
          />
        )}
    </>
  );
};

export default AuditPage;

'use client';

import { breadcrumbsDictionary } from '@/shared/lib/routes/dictionary';
import { getBreadcrumbsRoute } from '@/shared/lib/routes/utils';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import { MenuItem, Pagination, Select, Stack, Typography } from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation';
import useAuditData from '../../model/useAuditData';
import { useMemo } from 'react';
import AuditInfo from '../AuditInfo/AuditInfo';
import AuditInfoSkeleton from '../AuditInfo/AuditInfoSkeleton';
import AuditFilterBar from '../AuditFilterBar/AuditFilterBar';
import AuditTable from '../AuditTable/AuditTable';
import AuditTableSkeleton from '../AuditTable/AuditTableSkeleton';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import { styles } from './styles';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/shared/config/layout';
import { PageSize } from '@/shared/types/primitives.types';
import { isPageSize } from '@/shared/utils/typeGuards';
import parsePositiveInt from '@/shared/utils/parsePositiveInt';

const AuditPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stringifySearchParams = searchParams.toString();
  const breadcrumbsRoute = getBreadcrumbsRoute(pathname);

  const {
    pagination,
    reviewers,
    comments,
    users,
    auditFiltersReset,
    handlePageChange,
    handlePageSizeChange,
  } = useAuditData(stringifySearchParams);

  const isPaginationDataLoaded =
    pagination.status === 'success' || pagination.status === 'error';
  const isPaginationError = pagination.status === 'error';

  const selectedPageSize = useMemo((): PageSize => {
    const queryPageSize = searchParams.get('pageSize');

    if (!queryPageSize) return DEFAULT_PAGE_SIZE;

    const parsedPageSize = Number(queryPageSize);

    if (!isPageSize(parsedPageSize)) return DEFAULT_PAGE_SIZE;

    return parsedPageSize;
  }, [searchParams]);
  const selectedPage = useMemo(
    () => parsePositiveInt(searchParams.get('page'), 1),
    [searchParams],
  );
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

  const sx = styles();

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
      {isPaginationDataLoaded ? (
        !isPaginationError &&
        pagination.data && (
          <AuditInfo
            totalAuditCount={pagination.data.total}
            selectedPage={pagination.data.page}
            selectedPageSize={pagination.data.pageSize}
            filtersCount={activeFiltersCount}
          />
        )
      ) : (
        <AuditInfoSkeleton />
      )}
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
          <Stack direction="row" spacing={4} sx={sx.paginationWrapper}>
            <Pagination
              count={pagination.data?.totalPages ?? 1}
              page={selectedPage}
              disabled={pagination.status !== 'success'}
              onChange={(_, page) => handlePageChange(page)}
            />
            <Select
              value={selectedPageSize}
              onChange={(event) => handlePageSizeChange(event.target.value)}
              disabled={pagination.status !== 'success'}
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <MenuItem key={`Select-option-${option}`} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        )}
    </>
  );
};

export default AuditPage;

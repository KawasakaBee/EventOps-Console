'use client';

import Button from '@/shared/ui/Button/Button';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import {
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import parsePositiveInt from '@/shared/utils/parsePositiveInt';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/shared/config/layout';
import { isPageSize } from '@/shared/utils/typeGuards';
import { PageSize } from '@/shared/types/primitives.types';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { styles } from './styles';
import toLoadableResource from '@/shared/utils/toLoadableResource';
import useProposalsPageData from '../../model/useProposalsListData';
import { closeStatusTransition } from '@/features/ProposalStatusTransition/model/proposalStatusTransitionSlice';
import ProposalsBulkActions from '../ProposalsBulkActions/ProposalsBulkActions';
import ProposalsFilterBar from '../ProposalsFilterBar/ProposalsFilterBar';
import ProposalsInfo from '../ProposalsInfo/ProposalsInfo';
import ProposalsInfoSkeleton from '../ProposalsInfo/ProposalsInfoSkeleton';
import ProposalsTableSkeleton from '../ProposalsTable/ProposalsTableSkeleton';
import ProposalsTable from '../ProposalsTable/ProposalsTable';
import ProposalStatusTransitionDialog from '@/features/ProposalStatusTransition/ui/ProposalStatusTransitionDialog';
import getCommonAvailableStatuses from '../../model/getCommonAvailableStatuses';
import { getBreadcrumbsRoute } from '@/shared/lib/routes/utils';
import { breadcrumbsDictionary } from '@/shared/lib/routes/dictionary';

const ProposalsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const breadcrumbsRoute = getBreadcrumbsRoute(pathname);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const {
    pagination,
    user,
    tracks,
    reviewers,
    multipleErrorsCount,
    handleStatusSuccess,
    handleMultipleStatusSuccess,
    closeErrorSnackbar,
    handleFiltersReset,
  } = useProposalsPageData(searchParamsString);

  const [isExportSnackbarOpen, setIsExportSnackbarOpen] =
    useState<boolean>(false);

  const isDataReady =
    pagination.status === 'success' && user.status === 'success';
  const isPageUnavailable =
    pagination.status !== 'success' || user.status !== 'success';
  const isInitialLoading =
    pagination.status === 'idle' ||
    pagination.status === 'loading' ||
    user.status === 'idle' ||
    user.status === 'loading';
  const criticalErrorProps = user.errorProps ?? pagination.errorProps;

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

  const transition = useAppSelector(
    (store) => store.statusTransition.transition,
  );
  const selectedIds = useAppSelector(
    (store) => store.proposalsFilters.selectedIds,
  );

  const proposalList = pagination.data?.items;
  const {
    selectedProposalsMultipleStatuses,
    availableProposalsMultipleStatuses,
  } = getCommonAvailableStatuses(proposalList, selectedIds);

  const tracksToResource = toLoadableResource(
    tracks.status,
    tracks.data,
    'Трек не удалось загрузить',
  );
  const reviewersToResource = toLoadableResource(
    reviewers.status,
    reviewers.data,
    'Данные ревьюера не удалось загрузить',
  );

  const sx = styles();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', String(page));

    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageSizeChange = (value: unknown) => {
    const pageSize = Number(value);

    if (!isPageSize(pageSize)) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set('pageSize', String(pageSize));
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleOpenExportSnackbar = () => {
    setIsExportSnackbarOpen(true);
  };

  const handleCloseExportSnackbar = () => {
    setIsExportSnackbarOpen(false);
  };

  const handleStatusDialogClose = () => {
    dispatch(closeStatusTransition());
  };

  return (
    <>
      <PageHeader
        mode="outer"
        pageName={
          breadcrumbsRoute ? breadcrumbsDictionary[breadcrumbsRoute] : null
        }
        title={
          <Typography variant="h3">
            Управление докладами, ревью и статусами программы
          </Typography>
        }
      >
        <Stack direction="row" spacing={2}>
          {user.data && proposalList && isDataReady ? (
            <ProposalsBulkActions
              user={user.data}
              proposals={proposalList}
              selectedIds={selectedIds}
              isDisabled={isPageUnavailable}
              availableStatuses={availableProposalsMultipleStatuses()}
              currentStatuses={selectedProposalsMultipleStatuses}
            />
          ) : (
            <Skeleton variant="text" width={300} />
          )}
          <Button
            mode="button"
            variant="outlined"
            size="small"
            isDisabled={isPageUnavailable}
            onClick={handleOpenExportSnackbar}
          >
            Экспорт
          </Button>
        </Stack>
      </PageHeader>
      {isInitialLoading ? (
        <ProposalsInfoSkeleton />
      ) : (
        isDataReady &&
        pagination.data && (
          <ProposalsInfo
            totalProposalsCount={pagination.data.total}
            selectedPage={selectedPage}
            selectedPageSize={selectedPageSize}
            filtersCount={activeFiltersCount}
          />
        )
      )}
      <ProposalsFilterBar
        searchParams={searchParams}
        isDisabled={isPageUnavailable}
        tracks={tracksToResource}
        reviewers={reviewersToResource}
        handleResetFilters={handleFiltersReset}
      />
      {isInitialLoading ? (
        <ProposalsTableSkeleton />
      ) : (pagination.status === 'error' || user.status === 'error') &&
        criticalErrorProps ? (
        <ErrorState {...criticalErrorProps} />
      ) : isDataReady &&
        proposalList &&
        proposalList.length !== 0 &&
        user.data ? (
        <ProposalsTable
          proposals={proposalList}
          tracks={tracksToResource}
          role={user.data.role}
        />
      ) : isDataReady && activeFiltersCount === 0 ? (
        <EmptyState
          title="Заявок пока нет"
          subtitle="Когда спикеры отправят заявки, они появятся в этом списке."
        />
      ) : (
        isDataReady && (
          <EmptyState
            title="По текущим фильтрам ничего не найдено"
            subtitle="Попробуйте изменить условия поиска или сбросить фильтры."
            action={{
              handler: handleFiltersReset,
              buttonName: 'Сбросить фильтры',
            }}
          />
        )
      )}
      {isDataReady &&
        !criticalErrorProps &&
        proposalList &&
        proposalList.length !== 0 && (
          <Stack direction="row" spacing={4} sx={sx.paginationWrapper}>
            <Pagination
              count={pagination.data?.totalPages ?? 1}
              page={selectedPage}
              disabled={isInitialLoading}
              onChange={(_, page) => handlePageChange(page)}
            />
            <Select
              value={selectedPageSize}
              onChange={(event) => handlePageSizeChange(event.target.value)}
              disabled={isInitialLoading}
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <MenuItem key={`Select-option-${option}`} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        )}
      {transition.type === 'single' && (
        <ProposalStatusTransitionDialog
          mode="single"
          prevStatus={transition.prevStatus}
          nextStatus={transition.nextStatus}
          id={transition.id}
          onClose={handleStatusDialogClose}
          onSuccess={handleStatusSuccess}
        />
      )}
      {transition.type === 'multiple' && (
        <ProposalStatusTransitionDialog
          mode="multiple"
          prevStatus={transition.prevStatus}
          nextStatus={transition.nextStatus}
          ids={transition.ids}
          onClose={handleStatusDialogClose}
          onSuccess={handleMultipleStatusSuccess}
        />
      )}
      <Snackbar
        open={isExportSnackbarOpen}
        message="Функция появится в ближайшее время!"
        onClose={handleCloseExportSnackbar}
        autoHideDuration={6000}
        sx={sx.exportSnackbar}
      />
      <Snackbar
        open={!!multipleErrorsCount}
        message={`У некоторых заявок не удалось изменить статус: ${multipleErrorsCount}`}
        onClose={closeErrorSnackbar}
        autoHideDuration={6000}
        sx={sx.exportSnackbar}
      />
    </>
  );
};

export default ProposalsPage;

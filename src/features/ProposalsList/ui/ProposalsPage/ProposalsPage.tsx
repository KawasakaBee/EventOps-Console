'use client';

import Button from '@/shared/ui/Button/Button';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import { Skeleton, Snackbar, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import parsePositiveInt from '@/shared/utils/parsePositiveInt';
import { DEFAULT_PAGE_SIZE } from '@/shared/config/layout';
import { isPageSize } from '@/shared/utils/typeGuards';
import { PageSize } from '@/shared/types/primitives.types';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { styles } from './styles';
import useProposalsPageData from '../../model/useProposalsListData';
import { closeStatusTransition } from '@/features/ProposalStatusTransition/model/proposalStatusTransitionSlice';
import ProposalsBulkActions from '../ProposalsBulkActions/ProposalsBulkActions';
import ProposalsFilterBar from '../ProposalsFilterBar/ProposalsFilterBar';
import ProposalsTableSkeleton from '../ProposalsTable/ProposalsTableSkeleton';
import ProposalsTable from '../ProposalsTable/ProposalsTable';
import ProposalStatusTransitionDialog from '@/features/ProposalStatusTransition/ui/ProposalStatusTransitionDialog';
import getCommonAvailableStatuses from '../../model/getCommonAvailableStatuses';
import { getBreadcrumbsRoute } from '@/shared/lib/routes/utils';
import { breadcrumbsDictionary } from '@/shared/lib/routes/dictionary';
import ReviewerAssignDialog from '@/features/ReviewerAssign/ui/ReviewerAssignDialog';
import { closeAssignReviewer } from '@/features/ReviewerAssign/model/reviewerAssignSlice';
import ReviewCreateDialog from '@/features/ReviewCreate/ui/ReviewCreateDialog';
import { closeCreateReviewDialog } from '@/features/ReviewCreate/model/reviewCreateSlice';
import PaginationControl from '@/shared/ui/PaginationControl/PaginationControl';
import InfoCards from '@/shared/ui/InfoCards/InfoCards';
import { useAuth } from '@/entities/user/model/AuthProvider';
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import getProposalsErrorState from '../../model/getProposalsErrorState';

const ProposalsPage = () => {
  const pathname = usePathname();
  const breadcrumbsRoute = getBreadcrumbsRoute(pathname);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const { user } = useAuth();

  const {
    pagination,
    multipleErrorsCount,
    multipleAssignErrorsCount,
    handleMultipleStatusSuccess,
    handleMultipleAssignReviewerSuccess,
    closeErrorSnackbar,
    closeAssignErrorSnackbar,
    handleFiltersReset,
  } = useProposalsPageData(searchParamsString);

  const [isExportSnackbarOpen, setIsExportSnackbarOpen] =
    useState<boolean>(false);

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
  const assingReviewer = useAppSelector(
    (store) => store.assignReviewer.assignReviewer,
  );
  const createReview = useAppSelector(
    (store) => store.createReview.createReview,
  );
  const selectedIds = useAppSelector(
    (store) => store.proposalsFilters.selectedIds,
  );

  const proposalList = pagination.data?.items;
  const {
    selectedProposalsMultipleStatuses,
    availableProposalsMultipleStatuses,
  } = getCommonAvailableStatuses(proposalList, selectedIds);

  const sx = styles();

  const handleOpenExportSnackbar = () => {
    setIsExportSnackbarOpen(true);
  };

  const handleCloseExportSnackbar = () => {
    setIsExportSnackbarOpen(false);
  };

  const handleStatusDialogClose = () => {
    dispatch(closeStatusTransition());
  };

  const handleReviewerAssignDialogClose = () => {
    dispatch(closeAssignReviewer());
  };

  const handleReviewCreateDialogClose = () => {
    dispatch(closeCreateReviewDialog());
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
          {pagination.isLoading ? (
            <Skeleton variant="text" width={300} />
          ) : (
            <ProposalsBulkActions
              userRole={user.role}
              proposals={proposalList ?? []}
              selectedIds={selectedIds}
              isDisabled={!pagination.isSuccess}
              availableStatuses={availableProposalsMultipleStatuses()}
              currentStatuses={selectedProposalsMultipleStatuses}
            />
          )}
          <Button
            mode="button"
            variant="outlined"
            size="small"
            isDisabled={!pagination.isSuccess}
            onClick={handleOpenExportSnackbar}
          >
            Экспорт
          </Button>
        </Stack>
      </PageHeader>
      {
        <InfoCards
          items={[
            { label: 'Всего заявок:', value: pagination.data?.total },
            { label: 'Страница:', value: selectedPage },
            { label: 'Заявок на странице:', value: selectedPageSize },
            { label: 'Активные фильтры:', value: activeFiltersCount },
          ]}
          isLoading={pagination.isLoading}
        />
      }
      <ProposalsFilterBar
        searchParams={searchParams}
        isDisabled={!pagination.isSuccess}
        handleResetFilters={handleFiltersReset}
      />
      {pagination.isLoading ? (
        <ProposalsTableSkeleton />
      ) : pagination.isError ? (
        isAppBaseQueryError(pagination.error) && (
          <ErrorState
            {...getProposalsErrorState(pagination.error.error, {
              retry: pagination.refetch,
              resetFilters: handleFiltersReset,
            })}
          />
        )
      ) : proposalList && proposalList.length !== 0 ? (
        <ProposalsTable proposals={proposalList} role={user.role} />
      ) : pagination.isSuccess && activeFiltersCount === 0 ? (
        <EmptyState
          title="Заявок пока нет"
          subtitle="Когда спикеры отправят заявки, они появятся в этом списке."
        />
      ) : (
        pagination.isSuccess && (
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
      {!pagination.isError && pagination.data?.totalPages !== 0 && (
        <PaginationControl
          totalPages={pagination.data?.totalPages}
          isDisabled={pagination.isLoading}
        />
      )}
      {transition.type === 'single' && (
        <ProposalStatusTransitionDialog
          mode="single"
          prevStatus={transition.prevStatus}
          nextStatus={transition.nextStatus}
          proposalId={transition.id}
          onClose={handleStatusDialogClose}
        />
      )}
      {transition.type === 'multiple' && (
        <ProposalStatusTransitionDialog
          mode="multiple"
          prevStatus={transition.prevStatus}
          nextStatus={transition.nextStatus}
          proposalIds={transition.ids}
          onClose={handleStatusDialogClose}
          onSuccess={handleMultipleStatusSuccess}
        />
      )}
      {assingReviewer.type === 'single' && (
        <ReviewerAssignDialog
          mode="single"
          onClose={handleReviewerAssignDialogClose}
          proposalId={assingReviewer.id}
        />
      )}
      {assingReviewer.type === 'multiple' && (
        <ReviewerAssignDialog
          mode="multiple"
          onClose={handleReviewerAssignDialogClose}
          proposalIds={assingReviewer.ids}
          onSuccess={handleMultipleAssignReviewerSuccess}
        />
      )}
      {createReview.type === 'open' && (
        <ReviewCreateDialog
          onClose={handleReviewCreateDialogClose}
          proposalId={createReview.id}
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
      <Snackbar
        open={!!multipleAssignErrorsCount}
        message={`Для некоторых заявок не удалось назначить ревьюера: ${multipleAssignErrorsCount}`}
        onClose={closeAssignErrorSnackbar}
        autoHideDuration={6000}
        sx={sx.exportSnackbar}
      />
    </>
  );
};

export default ProposalsPage;

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
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { GetProposalsListResponse } from '@/shared/api/contracts/proposal.contract';
import { ProposalListItem } from '@/entities/proposal/model/types';
import { fetchWithDemoAuth } from '@/shared/api/fetchWithDemoAuth';
import { PaginationEnvelope } from '@/shared/types/api.types';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import parsePositiveInt from '@/shared/utils/parsePositiveInt';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/shared/config/layout';
import { isPageSize } from '@/shared/utils/typeGuards';
import { PageSize, PageStatus } from '@/shared/types/primitives.types';
import ProposalsFilterBar from '@/features/Proposals/ui/ProposalsFilterBar/ProposalsFilterBar';
import { Track } from '@/entities/track/model/types';
import { GetTracksResponse } from '@/shared/api/contracts/track.contract';
import { ReviewerListItem } from '@/entities/review/model/types';
import { GetReviewersResponse } from '@/shared/api/contracts/reviewer.contract';
import ProposalsTable from '@/features/Proposals/ui/ProposalsTable/ProposalsTable';
import { User } from '@/entities/user/model/types';
import getCurrentUser from '@/shared/utils/getCurrentUser';
import ProposalsTableSkeleton from '@/features/Proposals/ui/ProposalsTable/ProposalsTableSkeleton';
import ProposalsInfo from '@/features/Proposals/ui/ProposalsInfo/ProposalsInfo';
import ProposalsInfoSkeleton from '@/features/Proposals/ui/ProposalsInfo/ProposalsInfoSkeleton';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import {
  resetFilters,
  resetSelectedIds,
} from '@/features/Proposals/model/proposalsFiltersSlice';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import normalizeResponse from '@/shared/api/normalizeResponse';
import getProposalsErrorState from '@/features/Proposals/model/getProposalsErrorState';
import ProposalsBulkActions from '@/features/Proposals/ui/ProposalsBulkActions/ProposalsBulkActions';
import { useAppDispatch } from '@/shared/store/hooks';
import { styles } from './styles';

const ProposalsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const [tracksStatus, setTracksStatus] = useState<PageStatus>('idle');
  const [reviewersStatus, setReviewersStatus] = useState<PageStatus>('idle');
  const [userStatus, setUserStatus] = useState<PageStatus>('idle');
  const [pageStatus, setPageStatus] = useState<PageStatus>('idle');
  const [pageErrorProps, setPageErrorProps] = useState<ErrorStateProps | null>(
    null,
  );
  const [userErrorProps, setUserErrorProps] = useState<ErrorStateProps | null>(
    null,
  );
  const [pagination, setPagination] =
    useState<PaginationEnvelope<ProposalListItem> | null>(null);
  const [tracksList, setTracksList] = useState<Track[]>([]);
  const [reviewersList, setReviewersList] = useState<ReviewerListItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isExportSnackbarOpen, setIsExportSnackbarOpen] =
    useState<boolean>(false);

  const isDataReady = pageStatus === 'success' && userStatus === 'success';
  const isPageUnavailable =
    pageStatus !== 'success' || userStatus !== 'success';
  const isInitialLoading =
    pageStatus === 'idle' ||
    pageStatus === 'loading' ||
    userStatus === 'idle' ||
    userStatus === 'loading';
  const criticalErrorProps = userErrorProps ?? pageErrorProps;

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

  const searchParamsString = searchParams.toString();
  const proposalList = pagination?.items;
  const sx = styles();

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());

    router.push(pathname);
  }, [dispatch, pathname, router]);

  useEffect(() => {
    const getTracks = async () => {
      setTracksStatus('loading');
      setTracksList([]);

      const response = await fetchWithDemoAuth('/api/tracks');

      if (!response.ok) {
        setTracksList([]);
        setTracksStatus('error');
        return;
      }

      const result = await normalizeResponse<GetTracksResponse>(response.data);

      if (!result.ok) {
        setTracksList([]);
        setTracksStatus('error');
        return;
      }

      setTracksList(result.data.tracks);
      setTracksStatus('success');
    };

    const getReviewersList = async () => {
      setReviewersStatus('loading');
      setReviewersList([]);

      const response = await fetchWithDemoAuth('/api/reviewers');

      if (!response.ok) {
        setReviewersList([]);
        setReviewersStatus('error');
        return;
      }

      const result = await normalizeResponse<GetReviewersResponse>(
        response.data,
      );

      if (!result.ok) {
        setReviewersList([]);
        setReviewersStatus('error');
        return;
      }

      setReviewersList(result.data.reviewers);
      setReviewersStatus('success');
    };

    const getUser = async () => {
      const getErrorActions = () => ({
        retry: getUser,
        resetFilters: handleResetFilters,
      });

      setUserStatus('loading');
      setUserErrorProps(null);

      const response = await getCurrentUser();

      if (!response.ok) {
        setUser(null);
        setUserStatus('error');
        setUserErrorProps(
          getProposalsErrorState(response.error, getErrorActions()),
        );
        return;
      }

      setUser(response.data);
      setUserStatus('success');
    };

    getTracks();
    getReviewersList();
    getUser();
  }, [handleResetFilters]);

  useEffect(() => {
    let isActual = true;

    const getPagination = async () => {
      const getErrorActions = () => ({
        retry: getPagination,
        resetFilters: handleResetFilters,
      });

      setPageStatus('loading');
      setPageErrorProps(null);

      const response = await fetchWithDemoAuth(
        searchParamsString
          ? `/api/proposals?${searchParamsString}`
          : '/api/proposals',
      );

      if (!isActual) return;

      if (!response.ok) {
        setPagination(null);
        setPageStatus('error');
        setPageErrorProps(
          getProposalsErrorState(response.error, getErrorActions()),
        );
        return;
      }

      const result = await normalizeResponse<GetProposalsListResponse>(
        response.data,
      );

      if (!result.ok) {
        setPagination(null);
        setPageStatus('error');
        setPageErrorProps(
          getProposalsErrorState(result.error, getErrorActions()),
        );
        return;
      }

      setPagination(result.data);
      setPageStatus('success');
    };

    getPagination();
    dispatch(resetSelectedIds());

    return () => {
      isActual = false;
    };
  }, [searchParamsString, handleResetFilters, dispatch]);

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

  return (
    <>
      <PageHeader
        title="Заявки"
        subtitle="Управление докладами, ревью и статусами программы "
      >
        <Stack direction="row" spacing={2}>
          {user && proposalList && isDataReady ? (
            <ProposalsBulkActions
              user={user}
              proposals={proposalList}
              isDisabled={isPageUnavailable}
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
        pagination && (
          <ProposalsInfo
            totalProposalsCount={pagination.total}
            selectedPage={selectedPage}
            selectedPageSize={selectedPageSize}
            filtersCount={activeFiltersCount}
          />
        )
      )}
      <ProposalsFilterBar
        searchParams={searchParams}
        isDisabled={isPageUnavailable}
        tracks={tracksList}
        tracksStatus={tracksStatus}
        reviewers={reviewersList}
        reviewersStatus={reviewersStatus}
        handleResetFilters={handleResetFilters}
      />
      {isInitialLoading ? (
        <ProposalsTableSkeleton />
      ) : (pageStatus === 'error' || userStatus === 'error') &&
        criticalErrorProps ? (
        <ErrorState {...criticalErrorProps} />
      ) : isDataReady && proposalList && proposalList.length !== 0 && user ? (
        <ProposalsTable
          proposals={proposalList}
          tracks={tracksList}
          role={user.role}
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
              handler: handleResetFilters,
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
              count={pagination?.totalPages ?? 1}
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
      <Snackbar
        open={isExportSnackbarOpen}
        message="Функция появится в ближайшее время!"
        onClose={handleCloseExportSnackbar}
        autoHideDuration={6000}
        sx={sx.exportSnackbar}
      />
    </>
  );
};

export default ProposalsPage;

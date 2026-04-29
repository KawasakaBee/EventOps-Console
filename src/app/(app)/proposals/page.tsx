'use client';

import Button from '@/shared/ui/Button/Button';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import { MenuItem, Pagination, Select, Stack } from '@mui/material';
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
import ProposalsFilterBar from '@/features/ProposalsList/ui/ProposalsFilterBar/ProposalsFilterBar';
import { Track } from '@/entities/track/model/types';
import { GetTracksResponse } from '@/shared/api/contracts/track.contract';
import { ReviewerListItem } from '@/entities/review/model/types';
import { GetReviewersResponse } from '@/shared/api/contracts/reviewer.contract';
import { styles } from './styles';
import ProposalsTable from '@/features/ProposalsList/ui/ProposalsTable/ProposalsTable';
import { User } from '@/entities/user/model/types';
import getCurrentUser from '@/shared/utils/getCurrentUser';
import ProposalsTableSkeleton from '@/features/ProposalsList/ui/ProposalsTable/ProposalsTableSkeleton';
import ProposalsInfo from '@/features/ProposalsList/ui/ProposalsInfo/ProposalsInfo';
import ProposalsInfoSkeleton from '@/features/ProposalsList/ui/ProposalsInfo/ProposalsInfoSkeleton';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import { useDispatch } from 'react-redux';
import { resetFilters } from '@/features/ProposalsList/model/proposalsFiltersSlice';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import normalizeResponse from '@/shared/api/normalizeResponse';
import getProposalErrorState from '@/features/ProposalsList/model/getProposalErrorState';

const Proposals = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

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

  const isPageAndUserLoaded =
    pageStatus === 'success' && userStatus === 'success';
  const isPageOrUserNotLoaded =
    pageStatus !== 'success' || userStatus !== 'success';
  const isPageOrUserLoadingNow =
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
          getProposalErrorState(response.error, getErrorActions()),
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

      if (!response.ok) {
        setPagination(null);
        setPageStatus('error');
        setPageErrorProps(
          getProposalErrorState(response.error, getErrorActions()),
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
          getProposalErrorState(result.error, getErrorActions()),
        );
        return;
      }

      setPagination(result.data);
      setPageStatus('success');
    };

    getPagination();
  }, [searchParamsString, handleResetFilters]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', String(page));

    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageSizeChange = (pageSize: PageSize) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('pageSize', String(pageSize));
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <PageHeader
        title="Заявки"
        subtitle="Управление докладами, ревью и статусами программы "
      >
        <Stack direction="row" spacing={2}>
          <Button
            mode="button"
            variant="contained"
            size="small"
            isDisabled={isPageOrUserNotLoaded}
          >
            Bulk actions
          </Button>
          <Button
            mode="button"
            variant="outlined"
            size="small"
            isDisabled={isPageOrUserNotLoaded}
          >
            Экспорт
          </Button>
        </Stack>
      </PageHeader>
      {isPageOrUserLoadingNow ? (
        <ProposalsInfoSkeleton />
      ) : (
        isPageAndUserLoaded &&
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
        isDisabled={isPageOrUserNotLoaded}
        tracks={tracksList}
        tracksStatus={tracksStatus}
        reviewers={reviewersList}
        reviewersStatus={reviewersStatus}
        handleResetFilters={handleResetFilters}
      />
      {isPageOrUserLoadingNow ? (
        <ProposalsTableSkeleton />
      ) : (pageStatus === 'error' || userStatus === 'error') &&
        criticalErrorProps ? (
        <ErrorState {...criticalErrorProps} />
      ) : isPageAndUserLoaded &&
        proposalList &&
        proposalList.length !== 0 &&
        user ? (
        <ProposalsTable
          proposals={proposalList}
          tracks={tracksList}
          role={user.role}
        />
      ) : isPageAndUserLoaded && activeFiltersCount === 0 ? (
        <EmptyState
          title="Заявок пока нет"
          subtitle="Когда спикеры отправят заявки, они появятся в этом списке."
        />
      ) : (
        isPageAndUserLoaded && (
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
      {isPageAndUserLoaded &&
        !criticalErrorProps &&
        proposalList &&
        proposalList.length !== 0 && (
          <Stack direction="row" spacing={4} sx={sx.paginationWrapper}>
            <Pagination
              count={pagination?.totalPages ?? 1}
              page={selectedPage}
              disabled={isPageOrUserLoadingNow}
              onChange={(_, page) => handlePageChange(page)}
            />
            <Select
              value={selectedPageSize}
              onChange={(event) => handlePageSizeChange(event.target.value)}
              disabled={isPageOrUserLoadingNow}
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

export default Proposals;

'use client';

import Button from '@/shared/ui/Button/Button';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import {
  CircularProgress,
  Grid,
  MenuItem,
  Pagination,
  Select,
  Stack,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { GetProposalsListResponse } from '@/shared/api/contracts/proposal.contract';
import { ProposalListItem } from '@/entities/proposal/model/types';
import { fetchWithDemoAuth } from '@/shared/api/fetchWithDemoAuth';
import { PaginationEnvelope } from '@/shared/types/api.types';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import parsePositiveInt from '@/shared/utils/parsePositiveInt';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/shared/config/layout';
import { isPageSize } from '@/shared/utils/typeGuards';
import { PageSize } from '@/shared/types/primitives.types';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import ProposalsFilterBar from '@/components/ProposalsFilterBar/ProposalsFilterBar';
import { Track } from '@/entities/track/model/types';
import { GetTracksResponse } from '@/shared/api/contracts/track.contract';
import { ReviewerListItem } from '@/entities/review/model/types';
import { GetReviewersResponse } from '@/shared/api/contracts/reviewer.contract';
import { styles } from './styles';
import ProposalsTable from '@/components/ProposalsTable/ProposalsTable';
import { User } from '@/entities/user/model/types';
import getCurrentUser from '@/shared/utils/getCurrentUser';

const Proposals = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagination, setPagination] =
    useState<PaginationEnvelope<ProposalListItem> | null>(null);
  const [tracksList, setTracksList] = useState<Track[]>([]);
  const [reviewersList, setReviewersList] = useState<ReviewerListItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

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

    return filters.size;
  }, [searchParams]);

  const proposalList = pagination?.items;
  const sx = styles();

  useEffect(() => {
    const getTracks = async () => {
      try {
        const response = await fetchWithDemoAuth('/api/tracks');

        if (!response.ok) return;

        const parsedResponse: GetTracksResponse = await response.json();
        setTracksList(parsedResponse.tracks);
      } catch (err) {
        console.error(err);
      }
    };

    const getReviewersList = async () => {
      try {
        const response = await fetchWithDemoAuth('/api/reviewers');

        if (!response.ok) return;

        const parsedResponse: GetReviewersResponse = await response.json();
        setReviewersList(parsedResponse.reviewers);
      } catch (err) {
        console.error(err);
      }
    };

    const getUser = async () => {
      try {
        const response = await getCurrentUser();

        if (!response) return;

        setUser(response);
      } catch (err) {
        console.error(err);
      }
    };

    getTracks();
    getReviewersList();
    getUser();
  }, []);

  useEffect(() => {
    const getPagination = async () => {
      try {
        setIsLoading(true);

        const queryString = searchParams.toString();

        const response = await fetchWithDemoAuth(
          queryString ? `/api/proposals?${queryString}` : '/api/proposals',
        );

        if (!response.ok) return;

        const parsedResponse: GetProposalsListResponse = await response.json();
        setPagination(parsedResponse);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getPagination();
  }, [searchParams]);

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
          <Button mode="button" variant="contained" size="small">
            Bulk actions
          </Button>
          <Button mode="button" variant="outlined" size="small">
            Экспорт
          </Button>
        </Stack>
      </PageHeader>
      {pagination && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={3}>
            <SectionCard title="Всего заявок: ">{pagination.total}</SectionCard>
          </Grid>
          <Grid size={3}>
            <SectionCard title="Страница: ">{selectedPage}</SectionCard>
          </Grid>
          <Grid size={3}>
            <SectionCard title="Заявок на странице: ">
              {selectedPageSize}
            </SectionCard>
          </Grid>
          <Grid size={3}>
            <SectionCard title="Активные фильтры: ">
              {activeFiltersCount}
            </SectionCard>
          </Grid>
        </Grid>
      )}
      {tracksList && (
        <ProposalsFilterBar
          searchParams={searchParams}
          isLoading={isLoading}
          tracks={tracksList}
          reviewers={reviewersList}
        />
      )}
      {isLoading ? (
        <CircularProgress />
      ) : (
        proposalList &&
        proposalList.length !== 0 &&
        user && (
          <ProposalsTable
            proposals={proposalList}
            tracks={tracksList}
            role={user.role}
          />
        )
      )}
      <Stack direction="row" spacing={4} sx={sx.paginationWrapper}>
        <Pagination
          count={pagination?.totalPages ?? 1}
          page={selectedPage}
          disabled={isLoading}
          onChange={(_, page) => handlePageChange(page)}
        />
        <Select
          value={selectedPageSize}
          onChange={(event) => handlePageSizeChange(event.target.value)}
          disabled={isLoading}
        >
          {PAGE_SIZE_OPTIONS.map((option) => (
            <MenuItem key={`Select-option-${option}`} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </>
  );
};

export default Proposals;

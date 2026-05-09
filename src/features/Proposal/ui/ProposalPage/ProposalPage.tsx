'use client';

import { fetchWithDemoAuth } from '@/shared/api/fetchWithDemoAuth';
import { PageStatus } from '@/shared/types/primitives.types';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import { Grid, Stack, Typography } from '@mui/material';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import getProposalErrorState from '../../model/getProposalErrorState';
import normalizeResponse from '@/shared/api/normalizeResponse';
import {
  GetProposalResponse,
  PatchProposalStatusResponse,
} from '@/shared/api/contracts/proposal.contract';
import { breadcrumbsDicrionary } from '@/shared/data';
import getBreadcrumbsRoute from '@/shared/utils/getBreadcrumbsRoute';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import { styles } from './styles';
import { Track } from '@/entities/track/model/types';
import { GetTracksResponse } from '@/shared/api/contracts/track.contract';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import ProposalStickyPanel from '../ProposalStickyPanel/ProposalStickyPanel';
import ProposalContent from '../ProposalContent/ProposalContent';
import { ReviewerListItem } from '@/entities/review/model/types';
import { GetReviewersResponse } from '@/shared/api/contracts/reviewer.contract';
import { GetUsersListResponse } from '@/shared/api/contracts/user.contract';
import { UserListItem } from '@/entities/user/model/types';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import {
  addHistory,
  hydrateDetails,
  hydrateProposal,
  resetDetails,
  updateAvailableActions,
} from '../../model/proposalDetailsSlice';
import ProposalStatusTransitionDialog from '@/features/proposal-status-transition/ui/ProposalStatusTransitionDialog';
import {
  hydrateAvailableStatuses,
  removePendingStatus,
  StatusState,
} from '@/features/proposal-status-transition/model/statusTransitionSlice';
import ProposalPageSkeleton from './ProposalPageSkeleton';
import toResource from '@/shared/utils/toResource';

const ProposalPage = () => {
  const pathname = usePathname();
  const proposalId = useParams<{ id: string }>().id;
  const dispatch = useAppDispatch();
  const pageData = useAppSelector((store) => store.proposalDetails);
  const pendingStatus = useAppSelector(
    (store) => store.proposalStatus.pendingStatus,
  );

  const [pageStatus, setPageStatus] = useState<PageStatus>('idle');
  const [tracksStatus, setTracksStatus] = useState<PageStatus>('idle');
  const [usersStatus, setUsersStatus] = useState<PageStatus>('idle');
  const [reviewersStatus, setReviewersStatus] = useState<PageStatus>('idle');
  const [pageErrorProps, setPageErrorProps] = useState<ErrorStateProps | null>(
    null,
  );
  const [tracksList, setTracksList] = useState<Track[]>([]);
  const [reviewersList, setReviewersList] = useState<ReviewerListItem[]>([]);
  const [usersList, setUsersList] = useState<UserListItem[]>([]);

  const breadcrumbsRoute = getBreadcrumbsRoute(pathname);
  const isDataReady = pageStatus === 'success';
  const isInitialLoading = pageStatus === 'idle' || pageStatus === 'loading';
  const isStatusDialogOpened = !!pendingStatus;

  const sx = styles();

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

    const getUsersList = async () => {
      setUsersStatus('loading');
      setUsersList([]);

      const response = await fetchWithDemoAuth('/api/users');

      if (!response.ok) {
        setUsersList([]);
        setUsersStatus('error');
        return;
      }

      const result = await normalizeResponse<GetUsersListResponse>(
        response.data,
      );

      if (!result.ok) {
        setUsersList([]);
        setUsersStatus('error');
        return;
      }

      setUsersList(result.data.users);
      setUsersStatus('success');
    };

    getTracks();
    getReviewersList();
    getUsersList();
  }, []);

  useEffect(() => {
    const getProposalById = async () => {
      const getErrorActions = () => ({
        retry: getProposalById,
      });

      setPageStatus('loading');
      setPageErrorProps(null);

      const response = await fetchWithDemoAuth(`/api/proposals/${proposalId}`);

      if (!response.ok) {
        dispatch(resetDetails());
        setPageErrorProps(
          getProposalErrorState(response.error, getErrorActions()),
        );
        setPageStatus('error');
        return;
      }

      const result = await normalizeResponse<GetProposalResponse>(
        response.data,
      );

      if (!result.ok) {
        dispatch(resetDetails());
        setPageErrorProps(
          getProposalErrorState(result.error, getErrorActions()),
        );
        setPageStatus('error');
        return;
      }

      dispatch(hydrateDetails(result.data));

      const availableStatuses: StatusState['availableStatuses'] = {
        id: result.data.proposal.id,
        statuses: result.data.availableStatuses,
      };

      dispatch(hydrateAvailableStatuses(availableStatuses));
      setPageStatus('success');
    };

    getProposalById();
  }, [proposalId, dispatch]);

  const handleStatusDialogClose = () => {
    dispatch(removePendingStatus());
  };

  const handleStatusChangeSuccess = (result: PatchProposalStatusResponse) => {
    dispatch(hydrateProposal(result.proposal));
    dispatch(addHistory(result.historyEntry));
    dispatch(updateAvailableActions(result.availableActions));

    const availableStatuses: StatusState['availableStatuses'] = {
      id: result.proposal.id,
      statuses: result.availableStatuses,
    };

    dispatch(hydrateAvailableStatuses(availableStatuses));
  };

  const proposalTitle = pageData.proposal?.title ? (
    <Stack direction="row" spacing={2} sx={sx.proposalTitleWrapper}>
      <Typography variant="h2">{pageData.proposal.title}</Typography>
      <StatusChip
        status={pageData.proposal.status}
        shape="square"
        size="medium"
        type="outlined"
      />
    </Stack>
  ) : (
    `Страница заявки ${proposalId}`
  );

  return (
    <>
      {isInitialLoading ? (
        <ProposalPageSkeleton />
      ) : pageStatus === 'error' && pageErrorProps ? (
        <ErrorState {...pageErrorProps} />
      ) : (
        isDataReady && (
          <>
            <PageHeader
              mode="inner"
              pageName={
                breadcrumbsRoute
                  ? breadcrumbsDicrionary[breadcrumbsRoute]
                  : null
              }
              title={proposalTitle}
              to="/proposals"
            >
              {null}
            </PageHeader>
            <Grid container spacing={2}>
              <Grid size="grow">
                <ProposalContent
                  data={pageData}
                  tracks={toResource(
                    tracksStatus,
                    tracksList,
                    'Трек не удалось загрузить',
                  )}
                  reviewersList={toResource(
                    reviewersStatus,
                    reviewersList,
                    'Данные ревьюера недоступны',
                  )}
                  users={toResource(
                    usersStatus,
                    usersList,
                    'Данные автора недоступны',
                  )}
                  speakers={pageData.speakers}
                />
              </Grid>
              <Grid size={2} sx={sx.proposalStickyPanel}>
                <ProposalStickyPanel
                  data={pageData}
                  tracks={toResource(
                    tracksStatus,
                    tracksList,
                    'Трек не удалось загрузить',
                  )}
                />
              </Grid>
            </Grid>
            {pageData.proposal?.status && pendingStatus && (
              <ProposalStatusTransitionDialog
                mode="single"
                prevStatus={pageData.proposal.status}
                nextStatus={pendingStatus}
                id={proposalId}
                open={isStatusDialogOpened}
                onClose={handleStatusDialogClose}
                onSuccess={handleStatusChangeSuccess}
              />
            )}
          </>
        )
      )}
    </>
  );
};

export default ProposalPage;

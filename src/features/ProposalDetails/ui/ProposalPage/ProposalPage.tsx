'use client';

import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import { Grid, Stack, Typography } from '@mui/material';
import { useParams, usePathname } from 'next/navigation';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import { styles } from './styles';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import ProposalStickyPanel from '../ProposalStickyPanel/ProposalStickyPanel';
import ProposalContent from '../ProposalContent/ProposalContent';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import ProposalPageSkeleton from './ProposalPageSkeleton';
import toLoadableResource from '@/shared/utils/toLoadableResource';
import useDetailsPageData from '../../model/useProposalDetailsData';
import { closeStatusTransition } from '@/features/ProposalStatusTransition/model/proposalStatusTransitionSlice';
import ProposalStatusTransitionDialog from '@/features/ProposalStatusTransition/ui/ProposalStatusTransitionDialog';
import { getBreadcrumbsRoute } from '@/shared/lib/routes/utils';
import { breadcrumbsDictionary } from '@/shared/lib/routes/dictionary';

const ProposalPage = () => {
  const pathname = usePathname();
  const proposalId = useParams<{ id: string }>().id;
  const dispatch = useAppDispatch();
  const pageData = useAppSelector((store) => store.proposalDetails);
  const transition = useAppSelector(
    (store) => store.statusTransition.transition,
  );

  const { proposal, tracks, reviewers, users, handleStatusSuccess } =
    useDetailsPageData(proposalId);

  const breadcrumbsRoute = getBreadcrumbsRoute(pathname);
  const isDataReady = proposal.status === 'success';
  const isInitialLoading =
    proposal.status === 'idle' || proposal.status === 'loading';

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
  const usersToResource = toLoadableResource(
    users.status,
    users.data,
    'Данные пользователя не удалось загрузить',
  );

  const sx = styles();

  const handleStatusDialogClose = () => {
    dispatch(closeStatusTransition());
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
      ) : proposal.status === 'error' && proposal.errorProps ? (
        <ErrorState {...proposal.errorProps} />
      ) : (
        isDataReady && (
          <>
            <PageHeader
              mode="inner"
              pageName={
                breadcrumbsRoute
                  ? breadcrumbsDictionary[breadcrumbsRoute]
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
                  tracks={tracksToResource}
                  reviewersList={reviewersToResource}
                  users={usersToResource}
                  speakers={pageData.speakers}
                />
              </Grid>
              <Grid size={2} sx={sx.proposalStickyPanel}>
                <ProposalStickyPanel
                  data={pageData}
                  tracks={tracksToResource}
                />
              </Grid>
            </Grid>
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
          </>
        )
      )}
    </>
  );
};

export default ProposalPage;

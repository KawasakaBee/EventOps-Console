'use client';

import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import { Grid, Stack, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import { styles } from './styles';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import ProposalStickyPanel from '../ProposalStickyPanel/ProposalStickyPanel';
import ProposalContent from '../ProposalContent/ProposalContent';
import ProposalPageSkeleton from './ProposalPageSkeleton';
import useDetailsPageData from '../../model/useProposalDetailsData';
import ProposalStatusTransitionDialog from '@/features/ProposalStatusTransition/ui/ProposalStatusTransitionDialog';
import { breadcrumbsDictionary } from '@/shared/lib/routes/dictionary';
import { useAuth } from '@/entities/user/model/AuthProvider';
import ReviewerAssignDialog from '@/features/ReviewerAssign/ui/ReviewerAssignDialog';
import ReviewCreateDialog from '@/features/ReviewCreate/ui/ReviewCreateDialog';
import CommentAddDialog from '@/features/CommentAdd/ui/CommentAddDialog';
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import getProposalErrorState from '../../model/getProposalErrorState';

const ProposalPage = () => {
  const { user } = useAuth();
  const proposalId = useParams<{ id: string }>().id;

  const {
    pageData,
    assingReviewer,
    transition,
    createReview,
    addComment,
    breadcrumbsRoute,
    handleStatusDialogClose,
    handleReviewerAssignDialogClose,
    handleReviewCreateDialogClose,
    handleCommentAddDialogClose,
  } = useDetailsPageData(proposalId);

  const sx = styles();

  const proposalTitle = pageData.data?.proposal?.title ? (
    <Stack direction="row" spacing={2} sx={sx.proposalTitleWrapper}>
      <Typography variant="h2">{pageData.data.proposal.title}</Typography>
      <StatusChip
        status={pageData.data.proposal.status}
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
      {pageData.isLoading ? (
        <ProposalPageSkeleton />
      ) : pageData.isError ? (
        isAppBaseQueryError(pageData.error) && (
          <ErrorState
            {...getProposalErrorState(pageData.error.error, {
              retry: pageData.refetch,
            })}
          />
        )
      ) : (
        pageData.data && (
          <>
            <PageHeader
              mode="inner"
              pageName={
                breadcrumbsRoute
                  ? breadcrumbsDictionary[breadcrumbsRoute]
                  : null
              }
              title={proposalTitle}
              to={user.role === 'speaker' ? '/my-proposals' : '/proposals'}
            >
              {null}
            </PageHeader>
            <Grid container spacing={2}>
              <Grid size={10}>
                <ProposalContent
                  data={pageData.data}
                  speakers={pageData.data.speakers}
                />
              </Grid>
              <Grid size={2} sx={sx.proposalStickyPanel}>
                <ProposalStickyPanel details={pageData.data} />
              </Grid>
            </Grid>
            {transition.type === 'single' && (
              <ProposalStatusTransitionDialog
                mode="single"
                prevStatus={transition.prevStatus}
                nextStatus={transition.nextStatus}
                proposalId={transition.id}
                onClose={handleStatusDialogClose}
              />
            )}
            {assingReviewer.type === 'single' && (
              <ReviewerAssignDialog
                mode="single"
                onClose={handleReviewerAssignDialogClose}
                proposalId={assingReviewer.id}
                eventIds={assingReviewer.eventIds}
              />
            )}
            {createReview.type === 'open' && (
              <ReviewCreateDialog
                onClose={handleReviewCreateDialogClose}
                proposalId={createReview.id}
              />
            )}
            {addComment.type === 'open' && (
              <CommentAddDialog
                onClose={handleCommentAddDialogClose}
                proposalId={addComment.id}
              />
            )}
          </>
        )
      )}
    </>
  );
};

export default ProposalPage;

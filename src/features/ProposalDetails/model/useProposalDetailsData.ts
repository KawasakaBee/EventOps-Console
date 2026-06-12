import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { ID } from '@/shared/types/primitives.types';
import { closeStatusTransition } from '@/features/ProposalStatusTransition/model/proposalStatusTransitionSlice';
import { closeAssignReviewer } from '@/features/ReviewerAssign/model/reviewerAssignSlice';
import { closeCreateReviewDialog } from '@/features/ReviewCreate/model/reviewCreateSlice';
import { closeAddCommentDialog } from '@/features/CommentAdd/model/commentAddSlice';
import { usePathname } from 'next/navigation';
import { getBreadcrumbsRoute } from '@/shared/lib/routes/utils';
import { useGetProposalQuery } from '@/entities/proposal/api/proposalApi';

const useProposalDetailsData = (id: ID) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const pageData = useGetProposalQuery(id, { refetchOnMountOrArgChange: true });
  const assignReviewer = useAppSelector(
    (store) => store.assignReviewer.assignReviewer,
  );
  const transition = useAppSelector(
    (store) => store.statusTransition.transition,
  );
  const createReview = useAppSelector(
    (store) => store.createReview.createReview,
  );
  const addComment = useAppSelector((store) => store.addComment.addComment);

  const breadcrumbsRoute = getBreadcrumbsRoute(pathname);

  //   handlers

  const handleStatusDialogClose = () => {
    dispatch(closeStatusTransition());
  };

  const handleReviewerAssignDialogClose = () => {
    dispatch(closeAssignReviewer());
  };

  const handleReviewCreateDialogClose = () => {
    dispatch(closeCreateReviewDialog());
  };

  const handleCommentAddDialogClose = () => {
    dispatch(closeAddCommentDialog());
  };

  return {
    pageData,
    assignReviewer,
    transition,
    createReview,
    addComment,
    breadcrumbsRoute,
    handleStatusDialogClose,
    handleReviewerAssignDialogClose,
    handleReviewCreateDialogClose,
    handleCommentAddDialogClose,
  };
};

export default useProposalDetailsData;

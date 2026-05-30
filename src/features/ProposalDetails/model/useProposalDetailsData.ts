import { useEffect, useState } from 'react';
import { fetchProposal } from '../api/proposalDetailsApi';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import {
  addHistory,
  hydrateAvailableStatuses,
  addComment,
  hydrateDetails,
  hydrateProposal,
  addReview,
  resetDetails,
  updateAvailableActions,
  deleteTemporalComment,
} from './proposalDetailsSlice';
import { ID } from '@/shared/types/primitives.types';
import {
  PatchProposalStatusResponse,
  PostAssignReviewerResponse,
  PostCreateCommentResponse,
  PostCreateReviewResponse,
} from '@/entities/proposal/api/contracts';
import { fetchTracks } from '@/entities/track/api/trackApi';
import { fetchReviewers } from '@/entities/reviewer/api/reviewerApi';
import { ProposalResource } from './types';
import { TracksResource } from '@/entities/track/api/types';
import { ReviewersResource } from '@/entities/reviewer/api/types';
import { UsersResource } from '@/entities/user/api/types';
import { fetchUsers } from '@/entities/user/api/userApi';
import { useAuth } from '@/entities/user/model/AuthProvider';

const useProposalDetailsData = (id: ID) => {
  //state
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const pageData = useAppSelector((store) => store.proposalDetails);

  const [proposal, setProposal] = useState<ProposalResource>({
    status: 'loading',
    errorProps: null,
  });
  const [tracks, setTracks] = useState<TracksResource>({
    status: 'loading',
    data: [],
  });
  const [reviewers, setReviewers] = useState<ReviewersResource>({
    status: 'loading',
    data: [],
  });
  const [users, setUsers] = useState<UsersResource>({
    status: 'loading',
    data: [],
  });

  //   handlers

  const handleStatusSuccess = (result: PatchProposalStatusResponse) => {
    dispatch(hydrateProposal(result.proposal));
    dispatch(addHistory(result.historyEntry));
    dispatch(updateAvailableActions(result.availableActions));
    dispatch(hydrateAvailableStatuses(result.availableStatuses));
  };

  const getProposal = async (id: ID) => {
    dispatch(resetDetails());
    const proposalResource = await fetchProposal(id, () => getProposal(id));
    if (proposalResource.data) {
      dispatch(hydrateDetails(proposalResource.data));
      dispatch(
        hydrateAvailableStatuses(proposalResource.data.availableStatuses),
      );
    }
    setProposal(proposalResource.proposal);
  };

  const handleAssignReviewerSuccess = async (
    result: PostAssignReviewerResponse,
  ) => {
    getProposal(result.proposalId);
  };

  const handleCreateReviewSuccess = async (
    result: PostCreateReviewResponse,
  ) => {
    dispatch(addReview(result.review));
    dispatch(addHistory(result.history));
  };

  const handleAddCommentSubmit = (comment: string) => {
    const tempId = `temp-${crypto.randomUUID()}`;
    const optimisticCommentBody = {
      id: tempId,
      proposalId: id,
      actorId: user.id,
      actorRole: user.role,
      message: comment,
      createdAt: new Date().toISOString(),
    };

    dispatch(addComment(optimisticCommentBody));

    return tempId;
  };

  const handleAddCommentError = (tempId: ID) => {
    dispatch(deleteTemporalComment(tempId));
  };

  const handleAddCommentSuccess = async (
    result: PostCreateCommentResponse,
    tempId: ID,
  ) => {
    dispatch(deleteTemporalComment(tempId));
    dispatch(addComment(result.comment));
    dispatch(addHistory(result.history));
  };

  // useEffect

  useEffect(() => {
    const getTracks = async () => {
      const tracksResource = await fetchTracks();
      setTracks(tracksResource);
    };

    const getReviewers = async () => {
      const reviewersResource = await fetchReviewers();
      setReviewers(reviewersResource);
    };

    const getUsers = async () => {
      const usersResource = await fetchUsers();
      setUsers(usersResource);
    };

    getTracks();
    getReviewers();
    getUsers();
  }, []);

  useEffect(() => {
    let isActual = true;

    const getProposal = async () => {
      dispatch(resetDetails());
      const proposalResource = await fetchProposal(id, getProposal);
      if (!isActual) return;
      if (proposalResource.data) {
        dispatch(hydrateDetails(proposalResource.data));
        dispatch(
          hydrateAvailableStatuses(proposalResource.data.availableStatuses),
        );
      }
      setProposal(proposalResource.proposal);
    };

    getProposal();

    return () => {
      isActual = false;
    };
  }, [id, dispatch]);

  return {
    proposal,
    pageData,
    tracks,
    reviewers,
    users,
    handleStatusSuccess,
    handleAssignReviewerSuccess,
    handleCreateReviewSuccess,
    handleAddCommentSubmit,
    handleAddCommentError,
    handleAddCommentSuccess,
  };
};

export default useProposalDetailsData;

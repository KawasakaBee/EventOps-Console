import { useEffect, useState } from 'react';
import { fetchProposal, fetchUsers } from '../api/proposalDetailsApi';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import {
  addHistory,
  hydrateAvailableStatuses,
  hydrateDetails,
  hydrateProposal,
  resetDetails,
  updateAvailableActions,
} from './proposalDetailsSlice';
import { ID } from '@/shared/types/primitives.types';
import {
  PatchProposalStatusResponse,
  PostAssignReviewerResponse,
} from '@/entities/proposal/api/contracts';
import { fetchTracks } from '@/entities/track/api/trackApi';
import { fetchReviewers } from '@/entities/reviewer/api/reviewerApi';
import { ProposalResource, UsersResource } from './types';
import { TracksResource } from '@/entities/track/api/types';
import { ReviewersResource } from '@/entities/reviewer/api/types';

const useProposalDetailsData = (id: ID) => {
  //state
  const dispatch = useAppDispatch();
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

  const handleAssignReviewerSuccess = async (
    result: PostAssignReviewerResponse,
  ) => {
    const getProposal = async () => {
      dispatch(resetDetails());
      const proposalResource = await fetchProposal(
        result.proposalId,
        getProposal,
      );
      if (proposalResource.data) {
        dispatch(hydrateDetails(proposalResource.data));
        dispatch(
          hydrateAvailableStatuses(proposalResource.data.availableStatuses),
        );
      }
      setProposal(proposalResource.proposal);
    };

    getProposal();
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
  };
};

export default useProposalDetailsData;

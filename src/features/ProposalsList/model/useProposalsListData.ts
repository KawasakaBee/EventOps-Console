import {
  PaginationResource,
  ReviewersResource,
  TracksResource,
  UserResource,
} from '@/shared/types/resource.types';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@/shared/store/hooks';
import { resetFilters, resetSelectedIds } from './proposalsListSlice';
import { usePathname, useRouter } from 'next/navigation';
import { PatchProposalStatusResponse } from '@/entities/proposal/api/contracts';
import { fetchPagination, fetchUser } from '../api/proposalsListApi';
import { fetchTracks } from '@/entities/track/api/trackApi';
import { fetchReviewers } from '@/entities/reviewer/api/reviewerApi';

const useProposalsListData = (searchParams: string) => {
  // State
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState<PaginationResource>({
    status: 'loading',
    data: null,
    errorProps: null,
  });

  const [user, setUser] = useState<UserResource>({
    status: 'loading',
    data: null,
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

  const [multipleErrorsCount, setMultipleErrorsCount] = useState<number>(0);

  //   handlers

  const handleFiltersReset = useCallback(() => {
    dispatch(resetFilters());

    router.push(pathname);
  }, [dispatch, pathname, router]);

  const handleStatusSuccess = useCallback(
    (result: PatchProposalStatusResponse) => {
      setPagination((prev) => {
        if (!prev.data) return prev;

        return {
          ...prev,
          data: {
            ...prev.data,
            items: prev.data.items.map((proposal) =>
              proposal.id === result.proposal.id
                ? {
                    ...proposal,
                    status: result.proposal.status,
                    updatedAt: result.proposal.updatedAt,
                    availableStatuses: result.availableStatuses,
                  }
                : proposal,
            ),
          },
        };
      });
    },
    [],
  );

  const handleMultipleStatusSuccess = useCallback(
    (result: {
      successful: PatchProposalStatusResponse[];
      failed: unknown[];
    }) => {
      const successfulById = new Map(
        result.successful.map((item) => [item.proposal.id, item.proposal]),
      );

      const successfulStatuses = new Map(
        result.successful.map((item) => [
          item.proposal.id,
          item.availableStatuses,
        ]),
      );

      setPagination((prev) => {
        if (!prev.data) return prev;

        return {
          ...prev,
          data: {
            ...prev.data,
            items: prev.data.items.map((proposal) => {
              const updatedProposal = successfulById.get(proposal.id);
              const updatedStatuses = successfulStatuses.get(proposal.id);

              if (!updatedProposal || !updatedStatuses) return proposal;

              return {
                ...proposal,
                status: updatedProposal.status,
                updatedAt: updatedProposal.updatedAt,
                availableStatuses: updatedStatuses,
              };
            }),
          },
        };
      });
      if (result.failed.length > 0) {
        setMultipleErrorsCount(result.failed.length);
      }
    },
    [],
  );

  const handleMultipleErrorsSnackbarClose = () => {
    setMultipleErrorsCount(0);
  };

  //   useEffect

  useEffect(() => {
    const getUser = async () => {
      const userResource = await fetchUser(getUser, resetFilters);
      setUser(userResource);
    };

    const getTracks = async () => {
      const tracksResource = await fetchTracks();
      setTracks(tracksResource);
    };

    const getReviewers = async () => {
      const reviewersResource = await fetchReviewers();
      setReviewers(reviewersResource);
    };

    getUser();
    getTracks();
    getReviewers();
  }, []);

  useEffect(() => {
    let isActual = true;

    const getPagination = async () => {
      const paginationResource = await fetchPagination(
        searchParams,
        getPagination,
        handleFiltersReset,
      );
      if (!isActual) return;
      setPagination(paginationResource);
    };

    getPagination();
    dispatch(resetSelectedIds());

    return () => {
      isActual = false;
    };
  }, [searchParams, handleFiltersReset, dispatch]);

  return {
    pagination,
    user,
    tracks,
    reviewers,
    multipleErrorsCount,
    handleStatusSuccess,
    handleMultipleStatusSuccess,
    closeErrorSnackbar: handleMultipleErrorsSnackbarClose,
    handleFiltersReset,
  };
};

export default useProposalsListData;

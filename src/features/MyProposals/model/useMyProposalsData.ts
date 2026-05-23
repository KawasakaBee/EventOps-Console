import { PaginationResource } from '@/features/ProposalsList/model/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { fetchMyProposals } from '../api/myProposalsApi';
import { TracksResource } from '@/entities/track/api/types';
import toLoadableResource from '@/shared/utils/toLoadableResource';
import { fetchTracks } from '@/entities/track/api/trackApi';
import { proposalStatuses } from '@/entities/proposal/model/types';

const useMyProposalsData = () => {
  // state
  const searchParams = useSearchParams();
  const stringifySearchParams = searchParams.toString();

  const [submittedPagination, setSubmittedPagination] =
    useState<PaginationResource>({
      status: 'loading',
      data: null,
      errorProps: null,
    });

  const [draftPagination, setDraftPagination] = useState<PaginationResource>({
    status: 'loading',
    data: null,
    errorProps: null,
  });

  const [tracks, setTracks] = useState<TracksResource>({
    status: 'loading',
    data: [],
  });

  const tracksResource = toLoadableResource(
    tracks.status,
    tracks.data,
    'Не удалось загрузить трек',
  );

  const submittedVersion = useRef(0);
  const draftVersion = useRef(0);

  useEffect(() => {
    const getTracks = async () => {
      const tracksResource = await fetchTracks();
      setTracks(tracksResource);
    };

    getTracks();
  }, []);

  useEffect(() => {
    const getSubmittedPagination = async () => {
      const saveVersion = submittedVersion.current + 1;
      submittedVersion.current++;

      const params = new URLSearchParams(stringifySearchParams);
      params.set('owner', 'me');
      params.delete('status');
      proposalStatuses.forEach((status) => {
        if (status === 'draft') return;

        params.append('status', status);
      });

      const paginationResource = await fetchMyProposals(
        params.toString(),
        getSubmittedPagination,
      );

      if (saveVersion !== submittedVersion.current) return;

      setSubmittedPagination(paginationResource);
    };

    const getDraftPagination = async () => {
      const saveVersion = draftVersion.current + 1;
      draftVersion.current++;

      const params = new URLSearchParams(stringifySearchParams);
      params.set('owner', 'me');
      params.set('status', 'draft');

      const paginationResource = await fetchMyProposals(
        params.toString(),
        getDraftPagination,
      );

      if (saveVersion !== draftVersion.current) return;

      setDraftPagination(paginationResource);
    };

    getSubmittedPagination();
    getDraftPagination();
  }, [stringifySearchParams]);

  // handlers

  return {
    submittedPagination,
    draftPagination,
    tracks: tracksResource,
  };
};

export default useMyProposalsData;

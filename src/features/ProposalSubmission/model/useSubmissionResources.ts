import { isId } from '@/shared/utils/typeGuards';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SubmitValues } from './schema';
import {
  hasFilledSpeakerData,
  mapSpeakerToSubmitSpeaker,
  mapDraftToSubmitValues,
} from './mappers';
import { useGetTracksQuery } from '@/entities/track/api/trackApi';
import { useGetProposalQuery } from '@/entities/proposal/api/proposalApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetUserAsSpeakerQuery } from '@/entities/speaker/api/speakerApi';

const useSubmissionResources = (
  methods: UseFormReturn<SubmitValues>,
  draftId: unknown,
) => {
  const router = useRouter();
  const { reset, getValues, setValue } = methods;

  const tracks = useGetTracksQuery();
  const proposalId = isId(draftId) ? draftId : skipToken;
  const draft = useGetProposalQuery(proposalId, {
    refetchOnMountOrArgChange: true,
  });
  const owner = useGetUserAsSpeakerQuery();

  useEffect(() => {
    if (!draftId) return;
    if (draft.data && draft.data.proposal.status !== 'draft') {
      router.push(`/proposals/${draftId}`);
      return;
    }
  }, [draft.data, router, draftId]);

  useEffect(() => {
    if (draftId) return;
    if (!owner.isSuccess || !owner.data) return;

    const currentSpeakers = getValues('speakers');

    if (hasFilledSpeakerData(currentSpeakers)) return;

    setValue('speakers', [mapSpeakerToSubmitSpeaker(owner.data.speaker)], {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: true,
    });
  }, [owner, setValue, getValues, draftId]);

  useEffect(() => {
    if (!draft.isSuccess || !draft.data) {
      return;
    }

    reset(mapDraftToSubmitValues(draft.data.proposal, draft.data.speakers));
  }, [draft.isSuccess, draft.data, reset, tracks.isLoading]);

  return {
    draft,
    proposalId: isId(draftId) ? draftId : null,
  };
};

export default useSubmissionResources;

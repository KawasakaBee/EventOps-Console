import { SpeakersResource } from '@/entities/speaker/model/types';
import { TagsResource } from '@/entities/tag/api/types';
import { fetchTags } from '@/entities/tag/api/tagApi';
import { fetchTracks } from '@/entities/track/api/trackApi';
import { TracksResource } from '@/entities/track/api/types';
import { isId } from '@/shared/utils/typeGuards';
import toLoadableResource from '@/shared/utils/toLoadableResource';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { fetchGetDraft, fetchGetSpeaker } from '../api/ProposalSubmissionApi';
import { SubmitValues } from './schema';
import { SpeakerResource, SubmitProposalResource } from './types';
import {
  hasFilledSpeakerData,
  mapSpeakerToSubmitSpeaker,
  mapDraftToSubmitValues,
} from './mappers';

const useSubmissionResources = (
  methods: UseFormReturn<SubmitValues>,
  draftId: unknown,
) => {
  const router = useRouter();
  const { reset, getValues, setValue } = methods;

  const [draft, setDraft] = useState<SubmitProposalResource>({
    status: 'loading',
    data: null,
    errorProps: null,
  });

  const [speakers, setSpeakers] = useState<SpeakersResource>({
    status: 'loading',
    data: [],
  });

  const [tracks, setTracks] = useState<TracksResource>({
    status: 'loading',
    data: [],
  });

  const [tags, setTags] = useState<TagsResource>({
    status: 'loading',
    data: [],
  });

  const [owner, setOwner] = useState<SpeakerResource>({
    status: 'loading',
    data: null,
  });

  const tagsToResource = toLoadableResource(
    tags.status,
    tags.data,
    'Тег не удалось загрузить.',
  );

  const tracksToResource = toLoadableResource(
    tracks.status,
    tracks.data,
    'Трек не удалось загрузить.',
  );

  const speakersToResource = toLoadableResource(
    speakers.status,
    speakers.data,
    'Данные спикера не удалось загрузить, добавьте спикера вручную.',
  );

  const isTrackResourceLoaded =
    tracks.status === 'success' ||
    (tracks.status === 'error' && tags.status === 'success') ||
    tags.status === 'error';

  const speakersData = speakers.status === 'success' ? speakers.data : null;

  useEffect(() => {
    const getDraft = async () => {
      if (!draftId || !isId(draftId)) {
        setDraft({
          status: 'success',
          data: null,
          errorProps: null,
        });
        setSpeakers({
          status: 'success',
          data: [],
        });
        return;
      }

      const draftResource = await fetchGetDraft(draftId, getDraft);

      if (draftResource.status === 'error') {
        setDraft({
          status: draftResource.status,
          data: null,
          errorProps: draftResource.errorProps,
        });
        setSpeakers({
          status: draftResource.status,
          data: [],
        });
        return;
      }

      if (draftResource.data?.proposal.status !== 'draft') {
        router.push(`/proposals/${draftId}`);
        return;
      }

      setDraft({
        status: draftResource.status,
        data: draftResource.data.proposal,
        errorProps: draftResource.errorProps,
      });
      setSpeakers({
        status: draftResource.status,
        data: draftResource.data.speakers,
      });
    };

    void getDraft();
  }, [draftId, router]);

  useEffect(() => {
    let isCancelled = false;

    const getOwner = async () => {
      const ownerData = await fetchGetSpeaker();

      if (!isCancelled) setOwner(ownerData);
    };

    void getOwner();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (draftId) return;
    if (!owner.data || owner.status !== 'success') return;

    const currentSpeakers = getValues('speakers');

    if (hasFilledSpeakerData(currentSpeakers)) return;

    setValue('speakers', [mapSpeakerToSubmitSpeaker(owner.data)], {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: true,
    });
  }, [owner, setValue, getValues, draftId]);

  useEffect(() => {
    let isCancelled = false;

    const getTracks = async () => {
      const tracksResource = await fetchTracks();

      if (!isCancelled) setTracks(tracksResource);
    };

    void getTracks();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const getTags = async () => {
      const tagsResource = await fetchTags();

      if (!isCancelled) setTags(tagsResource);
    };

    void getTags();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (draft.status !== 'success' || !draft.data || !isTrackResourceLoaded) {
      return;
    }

    reset(mapDraftToSubmitValues(draft.data, speakersData));
  }, [draft.data, draft.status, speakersData, reset, isTrackResourceLoaded]);

  const handleTracksReFetch = useCallback(async () => {
    setTracks({
      status: 'loading',
      data: [],
    });

    const tracksResource = await fetchTracks();

    setTracks(tracksResource);
  }, []);

  const handleTagsReFetch = useCallback(async () => {
    setTags({
      status: 'loading',
      data: [],
    });

    const tagsResource = await fetchTags();

    setTags(tagsResource);
  }, []);

  return {
    draft,
    id: isId(draftId) ? draftId : null,
    speakers: speakersToResource,
    tracks: tracksToResource,
    reFetchTracks: handleTracksReFetch,
    tags: tagsToResource,
    reFetchTags: handleTagsReFetch,
  };
};

export default useSubmissionResources;

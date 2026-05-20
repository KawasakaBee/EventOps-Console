import { isId } from '@/shared/utils/typeGuards';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  fetchChangeProposal,
  fetchChangeProposalStatus,
  fetchCreateProposal,
  fetchGetDraft,
} from '../api/ProposalSubmissionApi';
import { SumbitProposalResource } from './types';
import { SpeakersResource } from '@/entities/speaker/model/types';
import toLoadableResource from '@/shared/utils/toLoadableResource';
import { TracksResource } from '@/entities/track/api/types';
import { fetchTracks } from '@/entities/track/api/trackApi';
import { TagsResource } from '@/entities/tag/api/types';
import { fetchTags } from '@/entities/tag/api/tagApi';
import { SubmitValues } from './schema';
import { UseFormReturn } from 'react-hook-form';
import { PROPOSAL_DRAFT_STORAGE_KEY } from '@/shared/config/layout';
import { SubmitDirtyFields } from '../ui/SubmitPage/SubmitPage.types';
import { ID } from '@/shared/types/primitives.types';

const useSubmissionData = (methods: UseFormReturn<SubmitValues>) => {
  // state
  const draftId = useParams().id;
  const router = useRouter();
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autosaveVersionRef = useRef(0);
  const [isRecoveryDialogOpened, setIsRecoveryDialogOpened] =
    useState<boolean>(false);
  const [isSubmitDialogOpened, setIsSubmitDialogOpened] =
    useState<boolean>(false);
  const [recoveryData, setRecoveryData] = useState<SubmitValues | null>(null);

  const { reset, getValues, resetField } = methods;

  const [draft, setDraft] = useState<SumbitProposalResource>({
    status: 'loading',
    data: null,
    errorProps: null,
  });

  const [submitData, setSubmitData] = useState<SumbitProposalResource>({
    status: 'idle',
    data: null,
    errorProps: null,
  });

  const [isAutosaveError, setIsAutosaveError] = useState<boolean>(false);

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

  const isAdditionalResourceLoaded =
    tracks.status === 'success' ||
    (tracks.status === 'error' && tags.status === 'success') ||
    tags.status === 'error';

  const speakersData = speakers.status === 'success' ? speakers.data : null;

  const clearAutosaveTimer = useCallback(() => {
    if (!autosaveTimerRef.current) return;

    clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = null;
  }, []);

  // useEffect

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

    getDraft();
  }, [draftId, router]);

  useEffect(() => {
    let isActual = false;

    const getTracks = async () => {
      const tracksResource = await fetchTracks();
      if (!isActual) setTracks(tracksResource);
    };

    getTracks();

    return () => {
      isActual = true;
    };
  }, []);

  useEffect(() => {
    let isActual = false;

    const getTags = async () => {
      const tagsResource = await fetchTags();
      if (!isActual) setTags(tagsResource);
    };

    getTags();

    return () => {
      isActual = true;
    };
  }, []);

  useEffect(() => {
    if (
      draft.status !== 'success' ||
      !draft.data ||
      !isAdditionalResourceLoaded
    )
      return;

    const {
      title,
      format,
      duration,
      level,
      trackId,
      abstract,
      takeaways,
      targetAudience,
      prerequisites,
      tags,
      speakerIds,
      draftSpeakers,
      notes,
    } = draft.data;

    const speakersByIds = speakersData
      ? speakersData
          .filter((speaker) => speakerIds.includes(speaker.id))
          .map((s) => ({
            id: s.id,
            name: s.name,
            email: s.email,
            company: s.company,
            position: s.position,
            bio: s.bio,
            links: s.contacts,
          }))
      : [];

    const validatedDraftSpeakers = draftSpeakers.map((s) => ({
      id: s.id,
      name: s.name ?? '',
      email: s.email ?? '',
      company: s.company ?? '',
      position: s.position ?? '',
      bio: s.bio ?? '',
      links: s.links ?? '',
    }));

    const formSpeakers = [...speakersByIds, ...validatedDraftSpeakers];

    const draftValues = {
      title,
      format,
      duration: String(duration),
      level,
      trackId,
      abstract,
      takeaways,
      targetAudience,
      prerequisites,
      speakers: formSpeakers,
      tags,
      notes,
      consent: false,
    } satisfies SubmitValues;

    reset(draftValues);
  }, [
    draft.data,
    draft.status,
    speakersData,
    reset,
    isAdditionalResourceLoaded,
  ]);

  useEffect(() => {
    return () => {
      clearAutosaveTimer();
    };
  }, [clearAutosaveTimer]);

  // handlers

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

  const resetAutosavedFields = useCallback(
    (dirtyFields: SubmitDirtyFields, savedValues: SubmitValues) => {
      (Object.keys(dirtyFields) as Array<keyof SubmitValues>).forEach((key) => {
        if (key === 'speakers') {
          const dirtySpeakers = dirtyFields.speakers;

          if (!dirtySpeakers) return;

          dirtySpeakers.forEach((speaker, idx) => {
            if (!speaker) return;

            (
              Object.keys(speaker) as Array<
                keyof SubmitValues['speakers'][number]
              >
            ).forEach((field) => {
              const path = `speakers.${idx}.${field}` as const;
              const savedValue = savedValues.speakers[idx]?.[field];
              const currentValue = getValues(path);

              if (currentValue !== savedValue) return;

              resetField(path, {
                defaultValue: getValues(path),
                keepError: true,
                keepTouched: true,
              });
            });
          });

          return;
        }

        if (key === 'tags') {
          const currentTags = getValues('tags');
          const savedTags = savedValues.tags;

          const isSameTags =
            currentTags.length === savedTags.length &&
            currentTags.every((tag, idx) => tag === savedTags[idx]);

          if (!isSameTags) return;

          resetField('tags', {
            defaultValue: savedTags,
            keepError: true,
            keepTouched: true,
          });

          return;
        }

        const currentValue = getValues(key);
        const savedValue = savedValues[key];

        if (currentValue !== savedValue) return;

        resetField(key, {
          defaultValue: savedValue,
          keepError: true,
          keepTouched: true,
        });
      });
    },
    [getValues, resetField],
  );

  const scheduleAutosave = useCallback(
    (dirtyFields: SubmitDirtyFields) => {
      if (!draftId || !isId(draftId)) return;

      clearAutosaveTimer();

      const saveVersion = autosaveVersionRef.current + 1;
      autosaveVersionRef.current = saveVersion;

      autosaveTimerRef.current = setTimeout(async () => {
        const formValues = getValues();

        const requestBody: Record<string, unknown> = {};

        (Object.keys(dirtyFields) as Array<keyof SubmitValues>).forEach(
          (key) => {
            const value = formValues[key];

            if (value === undefined) return;

            requestBody[key] = value;
          },
        );

        const result = await fetchChangeProposal(
          requestBody,
          'draft',
          draftId,
          () => null,
        );

        autosaveTimerRef.current = null;

        if (saveVersion !== autosaveVersionRef.current) return;

        if (result.status === 'error') {
          setIsAutosaveError(true);
          return;
        }

        resetAutosavedFields(dirtyFields, formValues);

        setIsAutosaveError((prev) => (prev ? false : prev));
      }, 1000);
    },
    [draftId, getValues, resetAutosavedFields, clearAutosaveTimer],
  );

  const scheduleRecoveryAutosave = useCallback(() => {
    if (draftId) return;

    clearAutosaveTimer();

    const fieldsValues = getValues();

    autosaveTimerRef.current = setTimeout(() => {
      localStorage.setItem(
        PROPOSAL_DRAFT_STORAGE_KEY,
        JSON.stringify({
          values: fieldsValues,
          updatedAt: new Date().toISOString(),
        }),
      );
    }, 1000);
  }, [draftId, getValues, clearAutosaveTimer]);

  const deleteFormFromStorage = useCallback(() => {
    clearAutosaveTimer();

    localStorage.removeItem(PROPOSAL_DRAFT_STORAGE_KEY);
    setRecoveryData(null);
  }, [clearAutosaveTimer]);

  const getFormFromStorage = useCallback((): SubmitValues | null => {
    const raw = localStorage.getItem(PROPOSAL_DRAFT_STORAGE_KEY);

    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw) as {
        values: SubmitValues;
        updatedAt: string;
      };

      return parsed.values;
    } catch {
      deleteFormFromStorage();
      return null;
    }
  }, [deleteFormFromStorage]);

  const formRecovery = useCallback(() => {
    const formFromStorage = getFormFromStorage();

    if (!formFromStorage) return;

    setRecoveryData(formFromStorage);
    setIsRecoveryDialogOpened(true);
  }, [getFormFromStorage]);

  const handleRecoveryDialogClose = () => {
    deleteFormFromStorage();
    setIsRecoveryDialogOpened(false);
  };

  const handleResetValues = () => {
    if (!recoveryData) return;

    reset(recoveryData);
    deleteFormFromStorage();
    setIsRecoveryDialogOpened(false);
  };

  const handleAutosaveErrorClose = () => {
    setIsAutosaveError(false);
  };

  const handleFormSubmit = async () => {
    if (submitData.status === 'success') return;

    setIsSubmitDialogOpened(false);
    setSubmitData({
      status: 'loading',
      data: null,
      errorProps: null,
    });

    const formValues = getValues();

    if (draftId && isId(draftId)) {
      const response = await fetchChangeProposal(
        formValues,
        'submitted',
        draftId,
        () => setIsSubmitDialogOpened(false),
      );

      const statusResponse = await fetchChangeProposalStatus(draftId, () =>
        setIsSubmitDialogOpened(false),
      );

      const successStatus =
        response.status === 'success' && statusResponse.status === 'success';

      setIsSubmitDialogOpened(true);

      if (!successStatus) {
        setSubmitData({
          status: 'error',
          data: null,
          errorProps: statusResponse.errorProps ?? response.errorProps ?? null,
        });
        return;
      }

      setSubmitData({
        status: 'success',
        data: statusResponse.data ?? response.data,
        errorProps: null,
      });
      return;
    }

    const response = await fetchCreateProposal(
      formValues,
      'submitted',
      handleFormSubmit,
    );

    deleteFormFromStorage();
    setSubmitData(response);
    setIsSubmitDialogOpened(true);
  };

  const handleSubmitDialogClose = () => {
    if (submitData.status === 'success') return;

    setIsSubmitDialogOpened(false);
  };

  const handleRedirectToProposals = (id: ID) => {
    router.push(`/proposals/${id}`);
  };

  return {
    draft,
    id: isId(draftId) ? draftId : null,
    speakers: speakersToResource,
    tracks: tracksToResource,
    reFetchTracks: handleTracksReFetch,
    tags: tagsToResource,
    reFetchTags: handleTagsReFetch,
    scheduleAutosave,
    scheduleRecoveryAutosave,
    isRecoveryDialogOpened,
    handleRecoveryDialogClose,
    formRecovery,
    handleResetValues,
    deleteFormFromStorage,
    isAutosaveError,
    handleAutosaveErrorClose,
    handleFormSubmit,
    isSubmitDialogOpened,
    handleSubmitDialogClose,
    submitData,
    handleRedirectToProposals,
  };
};

export default useSubmissionData;

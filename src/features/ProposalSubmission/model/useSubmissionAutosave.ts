import { PROPOSAL_DRAFT_STORAGE_KEY } from '@/shared/config/layout';
import { isId } from '@/shared/utils/typeGuards';
import { useCallback, useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { fetchChangeProposal } from '../api/ProposalSubmissionApi';
import { SubmitValues } from './schema';
import { SubmitDirtyFields } from './types';
import { buildDirtySubmitPayload } from './mappers';

const useSubmissionAutosave = (
  methods: UseFormReturn<SubmitValues>,
  draftId: unknown,
) => {
  const { reset, getValues, resetField } = methods;

  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autosaveVersionRef = useRef(0);
  const autosaveAbortRef = useRef<AbortController | null>(null);

  const [isRecoveryDialogOpened, setIsRecoveryDialogOpened] =
    useState<boolean>(false);
  const [recoveryData, setRecoveryData] = useState<SubmitValues | null>(null);
  const [isAutosaveError, setIsAutosaveError] = useState<boolean>(false);

  const abortAutosaveRequest = useCallback(() => {
    autosaveAbortRef.current?.abort();
    autosaveAbortRef.current = null;
  }, []);

  const clearAutosaveTimer = useCallback(() => {
    if (!autosaveTimerRef.current) return;

    clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = null;
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
      abortAutosaveRequest();

      const saveVersion = autosaveVersionRef.current + 1;
      autosaveVersionRef.current = saveVersion;

      autosaveTimerRef.current = setTimeout(async () => {
        const formValues = getValues();
        const requestBody = buildDirtySubmitPayload(dirtyFields, formValues);

        const controller = new AbortController();
        autosaveAbortRef.current = controller;

        const result = await fetchChangeProposal(
          requestBody,
          'draft',
          draftId,
          () => null,
          controller.signal,
        );

        if (autosaveAbortRef.current === controller) {
          autosaveAbortRef.current = null;
        }

        autosaveTimerRef.current = null;

        if (saveVersion !== autosaveVersionRef.current) return;

        if (result === null) return;

        if (result.status === 'error') {
          setIsAutosaveError(true);
          return;
        }

        resetAutosavedFields(dirtyFields, formValues);

        setIsAutosaveError((prev) => (prev ? false : prev));
      }, 1000);
    },
    [
      draftId,
      getValues,
      resetAutosavedFields,
      clearAutosaveTimer,
      abortAutosaveRequest,
    ],
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

  const handleRecoveryDialogClose = useCallback(() => {
    deleteFormFromStorage();
    setIsRecoveryDialogOpened(false);
  }, [deleteFormFromStorage]);

  const handleResetValues = useCallback(() => {
    if (!recoveryData) return;

    reset(recoveryData);
    deleteFormFromStorage();
    setIsRecoveryDialogOpened(false);
  }, [recoveryData, reset, deleteFormFromStorage]);

  const handleAutosaveErrorClose = useCallback(() => {
    setIsAutosaveError(false);
  }, []);

  useEffect(() => {
    return () => {
      clearAutosaveTimer();
      abortAutosaveRequest();
    };
  }, [clearAutosaveTimer, abortAutosaveRequest]);

  return {
    scheduleAutosave,
    scheduleRecoveryAutosave,
    isRecoveryDialogOpened,
    handleRecoveryDialogClose,
    formRecovery,
    handleResetValues,
    deleteFormFromStorage,
    isAutosaveError,
    handleAutosaveErrorClose,
  };
};

export default useSubmissionAutosave;

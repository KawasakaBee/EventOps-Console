'use client';

import defaultValues from '../../model/defaultValues';
import { submitSchema, SubmitValues } from '../../model/schema';
import { FormProvider, useForm, useFormState, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitStepper from '../SubmitStepper/SubmitStepper';
import useSubmissionData from '../../model/useSubmissionData';
import SubmitStepperSkeleton from '../SubmitStepper/SubmitStepperSkeleton';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import { useEffect, useRef } from 'react';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import Button from '@/shared/ui/Button/Button';
import { styles } from './styles';
import { IAutosaveWatcherProps } from './SubmitPage.types';

const AutosaveWatcher: React.FC<IAutosaveWatcherProps> = ({
  control,
  id,
  scheduleAutosave,
  scheduleRecoveryAutosave,
}) => {
  const values = useWatch({ control });
  const { isDirty, dirtyFields } = useFormState({ control });

  useEffect(() => {
    if (!isDirty) return;

    if (id) {
      scheduleAutosave(dirtyFields);
    } else {
      scheduleRecoveryAutosave();
    }
  }, [
    values,
    isDirty,
    dirtyFields,
    id,
    scheduleAutosave,
    scheduleRecoveryAutosave,
  ]);

  return null;
};

const SubmitPage = () => {
  const methods = useForm<SubmitValues>({
    defaultValues,
    resolver: zodResolver(submitSchema),
    mode: 'onBlur',
    shouldUnregister: false,
  });

  const recoveryCheckedRef = useRef(false);

  const { handleSubmit, control } = methods;

  const {
    draft,
    id,
    speakers,
    tracks,
    reFetchTracks,
    tags,
    reFetchTags,
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
  } = useSubmissionData(methods);

  const isDraftDataLoaded =
    draft.status === 'success' || draft.status === 'error';
  const isDraftError = draft.status === 'error';

  const iSubmitDataLoaded =
    submitData.status === 'success' || submitData.status === 'error';
  const iSubmitError = submitData.status === 'error';

  const sx = styles();

  useEffect(() => {
    if (id) return;
    if (!recoveryCheckedRef.current) {
      formRecovery();
      recoveryCheckedRef.current = true;
    }
  }, [formRecovery, id]);

  return (
    <FormProvider {...methods}>
      <AutosaveWatcher
        control={control}
        id={id}
        scheduleAutosave={scheduleAutosave}
        scheduleRecoveryAutosave={scheduleRecoveryAutosave}
      />
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        style={{ height: '100%' }}
      >
        {isDraftDataLoaded ? (
          isDraftError ? (
            draft.errorProps && <ErrorState {...draft.errorProps} />
          ) : (
            <SubmitStepper
              id={id}
              speakers={speakers}
              tracks={tracks}
              reFetchTracks={reFetchTracks}
              tags={tags}
              reFetchTags={reFetchTags}
              clearStorage={deleteFormFromStorage}
            />
          )
        ) : (
          <SubmitStepperSkeleton />
        )}
      </form>
      <Dialog
        open={isRecoveryDialogOpened}
        onClose={handleRecoveryDialogClose}
        slotProps={{
          paper: {
            sx: sx.recoveryDialogPaper,
          },
        }}
      >
        <DialogTitle sx={sx.recoveryDialogTitle}>
          Найдена незавершённая заявка!
        </DialogTitle>
        <DialogContent sx={sx.recoveryDialogContent}>
          Продолжить заполнение найденной заявки?
        </DialogContent>
        <DialogActions sx={sx.recoveryDialogActions}>
          <Button
            mode="button"
            variant="contained"
            size="medium"
            type="button"
            onClick={handleResetValues}
          >
            Продолжить
          </Button>
          <Button
            mode="button"
            variant="contained"
            size="medium"
            type="button"
            onClick={handleRecoveryDialogClose}
          >
            Заполнить новую заявку
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isSubmitDialogOpened}
        onClose={handleSubmitDialogClose}
        slotProps={{
          paper: {
            sx: sx.submitDialogPaper,
          },
        }}
      >
        {iSubmitDataLoaded ? (
          <>
            <DialogTitle sx={sx.submitDialogTitle}>
              {iSubmitError
                ? 'Не удалось создать заявку...'
                : 'Заявка успешно создана!'}
            </DialogTitle>
            <DialogContent sx={sx.submitDialogContent}>
              {iSubmitError ? (
                <Stack>
                  {!id && (
                    <Typography>
                      Сохраните заявку как черновик, чтобы не потерять данные!
                    </Typography>
                  )}
                  {submitData.errorProps && (
                    <ErrorState {...submitData.errorProps} />
                  )}
                </Stack>
              ) : (
                'Вы можете продолжить работу с заявкой на её странице'
              )}
            </DialogContent>
            <DialogActions sx={sx.submitDialogActions}>
              {!iSubmitError && (
                <Button
                  mode="button"
                  variant="contained"
                  size="medium"
                  type="button"
                  onClick={() =>
                    submitData.data
                      ? handleRedirectToProposals(submitData.data.id)
                      : handleSubmitDialogClose()
                  }
                >
                  Продолжить
                </Button>
              )}
            </DialogActions>
          </>
        ) : (
          <CircularProgress sx={sx.submitCircularProgress} />
        )}
      </Dialog>
      <ErrorState
        type="snackbar"
        open={isAutosaveError}
        onClose={handleAutosaveErrorClose}
        title="Ошибка автосохранения"
      />
    </FormProvider>
  );
};
export default SubmitPage;

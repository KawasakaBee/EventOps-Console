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
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import getSubmissionErrorState from '../../model/getSubmissionErrorState';

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
    proposalId,
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
    createState,
    changeState,
    isSubmitDialogOpened,
    handleSubmitDialogClose,
    handleRedirectToProposals,
  } = useSubmissionData(methods);

  const sx = styles();

  useEffect(() => {
    if (proposalId) return;
    if (!recoveryCheckedRef.current) {
      formRecovery();
      recoveryCheckedRef.current = true;
    }
  }, [formRecovery, proposalId]);

  return (
    <FormProvider {...methods}>
      <AutosaveWatcher
        control={control}
        id={proposalId}
        scheduleAutosave={scheduleAutosave}
        scheduleRecoveryAutosave={scheduleRecoveryAutosave}
      />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {draft.isLoading ? (
          <SubmitStepperSkeleton />
        ) : draft.isError ? (
          isAppBaseQueryError(draft.error) && (
            <ErrorState
              {...getSubmissionErrorState(draft.error.error, {
                retry: draft.refetch,
              })}
            />
          )
        ) : (
          <SubmitStepper
            id={proposalId}
            speakers={draft.data?.speakers}
            clearStorage={deleteFormFromStorage}
          />
        )}
      </form>
      <Dialog
        open={isRecoveryDialogOpened}
        onClose={handleRecoveryDialogClose}
        slotProps={{
          paper: {
            sx: sx.submitPageRecoveryDialogPaper,
          },
        }}
      >
        <DialogTitle sx={sx.submitPageDialogCentered}>
          Найдена незавершённая заявка!
        </DialogTitle>
        <DialogContent sx={sx.submitPageDialogCentered}>
          Продолжить заполнение найденной заявки?
        </DialogContent>
        <DialogActions sx={sx.submitPageDialogCentered}>
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
            sx: sx.submitPageSubmitDialogPaper,
          },
        }}
      >
        {createState.isLoading || changeState.isLoading ? (
          <CircularProgress sx={sx.submitPageDialogCentered} />
        ) : (
          <>
            <DialogTitle sx={sx.submitPageDialogCentered}>
              {createState.isError || changeState.isError
                ? 'Не удалось создать заявку...'
                : 'Заявка успешно создана!'}
            </DialogTitle>
            <DialogContent sx={sx.submitPageDialogCentered}>
              {createState.isError || changeState.isError ? (
                <Stack>
                  {!proposalId && (
                    <Typography>
                      Сохраните заявку как черновик, чтобы не потерять данные!
                    </Typography>
                  )}
                  {isAppBaseQueryError(createState.error) && (
                    <ErrorState
                      {...getSubmissionErrorState(createState.error.error, {
                        retry: handleFormSubmit,
                      })}
                    />
                  )}
                  {isAppBaseQueryError(changeState.error) && (
                    <ErrorState
                      {...getSubmissionErrorState(changeState.error.error, {
                        retry: handleFormSubmit,
                      })}
                    />
                  )}
                </Stack>
              ) : (
                'Вы можете продолжить работу с заявкой на её странице'
              )}
            </DialogContent>
            <DialogActions sx={sx.submitPageDialogCentered}>
              {!createState.isError && !changeState.isError && (
                <Button
                  mode="button"
                  variant="contained"
                  size="medium"
                  type="button"
                  onClick={() =>
                    createState.data
                      ? handleRedirectToProposals(createState.data.proposal.id)
                      : changeState.data
                        ? handleRedirectToProposals(
                            changeState.data.proposal.id,
                          )
                        : handleSubmitDialogClose()
                  }
                >
                  Продолжить
                </Button>
              )}
            </DialogActions>
          </>
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

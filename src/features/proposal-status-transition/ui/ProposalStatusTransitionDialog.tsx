import {
  Box,
  CircularProgress,
  Dialog,
  FormControl,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { IStatusTransitionDialogProps } from './ProposalStatusTransitionDialog.types';
import { styles } from './styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { statusDictionary } from '@/shared/data';
import { useRef, useState } from 'react';
import Button from '@/shared/ui/Button/Button';
import { fetchWithDemoAuth } from '@/shared/api/fetchWithDemoAuth';
import {
  PatchProposalStatusRequest,
  PatchProposalStatusResponse,
} from '@/shared/api/contracts/proposal.contract';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';
import getProposalErrorState from '@/features/Proposal/model/getProposalErrorState';
import normalizeResponse from '@/shared/api/normalizeResponse';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';

const ProposalStatusTransitionDialog: React.FC<IStatusTransitionDialogProps> = (
  props,
) => {
  const { mode, prevStatus, nextStatus, open, onClose } = props;
  const reasonInputRef = useRef<HTMLInputElement | null>(null);
  const [reasonValue, setReasonValue] = useState<string>('');
  const [reasonError, setReasonError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStatusChanged, setIsStatusChanged] = useState<boolean>(false);
  const [requestErrorProps, setRequestErrorProps] =
    useState<ErrorStateProps | null>(null);

  const isMustHaveReason =
    (nextStatus && nextStatus === 'changes_requested') ||
    nextStatus === 'rejected';
  const isReasonInvalid = isMustHaveReason && reasonValue.trim().length === 0;

  const sx = styles();

  const handleReasonValueChange = (value: string) => {
    if (isLoading) return;

    setReasonValue(value);
  };

  const handleStatusChange = (event: React.FormEvent<HTMLFormElement>) => {
    if (isLoading) return;

    event.preventDefault();

    if (isReasonInvalid) {
      setReasonError(true);
      reasonInputRef.current?.focus();
      return;
    }

    patchProposalStatusChange();
  };

  const patchProposalStatusChange = async () => {
    if (!nextStatus) return;

    setIsLoading(true);
    setRequestErrorProps(null);

    if (mode === 'single') {
      const { id, onSuccess } = props;

      const requestBody: PatchProposalStatusRequest = {
        status: nextStatus,
        reason: isMustHaveReason ? reasonValue : undefined,
      };

      const response = await fetchWithDemoAuth(`/api/proposals/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        setRequestErrorProps(
          getProposalErrorState(response.error, {
            retry: () => setRequestErrorProps(null),
            onClose: () => setRequestErrorProps(null),
          }),
        );
        setIsLoading(false);
        return;
      }

      const result = await normalizeResponse<PatchProposalStatusResponse>(
        response.data,
      );

      if (!result.ok) {
        setRequestErrorProps(
          getProposalErrorState(result.error, {
            retry: () => setRequestErrorProps(null),
            onClose: () => setRequestErrorProps(null),
          }),
        );
        setIsLoading(false);
        return;
      }

      setIsStatusChanged(true);
      setIsLoading(false);
      onSuccess(result.data);
    }

    if (mode === 'multiple') {
      const { ids, onSuccess } = props;

      const requestBody: PatchProposalStatusRequest = {
        status: nextStatus,
        reason: isMustHaveReason ? reasonValue : undefined,
      };

      const requests = ids.map(async (id) => {
        const response = await fetchWithDemoAuth(
          `/api/proposals/${id}/status`,
          {
            method: 'PATCH',
            body: JSON.stringify(requestBody),
          },
        );

        if (!response.ok) {
          throw {
            id,
            error: response.error,
          };
        }

        const result = await normalizeResponse<PatchProposalStatusResponse>(
          response.data,
        );

        if (!result.ok) {
          throw {
            id,
            error: result.error,
          };
        }

        return {
          id,
          data: result.data,
        };
      });

      const settledResults = await Promise.allSettled(requests);

      const successful = settledResults.flatMap((result) =>
        result.status === 'fulfilled' ? [result.value.data] : [],
      );

      const failed = settledResults.flatMap((result) =>
        result.status === 'rejected' ? [result.reason] : [],
      );

      setIsLoading(false);

      if (successful.length === 0) {
        const firstError = failed[0]?.error;

        if (firstError) {
          setRequestErrorProps(
            getProposalErrorState(firstError, {
              retry: () => setRequestErrorProps(null),
              onClose: () => setRequestErrorProps(null),
            }),
          );
        }

        return;
      }

      setIsStatusChanged(true);

      onSuccess({ successful, failed });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: sx.dialog,
        },
      }}
    >
      {!requestErrorProps && !isStatusChanged && (
        <Stack spacing={4} sx={sx.dialogContainer}>
          <Typography variant="h2">
            {mode === 'single'
              ? 'Вы собираетесь сменить статус заявки:'
              : 'Вы собираетесь сменить статус выбранных заявок:'}
          </Typography>
          <Stack direction="row" spacing={2} sx={sx.statusContainer}>
            <Typography variant="h3" sx={sx.statusPrev}>
              {statusDictionary[prevStatus]}
            </Typography>
            <ArrowRightAltIcon />
            <Typography variant="h3" sx={sx.statusNext}>
              {statusDictionary[nextStatus]}
            </Typography>
          </Stack>
          <Box component={'form'} onSubmit={handleStatusChange}>
            <FormControl
              required={isMustHaveReason}
              sx={sx.formControl}
              disabled={isLoading}
            >
              <Stack spacing={2}>
                {isMustHaveReason && (
                  <TextField
                    placeholder="Причина изменения статуса"
                    value={reasonValue}
                    inputRef={reasonInputRef}
                    multiline
                    required={isMustHaveReason}
                    onChange={(event) => {
                      handleReasonValueChange(event.target.value);

                      if (reasonError) {
                        setReasonError(false);
                      }
                    }}
                    disabled={isLoading}
                    error={reasonError}
                    helperText={
                      reasonError
                        ? 'Укажите причину изменения статуса'
                        : undefined
                    }
                    variant="outlined"
                    slotProps={{
                      input: {
                        sx: sx.reasonInput,
                      },
                    }}
                  />
                )}

                <Stack direction="row" spacing={2} sx={sx.buttonsContainer}>
                  <Button
                    mode="button"
                    variant="contained"
                    size="medium"
                    type="submit"
                    isDisabled={isLoading}
                    sx={sx.acceptButton}
                  >
                    {isLoading ? <CircularProgress /> : 'Изменить статус'}
                  </Button>
                  <Button
                    mode="button"
                    variant="contained"
                    size="medium"
                    type="button"
                    onClick={onClose}
                    sx={sx.rejectButton}
                  >
                    Отмена
                  </Button>
                </Stack>
              </Stack>
            </FormControl>
          </Box>
        </Stack>
      )}
      {!requestErrorProps && isStatusChanged && !isLoading && (
        <Stack spacing={2} sx={sx.dialogContainer}>
          <Typography variant="h2">
            Статус заявки успешно изменён на{' '}
            <b>{statusDictionary[nextStatus]}</b>
          </Typography>
          <Button
            mode="button"
            variant="contained"
            size="medium"
            type="button"
            onClick={onClose}
          >
            Продолжить
          </Button>
        </Stack>
      )}
      {requestErrorProps && <ErrorState {...requestErrorProps} />}
    </Dialog>
  );
};

export default ProposalStatusTransitionDialog;

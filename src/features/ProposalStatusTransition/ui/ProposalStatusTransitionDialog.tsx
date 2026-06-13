import {
  Box,
  CircularProgress,
  Dialog,
  FormControl,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { StatusTransitionDialogProps } from './ProposalStatusTransitionDialog.types';
import { styles } from './styles';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Button from '@/shared/ui/Button/Button';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import useStatusTransitionSubmit from '../model/useStatusTransitionSubmit';
import { statusDictionary } from '@/entities/proposal/model/dictionaries';
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import getStatusTransitionErrorState from '../model/getStatusTransitionErrorState';

const ProposalStatusTransitionDialog: React.FC<StatusTransitionDialogProps> = (
  props,
) => {
  const { mode, prevStatus, nextStatus, onClose } = props;
  const {
    changeState,
    reasonValue,
    reasonError,
    isMustHaveReason,
    reasonInputRef,
    handleStatusChange,
    handleReasonValueChange,
  } = useStatusTransitionSubmit(props);

  const sx = styles();

  return (
    <Dialog
      open
      onClose={onClose}
      slotProps={{
        paper: {
          sx: sx.proposalStatusTransitionDialogPaper,
        },
      }}
    >
      {changeState.isError ? (
        isAppBaseQueryError(changeState.error) && (
          <ErrorState
            {...getStatusTransitionErrorState(changeState.error.error, {
              retry: () => null,
            })}
          />
        )
      ) : changeState.data ? (
        <Stack spacing={2} sx={sx.proposalStatusTransitionDialogContainer}>
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
      ) : (
        <Stack spacing={4} sx={sx.proposalStatusTransitionDialogContainer}>
          <Typography variant="h2">
            {mode === 'single'
              ? 'Вы собираетесь сменить статус заявки:'
              : 'Вы собираетесь сменить статус выбранных заявок:'}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={sx.proposalStatusTransitionDialogStatus}
          >
            <Typography
              variant="h3"
              sx={sx.proposalStatusTransitionDialogStatusPrev}
            >
              {statusDictionary[prevStatus]}
            </Typography>
            <ArrowRightAltIcon />
            <Typography
              variant="h3"
              sx={sx.proposalStatusTransitionDialogStatusNext}
            >
              {statusDictionary[nextStatus]}
            </Typography>
          </Stack>
          <Box component={'form'} onSubmit={handleStatusChange}>
            <FormControl
              required={isMustHaveReason}
              sx={sx.proposalStatusTransitionDialogReasonControl}
              disabled={changeState.isLoading}
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
                    }}
                    disabled={changeState.isLoading}
                    error={reasonError}
                    helperText={
                      reasonError
                        ? 'Укажите причину изменения статуса'
                        : undefined
                    }
                    variant="outlined"
                    slotProps={{
                      input: {
                        sx: sx.proposalStatusTransitionDialogReasonInput,
                      },
                    }}
                  />
                )}

                <Stack
                  direction="row"
                  spacing={2}
                  sx={sx.proposalStatusTransitionDialogActions}
                >
                  <Button
                    mode="button"
                    variant="contained"
                    size="medium"
                    type="submit"
                    intent="success"
                    isDisabled={changeState.isLoading}
                  >
                    {changeState.isLoading ? (
                      <CircularProgress />
                    ) : (
                      'Изменить статус'
                    )}
                  </Button>
                  <Button
                    mode="button"
                    variant="contained"
                    size="medium"
                    type="button"
                    onClick={onClose}
                    intent="danger"
                  >
                    Отмена
                  </Button>
                </Stack>
              </Stack>
            </FormControl>
          </Box>
        </Stack>
      )}
    </Dialog>
  );
};

export default ProposalStatusTransitionDialog;

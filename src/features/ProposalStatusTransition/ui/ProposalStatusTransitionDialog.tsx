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
import Button from '@/shared/ui/Button/Button';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import useStatusTransitionSubmit from '../model/useStatusTransitionSubmit';
import { statusDictionary } from '@/entities/proposal/model/dictionaries';

const ProposalStatusTransitionDialog: React.FC<IStatusTransitionDialogProps> = (
  props,
) => {
  const { mode, prevStatus, nextStatus, onClose } = props;
  const {
    dialog,
    reasonValue,
    reasonError,
    isMustHaveReason,
    reasonInputRef,
    handleStatusChange,
    handleReasonValueChange,
  } = useStatusTransitionSubmit(props);
  const isLoading = dialog.status === 'loading';

  const sx = styles();

  return (
    <Dialog
      open
      onClose={onClose}
      slotProps={{
        paper: {
          sx: sx.dialog,
        },
      }}
    >
      {!dialog.errorProps && dialog.status !== 'success' && (
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
      {!dialog.errorProps && dialog.status === 'success' && !isLoading && (
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
      {dialog.errorProps && <ErrorState {...dialog.errorProps} />}
    </Dialog>
  );
};

export default ProposalStatusTransitionDialog;

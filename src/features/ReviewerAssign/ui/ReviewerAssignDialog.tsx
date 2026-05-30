import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';
import { IReviewerAssignDialogProps } from './ReviewerAssignDialog.types';
import useReviewerAssignData from '../model/useReviewerAssignData';
import { styles } from './styles';
import Button from '@/shared/ui/Button/Button';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';

const ReviewerAssignDialog: React.FC<IReviewerAssignDialogProps> = (props) => {
  const {
    reviewers,
    assignData,
    currentReviewer,
    autocompleteAnchor,
    emptyReviewerError,
    handleReviewerSet,
    handleReviewerAssign,
    handleCloseDialog,
  } = useReviewerAssignData(props);

  const { onClose } = props;

  const isReviewerAssigned =
    assignData.status === 'success' || assignData.status === 'error';
  const isAssignError = assignData.status === 'error';

  const isReviewersDataLoaded =
    reviewers.status === 'success' || reviewers.status === 'error';
  const isReviewersError = reviewers.status === 'error';
  const isEmptyReviewers =
    reviewers.status === 'success' && reviewers.data.length === 0;

  const sx = styles();

  return (
    <Dialog
      open
      onClose={() => handleCloseDialog(onClose)}
      slotProps={{
        paper: {
          sx: sx.dialogPaper,
        },
      }}
    >
      {isReviewerAssigned ? (
        isAssignError ? (
          assignData.errorProps && <ErrorState {...assignData.errorProps} />
        ) : (
          <>
            <DialogTitle>Ревьюер успешно назначен!</DialogTitle>
            <DialogContent>Вы можете продолжить работу с заявкой</DialogContent>
            <DialogActions>
              <Button
                mode="button"
                variant="contained"
                size="medium"
                type="button"
                onClick={() => handleCloseDialog(onClose)}
              >
                Продолжить
              </Button>
            </DialogActions>
          </>
        )
      ) : (
        <>
          <DialogTitle>Назначить ревьюера</DialogTitle>
          <DialogContent sx={sx.dialogContent}>
            <FormControl sx={sx.formControl}>
              {isReviewersDataLoaded ? (
                <Stack spacing={1}>
                  <Autocomplete
                    options={isReviewersError ? [] : reviewers.data}
                    value={currentReviewer}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={
                          isReviewersError
                            ? reviewers.message
                            : isEmptyReviewers
                              ? 'Нет доступных ревьюеров'
                              : 'Ревьюер'
                        }
                        inputRef={autocompleteAnchor}
                        error={!!emptyReviewerError}
                      />
                    )}
                    onChange={(_, option) => handleReviewerSet(option?.id)}
                    disabled={isReviewersError || isEmptyReviewers}
                  />
                  {!!emptyReviewerError && (
                    <FormHelperText sx={sx.formHelperTest}>
                      {emptyReviewerError}
                    </FormHelperText>
                  )}
                </Stack>
              ) : (
                <Skeleton variant="text" />
              )}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              mode="button"
              variant="contained"
              size="medium"
              type="submit"
              intent="success"
              onClick={handleReviewerAssign}
              isDisabled={
                !isReviewersDataLoaded || isReviewersError || !currentReviewer
              }
            >
              Назначить
            </Button>
            <Button
              mode="button"
              variant="contained"
              size="medium"
              type="button"
              onClick={() => handleCloseDialog(onClose)}
              intent="danger"
            >
              Отменить
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
export default ReviewerAssignDialog;

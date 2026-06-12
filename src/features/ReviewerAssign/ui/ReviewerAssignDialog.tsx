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
import {
  getApiErrorMessage,
  isAppBaseQueryError,
} from '@/shared/api/getApiErrorMessage';
import getAssignErrorState from '../model/getAssignErrorState';

const ReviewerAssignDialog: React.FC<IReviewerAssignDialogProps> = (props) => {
  const {
    reviewers,
    reviewersOptions,
    currentReviewer,
    autocompleteAnchor,
    emptyReviewerError,
    handleReviewerSet,
    handleReviewerAssign,
    assignState,
    handleCloseDialog,
  } = useReviewerAssignData(props);

  const { onClose } = props;

  const sx = styles();

  return (
    <Dialog
      open
      onClose={() => handleCloseDialog(onClose)}
      slotProps={{
        paper: {
          sx: sx.reviewerAssignDialogPaper,
        },
      }}
    >
      {assignState.isError ? (
        isAppBaseQueryError(assignState.error) && (
          <ErrorState
            {...getAssignErrorState(assignState.error.error, {
              retry: handleReviewerAssign,
            })}
          />
        )
      ) : assignState.data ? (
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
      ) : (
        <>
          <DialogTitle>Назначить ревьюера</DialogTitle>
          <DialogContent sx={sx.reviewerAssignDialogContent}>
            <FormControl sx={sx.reviewerAssignDialogControl}>
              {reviewers.isLoading ? (
                <Skeleton variant="text" />
              ) : (
                <Stack spacing={1}>
                  <Autocomplete
                    options={reviewers.isError ? [] : reviewersOptions}
                    value={currentReviewer}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={
                          reviewers.isError
                            ? getApiErrorMessage(reviewers.error)
                            : reviewers.data
                              ? reviewers.data.reviewers.length === 0
                                ? 'Нет доступных ревьюеров'
                                : 'Ревьюер'
                              : 'Не удалось загрузить ревьюера'
                        }
                        inputRef={autocompleteAnchor}
                        error={!!emptyReviewerError}
                      />
                    )}
                    onChange={(_, option) => handleReviewerSet(option?.id)}
                    disabled={
                      reviewers.isError ||
                      !reviewers.data ||
                      reviewers.data.reviewers.length === 0
                    }
                  />
                  {!!emptyReviewerError && (
                    <FormHelperText sx={sx.reviewerAssignDialogHelperText}>
                      {emptyReviewerError}
                    </FormHelperText>
                  )}
                </Stack>
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
                reviewers.isLoading || reviewers.isError || !currentReviewer
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

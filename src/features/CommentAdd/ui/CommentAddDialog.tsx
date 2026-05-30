import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { ICommentAddDialogProps } from './CommentAddDialog.types';
import { styles } from './styles';
import { useForm } from 'react-hook-form';
import { addCommentBaseSchema, AddCommentValues } from '../model/schema';
import defaultValues from '../model/defaultValues';
import { zodResolver } from '@hookform/resolvers/zod';
import useCommentAddData from '../model/useCommentAddData';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import Button from '@/shared/ui/Button/Button';

const CommentAddDialog: React.FC<ICommentAddDialogProps> = ({
  proposalId,
  onClose,
  onSubmit,
  onError,
  onSuccess,
}) => {
  const methods = useForm<AddCommentValues>({
    defaultValues,
    resolver: zodResolver(addCommentBaseSchema),
    mode: 'onBlur',
    shouldUnregister: true,
  });

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = methods;

  const { addCommentData, handleAddCommentSubmit } = useCommentAddData(
    proposalId,
    getValues,
    onSubmit,
    onError,
    onSuccess,
  );

  const isCommentDataLoaded =
    addCommentData.status === 'success' || addCommentData.status === 'error';
  const isCommentDataError = addCommentData.status === 'error';

  const sx = styles();

  return (
    <Dialog
      open
      onClose={onClose}
      slotProps={{
        paper: {
          sx: sx.dialogPaper,
        },
      }}
    >
      {isCommentDataLoaded ? (
        isCommentDataError ? (
          addCommentData.errorProps && (
            <ErrorState {...addCommentData.errorProps} />
          )
        ) : (
          <>
            <DialogTitle>Комментарий успешно добавлен!</DialogTitle>
            <DialogContent>Вы можете продолжить работу с заявкой</DialogContent>
            <DialogActions>
              <Button
                mode="button"
                variant="contained"
                size="medium"
                type="button"
                onClick={onClose}
              >
                Продолжить
              </Button>
            </DialogActions>
          </>
        )
      ) : (
        <>
          <DialogTitle>Добавить комментарий</DialogTitle>
          <form onSubmit={handleSubmit(handleAddCommentSubmit)}>
            <DialogContent sx={sx.dialogContent}>
              <Stack spacing={3}>
                <TextField
                  {...register('message')}
                  label="Комментарий"
                  required
                  error={!!errors['message']}
                  helperText={errors['message']?.message}
                  multiline
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                mode="button"
                variant="contained"
                size="medium"
                type="submit"
                sx={sx.acceptButton}
                isDisabled={addCommentData.status === 'loading'}
              >
                Добавить
              </Button>
              <Button
                mode="button"
                variant="contained"
                size="medium"
                type="button"
                onClick={onClose}
                sx={sx.rejectButton}
              >
                Отменить
              </Button>
            </DialogActions>
          </form>
        </>
      )}
    </Dialog>
  );
};
export default CommentAddDialog;

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
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import getAddCommentErrorState from '../model/getAddCommentErrorState';

const CommentAddDialog: React.FC<ICommentAddDialogProps> = ({
  proposalId,
  onClose,
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

  const { createState, handleAddCommentSubmit } = useCommentAddData(
    proposalId,
    getValues,
  );

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
      {createState.isError ? (
        isAppBaseQueryError(createState.error) && (
          <ErrorState
            {...getAddCommentErrorState(createState.error.error, {
              retry: handleAddCommentSubmit,
            })}
          />
        )
      ) : createState.data ? (
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
                intent="success"
                isDisabled={createState.isLoading}
              >
                Добавить
              </Button>
              <Button
                mode="button"
                variant="contained"
                size="medium"
                type="button"
                intent="danger"
                onClick={onClose}
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

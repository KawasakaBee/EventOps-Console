import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { IReviewCreateDialogProps } from './ReviewCreateDialog.types';
import { styles } from './styles';
import { Controller, useForm } from 'react-hook-form';
import { createReviewBaseSchema, CreateReviewValues } from '../model/schema';
import defaultValues from '../model/defaultValues';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  recommendationDictionary,
  scoresDictionary,
} from '@/entities/review/model/dictionaries';
import { recommendations, Score } from '@/entities/review/model/types';
import Button from '@/shared/ui/Button/Button';
import useCreateReviewData from '../model/useReviewCreateData';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import getReviewCreateErrorState from '../model/getReviewCreateErrorState';

const ReviewCreateDialog: React.FC<IReviewCreateDialogProps> = ({
  onClose,
  proposalId,
}) => {
  const methods = useForm<CreateReviewValues>({
    defaultValues,
    resolver: zodResolver(createReviewBaseSchema),
    mode: 'onBlur',
    shouldUnregister: true,
  });

  const {
    handleSubmit,
    control,
    register,
    getValues,
    formState: { errors },
  } = methods;

  const { createState, handleCreateReviewSubmit } = useCreateReviewData(
    getValues,
    proposalId,
  );

  const sx = styles();

  const scoreElement = (type: Score) => {
    return (
      <Controller
        name={type}
        control={control}
        render={({ field, fieldState }) => (
          <FormControl fullWidth error={!!fieldState.error} required>
            <InputLabel id={`${type}-label`}>
              {scoresDictionary[type]}
            </InputLabel>
            <Select
              {...field}
              labelId={`${type}-label`}
              id={type}
              label={scoresDictionary[type]}
            >
              {Array.from({ length: 10 }).map((_, idx) => (
                <MenuItem key={idx} value={String(idx + 1)}>
                  {idx + 1} / 10
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
    );
  };

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
      {' '}
      {createState.isError ? (
        isAppBaseQueryError(createState.error) && (
          <ErrorState
            {...getReviewCreateErrorState(createState.error.error, {
              retry: handleCreateReviewSubmit,
            })}
          />
        )
      ) : createState.data ? (
        <>
          <DialogTitle>Ревью успешно добавлено!</DialogTitle>
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
          <DialogTitle>Добавить ревью</DialogTitle>
          <form onSubmit={handleSubmit(handleCreateReviewSubmit)}>
            <DialogContent sx={sx.dialogContent}>
              <Stack spacing={3}>
                <Stack direction="row" spacing={2}>
                  {scoreElement('scoreContent')}
                  {scoreElement('scoreDelivery')}
                  {scoreElement('scoreRelevance')}
                </Stack>
                <Controller
                  name={'recommendation'}
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fullWidth error={!!fieldState.error} required>
                      <InputLabel id="recommendation-label">
                        Рекомендация
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="recommendation-label"
                        id="recommendation"
                        label="Рекомендация"
                      >
                        {recommendations.map((item) => (
                          <MenuItem key={item} value={item}>
                            {recommendationDictionary[item]}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldState.error && (
                        <FormHelperText>
                          {fieldState.error.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <TextField
                  {...register('comment')}
                  label="Комментарий"
                  required
                  error={!!errors['comment']}
                  helperText={errors['comment']?.message}
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
                onClick={onClose}
                intent="danger"
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
export default ReviewCreateDialog;

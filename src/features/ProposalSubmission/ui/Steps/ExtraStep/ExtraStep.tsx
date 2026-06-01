import { ExtraValues } from '@/features/ProposalSubmission/model/schema';
import { steps } from '@/features/ProposalSubmission/model/steps';
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Stack,
  TextField,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { styles } from './styles';
import Button from '@/shared/ui/Button/Button';
import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';
import NotesRaw from './NotesRaw';
import { useGetTagsQuery } from '@/entities/tag/api/tagApi';
import { getApiErrorMessage } from '@/shared/api/getApiErrorMessage';

const ExtraStep = () => {
  const { register, control } = useFormContext<ExtraValues>();

  const { data, isLoading, isError, error, refetch } = useGetTagsQuery();

  const isTagsAutocompleteDisabled =
    isLoading || isError || !data || data.tags.length === 0;

  const sx = styles();

  const extraInput = (type: keyof ExtraValues) => {
    switch (type) {
      case 'tags':
        return (
          <Controller
            key={type}
            name={type}
            control={control}
            render={({ field, fieldState }) => (
              <Stack spacing={2} sx={sx.tagsWrapper}>
                <FormControl
                  fullWidth
                  error={!!fieldState.error}
                  disabled={isTagsAutocompleteDisabled}
                >
                  <Autocomplete
                    {...field}
                    options={isTagsAutocompleteDisabled ? [] : data.tags}
                    value={Array.isArray(field.value) ? field.value : []}
                    onChange={(_, value) => field.onChange(value)}
                    id={type}
                    multiple
                    renderInput={(params) =>
                      isLoading ? (
                        <TextField
                          {...params}
                          disabled
                          label="Загрузка тегов"
                        />
                      ) : isError ? (
                        <TextField
                          {...params}
                          disabled
                          label={getApiErrorMessage(error)}
                        />
                      ) : data ? (
                        data.tags.length === 0 ? (
                          <TextField
                            {...params}
                            disabled
                            label="Нет тегов для выбора"
                          />
                        ) : (
                          <TextField
                            {...params}
                            label={proposalSubmitFieldsDictionary[type]}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )
                      ) : (
                        <TextField
                          {...params}
                          disabled
                          label="Не удалось загрузить тег"
                        />
                      )
                    }
                    disabled={isTagsAutocompleteDisabled}
                  />
                </FormControl>
                {(isError || !data || data.tags.length === 0) && (
                  <Button
                    mode="button"
                    variant="contained"
                    size="small"
                    type="button"
                    onClick={refetch}
                  >
                    Повторить
                  </Button>
                )}
              </Stack>
            )}
          />
        );
      case 'consent':
        return (
          <Controller
            key={type}
            name={type}
            control={control}
            render={({ field, fieldState }) => (
              <FormControl error={!!fieldState.error}>
                <FormGroup>
                  <FormControlLabel
                    label="Согласие на обработку персональных данных"
                    required
                    control={
                      <Checkbox
                        checked={!!field.value}
                        onChange={(_, checked) => field.onChange(checked)}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        sx={sx.consentCheckbox}
                      />
                    }
                  />
                </FormGroup>
                {fieldState.error && (
                  <FormHelperText>{fieldState.error.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      default:
        return <NotesRaw key={type} control={control} register={register} />;
    }
  };

  return (
    <Stack spacing={2}>
      {steps.extra.fields.map((field) => extraInput(field))}
    </Stack>
  );
};
export default ExtraStep;

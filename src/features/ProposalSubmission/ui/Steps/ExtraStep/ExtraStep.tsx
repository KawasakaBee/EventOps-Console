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
import { IExtraStepProps } from './ExtraStep.types';
import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';
import NotesRaw from './NotesRaw';

const ExtraStep: React.FC<IExtraStepProps> = ({ tags, reFetchTags }) => {
  const { register, control } = useFormContext<ExtraValues>();

  const isTagsResourceLoaded =
    tags.status === 'success' || tags.status === 'error';
  const isTagsError = tags.status === 'error';
  const isTagsEmpty = tags.status === 'success' && tags.data.length === 0;
  const isTagsAutocompleteDisabled =
    !isTagsResourceLoaded || isTagsError || isTagsEmpty;

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
                    options={isTagsAutocompleteDisabled ? [] : tags.data}
                    value={Array.isArray(field.value) ? field.value : []}
                    onChange={(_, value) => field.onChange(value)}
                    id={type}
                    multiple
                    renderInput={(params) =>
                      isTagsResourceLoaded ? (
                        isTagsError ? (
                          <TextField
                            {...params}
                            disabled
                            label={tags.message}
                          />
                        ) : isTagsEmpty ? (
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
                          label="Загрузка тегов"
                        />
                      )
                    }
                    disabled={isTagsAutocompleteDisabled}
                  />
                </FormControl>
                {(isTagsError || isTagsEmpty) && (
                  <Button
                    mode="button"
                    variant="contained"
                    size="small"
                    type="button"
                    onClick={reFetchTags}
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

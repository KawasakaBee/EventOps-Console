import { SpeakerValues } from '@/features/ProposalSubmission/model/schema';
import Button from '@/shared/ui/Button/Button';
import { Stack, Typography } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styles } from './styles';
import { ISpeakersStepProps } from './SpeakersStep.types';
import SpeakerBlock from './SpeakerBlock';

const SpeakersStep: React.FC<ISpeakersStepProps> = ({ errorMessage }) => {
  const { register, getValues, setValue, control } =
    useFormContext<SpeakerValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'speakers',
    keyName: 'formKey',
  });

  const sx = styles();

  const handleSpeakerAdd = () => {
    append({
      id: null,
      name: '',
      email: '',
      company: '',
      position: '',
      bio: '',
      links: '',
    });
  };

  const handleSpeakerRemove = () => {
    if (fields.length === 1) return;

    remove(fields.length - 1);
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} sx={sx.countWrapper}>
        <Typography variant="subtitle2">Спикеров: {fields.length}</Typography>
        <Button
          mode="iconButton"
          variant="contained"
          size="small"
          ariaLabel="Кнопка удалить спикера"
          icon={RemoveIcon}
          onClick={handleSpeakerRemove}
          isDisabled={fields.length === 1}
        />
        <Button
          mode="iconButton"
          variant="contained"
          size="small"
          ariaLabel="Кнопка добавить спикера"
          icon={AddIcon}
          onClick={handleSpeakerAdd}
        />
      </Stack>
      {errorMessage && <Typography variant="body2">{errorMessage}</Typography>}
      <Stack spacing={4}>
        {fields.map((speaker, idx) => (
          <Stack key={speaker.formKey}>
            <Typography variant="h3">Спикер - {idx + 1}</Typography>
            <SpeakerBlock
              control={control}
              register={register}
              getValues={getValues}
              setValue={setValue}
              idx={idx}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
export default SpeakersStep;

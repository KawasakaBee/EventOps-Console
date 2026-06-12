import { SpeakerValues } from '@/features/ProposalSubmission/model/schema';
import Button from '@/shared/ui/Button/Button';
import { Stack, Typography } from '@mui/material';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styles } from './styles';
import { ISpeakersStepProps, OwnerResource } from './SpeakersStep.types';
import SpeakerBlock from './SpeakerBlock';
import { useMemo } from 'react';
import { useAuth } from '@/entities/user/model/AuthProvider';

const SpeakersStep: React.FC<ISpeakersStepProps> = ({ errorMessage }) => {
  const { user } = useAuth();
  const { register, getValues, setValue, control } =
    useFormContext<SpeakerValues>();
  const speakers = useWatch({ control, name: 'speakers' });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'speakers',
    keyName: 'formKey',
  });

  const ownerInProposal: OwnerResource = useMemo(() => {
    const ownerIdx = speakers.findIndex((field) => field.id === user.speakerId);
    const haveOwner = ownerIdx !== -1;

    return {
      haveOwner,
      ownerIdx,
    };
  }, [speakers, user.speakerId]);

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
    let lastSpeakerIdx = fields.length;

    if (lastSpeakerIdx <= 1) return;

    if (ownerInProposal.haveOwner) {
      if (lastSpeakerIdx - 1 === ownerInProposal.ownerIdx) --lastSpeakerIdx;
    }

    remove(lastSpeakerIdx - 1);
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} sx={sx.speakersStepCountWrap}>
        <Typography variant="subtitle2">Спикеров: {fields.length}</Typography>
        <Button
          mode="iconButton"
          variant="contained"
          size="small"
          ariaLabel="Кнопка удалить спикера"
          icon={RemoveIcon}
          onClick={handleSpeakerRemove}
          isDisabled={fields.length <= 1}
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
      {!ownerInProposal.haveOwner && (
        <Typography variant="body2">
          Не удалось определить создателя заявки, пожалуйста, введите свои
          данные вручную
        </Typography>
      )}
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
              ownerIdx={ownerInProposal.ownerIdx}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
export default SpeakersStep;

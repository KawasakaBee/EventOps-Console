import {
  Dialog,
  DialogActions,
  DialogContent,
  Skeleton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import Button from '@/shared/ui/Button/Button';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import BasicStep from '../Steps/BasicStep/BasicStep';
import DescriptionStep from '../Steps/DescriptionStep/DescriptionStep';
import SpeakersStep from '../Steps/SpeakersStep/SpeakersStep';
import ExtraStep from '../Steps/ExtraStep/ExtraStep';
import SummaryStep from '../Steps/SummaryStep/SummaryStep';
import { submitSteps } from '../../model/steps';
import { submitStepsDictionary } from '../../model/dictionary';
import { ISubmitStepperProps } from './SubmitStepper.types';
import useStepper from '../../model/useStepper';
import SpeakersStepSkeleton from '../Steps/SpeakersStep/SpeakersStepSkeleton';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import { styles } from './styles';

const SubmitStepper: React.FC<ISubmitStepperProps> = ({
  id,
  speakers,
  tracks,
  reFetchTracks,
  tags,
  reFetchTags,
  clearStorage,
}) => {
  const isSpeakersResourceLoaded =
    speakers.status === 'success' || speakers.status === 'error';
  const isSpeakersError = speakers.status === 'error';

  const {
    activeStep,
    activeStepNumber,
    firstStep,
    lastStep,
    handleStepBack,
    handleStepNext,
    handleDraftSubmit,
    isDraftDialogOpened,
    draft,
    handleDraftDialogClose,
    handleDraftContinue,
  } = useStepper(id, clearStorage);

  const sx = styles();

  const isDraftDataLoaded =
    draft.status === 'success' || draft.status === 'error';
  const isDraftError = draft.status === 'error';

  const submissionStep = () => {
    switch (activeStep) {
      case 'description':
        return <DescriptionStep />;
      case 'speakers':
        return isSpeakersResourceLoaded ? (
          <SpeakersStep
            errorMessage={isSpeakersError ? speakers.message : null}
          />
        ) : (
          <SpeakersStepSkeleton />
        );
      case 'extra':
        return <ExtraStep tags={tags} reFetchTags={reFetchTags} />;
      case 'summary':
        return <SummaryStep tracks={tracks} />;
      default:
        return <BasicStep tracks={tracks} reFetchTracks={reFetchTracks} />;
    }
  };

  return (
    <>
      <Stack spacing={4}>
        <Stepper activeStep={activeStepNumber}>
          {submitSteps.map((step) => (
            <Step key={step}>
              <StepLabel>{submitStepsDictionary[step]}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <SectionCard title={submitStepsDictionary[activeStep]}>
          {submissionStep()}
        </SectionCard>
        <Stack direction="row" spacing={2}>
          <Button
            mode="button"
            variant="contained"
            size="medium"
            type="button"
            isDisabled={firstStep}
            onClick={handleStepBack}
          >
            Назад
          </Button>

          {!lastStep && (
            <Button
              mode="button"
              variant="contained"
              size="medium"
              type="button"
              isDisabled={lastStep}
              onClick={handleStepNext}
            >
              Далее
            </Button>
          )}
          {!id && (
            <Button
              mode="button"
              variant="contained"
              size="medium"
              type="button"
              onClick={handleDraftSubmit}
              isDisabled={draft.status === 'success'}
            >
              Сохранить черновик
            </Button>
          )}
          {lastStep && (
            <Button
              mode="button"
              variant="contained"
              size="medium"
              type="submit"
            >
              Отправить
            </Button>
          )}
        </Stack>
      </Stack>
      <Dialog
        open={isDraftDialogOpened}
        onClose={isDraftError ? handleDraftDialogClose : () => null}
        slotProps={{ paper: { sx: sx.dialogPaper } }}
      >
        {isDraftDataLoaded ? (
          <>
            <DialogContent id="dialog-description">
              {isDraftError && draft.errorProps ? (
                <Stack direction="row" spacing={1} sx={sx.dialogContentWrapper}>
                  <ErrorIcon sx={sx.dialogStatusError} />
                  <ErrorState {...draft.errorProps} />
                </Stack>
              ) : (
                <Stack direction="row" spacing={1} sx={sx.dialogContentWrapper}>
                  <DoneIcon sx={sx.dialogStatusSuccess} />
                  <Typography variant="h3">
                    Черновик успешно сохранён!
                  </Typography>
                </Stack>
              )}
            </DialogContent>
            <DialogActions sx={sx.dialogActions}>
              {!isDraftError && (
                <Button
                  mode="button"
                  variant="contained"
                  size="medium"
                  onClick={handleDraftContinue}
                >
                  Продолжить
                </Button>
              )}
            </DialogActions>
          </>
        ) : (
          <Stack spacing={2}>
            <Skeleton variant="text" width="30%" sx={sx.titleSkeleton} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="40%" height={60} />
          </Stack>
        )}
      </Dialog>
    </>
  );
};

export default SubmitStepper;

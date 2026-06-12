'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { defaultValues } from '../../model/defaultValues';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema, SettingsValues } from '@/entities/event/api/schema';
import useSettingsData from '../../model/useSettingsData';
import SettingsForm from '../SettingsForm/SettingsForm';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import getSettingsErrorState from '../../model/getSettingsErrorState';
import Button from '@/shared/ui/Button/Button';
import { styles } from './styles';

const SettingsPage = () => {
  const methods = useForm<SettingsValues>({
    defaultValues,
    resolver: zodResolver(settingsSchema),
    mode: 'onBlur',
    shouldUnregister: false,
  });

  const { handleSubmit, getValues, reset } = methods;

  const {
    createState,
    isCreateDialogOpened,
    handleFormSubmit,
    handleCreateDialogClose,
  } = useSettingsData(getValues, reset);

  const sx = styles();

  return (
    <>
      <PageHeader
        mode="outer"
        pageName="Настройки"
        title="Форма создания события"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <SettingsForm isDisabled={createState.isLoading} />
          </form>
        </FormProvider>
      </PageHeader>
      <Dialog
        open={isCreateDialogOpened}
        onClose={handleCreateDialogClose}
        slotProps={{ paper: { sx: sx.settingsPageDialogPaper } }}
      >
        {!createState.isError && (
          <DialogTitle>Событие успешно создано</DialogTitle>
        )}
        <DialogContent>
          {createState.isError
            ? isAppBaseQueryError(createState.error) && (
                <ErrorState
                  {...getSettingsErrorState(createState.error.error, {
                    retry: () => null,
                  })}
                />
              )
            : 'Вы можете продолжить работу'}
        </DialogContent>
        <DialogActions>
          <Button
            mode="button"
            variant="contained"
            size="medium"
            onClick={handleCreateDialogClose}
          >
            Закрыть окно
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SettingsPage;

import { SettingsValues } from '@/entities/event/api/schema';
import { UseFormGetValues, UseFormReset } from 'react-hook-form';
import { useCreateEventMutation } from '../api/settingsApi';
import { useState } from 'react';
import { defaultValues } from './defaultValues';

const useSettingsData = (
  getValues: UseFormGetValues<SettingsValues>,
  reset: UseFormReset<SettingsValues>,
) => {
  // state
  const [createEvent, createState] = useCreateEventMutation();
  const [isCreateDialogOpened, setIsCreateDialogOpened] = useState(false);

  // handlers

  const handleFormSubmit = async () => {
    if (createState.isLoading) return;
    const payload = getValues();

    const response = await createEvent(payload);

    setIsCreateDialogOpened(true);
    if (response.error) return;

    reset(defaultValues);
  };

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpened(false);
  };

  return {
    createState,
    isCreateDialogOpened,
    handleFormSubmit,
    handleCreateDialogClose,
  };
};

export default useSettingsData;

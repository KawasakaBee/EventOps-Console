import { ErrorStateProps } from '../../../shared/ui/ErrorState/ErrorState.types';

const getAppBarErrorState = (actions: {
  onClose: () => void;
}): ErrorStateProps => {
  return {
    type: 'snackbar',
    title: 'Ошибка авторизации',
    open: true,
    onClose: actions.onClose,
  };
};

export default getAppBarErrorState;

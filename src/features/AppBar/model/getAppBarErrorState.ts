import { ErrorEnvelope } from '../../../shared/types/api.types';
import { ErrorStateProps } from '../../../shared/ui/ErrorState/ErrorState.types';

const getAppBarErrorState = (
  error: ErrorEnvelope['error'],
  actions: {
    onClose: () => void;
  },
): ErrorStateProps => {
  return {
    type: 'snackbar',
    title: 'Ошибка авторизации',
    open: true,
    onClose: actions.onClose,
  };
};

export default getAppBarErrorState;

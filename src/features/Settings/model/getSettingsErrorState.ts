import { ErrorEnvelope } from '../../../shared/types/api.types';
import { ErrorStateProps } from '../../../shared/ui/ErrorState/ErrorState.types';

const getSettingsErrorState = (
  error: ErrorEnvelope['error'],
  actions: {
    retry: () => void;
  },
): ErrorStateProps => {
  switch (error.code) {
    case 'VALIDATE_ERROR': {
      return {
        type: 'state',
        title: 'Не удалось создать событие',
        subtitle: 'Некоторые поля не прошли проверку:',
        fullHeight: true,
        fields: error.fields,
      };
    }
    case 'FORBIDDEN':
      return {
        type: 'state',
        title: 'Доступ заблокирован',
        subtitle: 'Для Вашей роли запрещено создавать события.',
        fullHeight: true,
        link: {
          to: '/login',
          buttonName: 'Авторизоваться с другим аккаунтом',
        },
      };
    case 'INCLUSIVE_EVENT_ERROR':
      return {
        type: 'state',
        title: 'Ошибка создания события',
        subtitle: 'Такое событие уже существует',
        fullHeight: true,
      };
    case 'INVALID_RESPONSE':
      return {
        type: 'state',
        title: 'Запрос не удался',
        subtitle: 'Попробуйте отправить запрос снова.',
        fullHeight: true,
        action: {
          handler: actions.retry,
          buttonName: 'Повторить',
        },
      };
    case 'UNKNOWN_ERROR':
      return {
        type: 'state',
        title: 'Неизвестная ошибка',
        subtitle: 'Попробуйте отправить запрос снова.',
        fullHeight: true,
        action: {
          handler: actions.retry,
          buttonName: 'Повторить',
        },
      };
    case 'NETWORK_ERROR':
      return {
        type: 'state',
        title: 'Не удалось подключиться к серверу',
        subtitle: 'Проверьте соединение и попробуйте снова.',
        fullHeight: true,
        action: {
          handler: actions.retry,
          buttonName: 'Повторить',
        },
      };
    default:
      return {
        type: 'state',
        title: 'Что-то пошло не так...',
        subtitle: 'Попробуйте отправить запрос снова.',
        fullHeight: true,
        action: {
          handler: actions.retry,
          buttonName: 'Повторить',
        },
      };
  }
};

export default getSettingsErrorState;

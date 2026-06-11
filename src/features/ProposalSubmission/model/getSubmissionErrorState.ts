import { ErrorEnvelope } from '../../../shared/types/api.types';
import { ErrorStateProps } from '../../../shared/ui/ErrorState/ErrorState.types';

const getSubmissionErrorState = (
  error: ErrorEnvelope['error'],
  actions: {
    retry: () => void;
    onClose?: () => void;
  },
): ErrorStateProps => {
  switch (error.code) {
    case 'VALIDATE_ERROR': {
      return {
        type: 'state',
        title: 'Не удалось сохранить черновик',
        subtitle: 'Некоторые поля не прошли проверку:',
        fullHeight: true,
        fields: error.fields,
        action: actions.onClose
          ? {
              handler: actions.onClose,
              buttonName: 'Вернуться к заполнению',
            }
          : {
              handler: actions.retry,
              buttonName: 'Попытаться ещё раз',
            },
      };
    }
    case 'FORBIDDEN':
      return {
        type: 'state',
        title: 'Доступ заблокирован',
        subtitle: 'Вы попали на страницу, к которой у Вас нет доступа.',
        fullHeight: true,
        link: {
          to: '/submit',
          buttonName: 'Вернуться к форме подачи заявки',
        },
      };
    case 'USER_NOT_FOUND':
      return {
        type: 'state',
        title: 'Ошибка авторизации',
        subtitle:
          'Сервис не может Вас авторизовать, попробуйте авторизоваться заново.',
        fullHeight: true,
        link: {
          to: '/login',
          buttonName: 'Перейти на страницу авторизации',
        },
      };
    case 'PROPOSAL_NOT_FOUND':
      return {
        type: 'state',
        title: 'Заявка не найдена',
        subtitle:
          'Убедитесь в правильном номере заявки и попробуйте отправить запрос снова.',
        fullHeight: true,
        action: {
          handler: actions.retry,
          buttonName: 'Повторить',
        },
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

export default getSubmissionErrorState;

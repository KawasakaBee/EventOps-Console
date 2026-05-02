import { ErrorEnvelope } from '../../../shared/types/api.types';
import { ErrorStateProps } from '../../../shared/ui/ErrorState/ErrorState.types';

const getProposalErrorState = (
  error: ErrorEnvelope['error'],
  actions: {
    retry: () => void;
  },
): ErrorStateProps => {
  switch (error.code) {
    case 'FORBIDDEN':
      return {
        type: 'state',
        title: 'Доступ заблокирован',
        subtitle: 'Вы попали на страницу, к которой у Вас нет доступа.',
        fullHeight: true,
        link: {
          to: '/login',
          buttonName: 'Перейти на страницу авторизации',
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
    case 'ROLE_NOT_FOUND':
      return {
        type: 'state',
        title: 'Ошибка авторизации',
        subtitle:
          'Сервис не может определить Вашу роль, попробуйте авторизоваться заново.',
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

export default getProposalErrorState;

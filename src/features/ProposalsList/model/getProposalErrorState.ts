import { ErrorEnvelope } from '../../../shared/types/api.types';
import { ErrorStateProps } from '../../../shared/ui/ErrorState/ErrorState.types';

const getProposalErrorState = (
  error: ErrorEnvelope['error'],
  actions: {
    retry: () => void;
    resetFilters: () => void;
  },
): ErrorStateProps => {
  switch (error.code) {
    case 'FORBIDDEN':
      return {
        type: 'state',
        title: 'Доступ заблокирован',
        subtitle: 'Вы попали на страницу, к которой у Вас нет доступа.',
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
        link: {
          to: '/login',
          buttonName: 'Перейти на страницу авторизации',
        },
      };
    case 'INVALID_QUERY':
      return {
        type: 'state',
        title: 'Некорректные фильтры',
        subtitle: 'Сбросьте фильтры и попробуйте снова.',
        action: {
          handler: actions.resetFilters,
          buttonName: 'Сбросить фильтры',
        },
      };
    case 'INVALID_RESPONSE':
      return {
        type: 'state',
        title: 'Запрос не удался',
        subtitle: 'Попробуйте отправить запрос снова.',
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
        action: {
          handler: actions.retry,
          buttonName: 'Повторить',
        },
      };
  }
};

export default getProposalErrorState;

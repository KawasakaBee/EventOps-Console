import { ErrorEnvelope } from '../../../shared/types/api.types';
import { ErrorStateProps } from '../../../shared/ui/ErrorState/ErrorState.types';

const getScheduleErrorState = (
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
        link: {
          to: '/login',
          buttonName: 'Перейти на страницу авторизации',
        },
      };
    case 'SLOT_NOT_FOUND':
      return {
        type: 'state',
        title: error.message,
        subtitle: 'Попробуйте перезагрузить страницу и повторить попытку',
      };
    case 'UNASSIGN_ERROR':
      return {
        type: 'state',
        title: error.message,
        subtitle: 'Попробуйте перезагрузить страницу и повторить попытку',
      };
    case 'VALIDATE_ERROR':
      return {
        type: 'state',
        title: 'НЕвалидное значение',
        subtitle: 'Попробуйте снова',
        fullHeight: true,
        fields: error.fields,
        action: {
          handler: actions.retry,
          buttonName: 'Повторить попытку',
        },
      };
    case 'SCHEDULE_ASSIGNMENT': {
      return {
        type: 'state',
        title: 'Не удалось назначить заявку в слот',
        subtitle: error.message,
        fullHeight: true,
      };
    }
    case 'AUTH_REQUIRED':
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
    case 'INVALID_QUERY':
      return {
        type: 'state',
        title: 'Некорректный несуществующего трека',
        subtitle: 'Попробуйте запросить данные заново.',
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

export default getScheduleErrorState;

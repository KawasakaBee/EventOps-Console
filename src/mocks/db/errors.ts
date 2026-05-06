import { ErrorEnvelope } from '@/shared/types/api.types';
import { HttpResponse } from 'msw';

export const queryError = () =>
  HttpResponse.json(
    {
      error: {
        code: 'INVALID_QUERY',
        message: 'Неверные querry параметры',
      },
    } satisfies ErrorEnvelope,
    { status: 400 },
  );

export const userError = () =>
  HttpResponse.json(
    {
      error: {
        code: 'USER_NOT_FOUND',
        message: 'Пользователь не найден',
      },
    } satisfies ErrorEnvelope,
    { status: 404 },
  );

export const proposalError = () =>
  HttpResponse.json(
    {
      error: {
        code: 'PROPOSAL_NOT_FOUND',
        message: 'Заявка не найдена',
      },
    } satisfies ErrorEnvelope,
    { status: 404 },
  );

export const forbiddenError = () =>
  HttpResponse.json(
    {
      error: {
        code: 'FORBIDDEN',
        message: 'Доступ запрещён',
      },
    } satisfies ErrorEnvelope,
    { status: 403 },
  );

export const reviewerError = () =>
  HttpResponse.json(
    {
      error: {
        code: 'REVIEWER_NOT_FOUND',
        message: 'Ревьюер не найден',
      },
    } satisfies ErrorEnvelope,
    { status: 404 },
  );

export const responseError = () =>
  HttpResponse.json(
    {
      error: {
        code: 'INVALID_RESPONSE',
        message: 'Ошибка ответа',
      },
    } satisfies ErrorEnvelope,
    { status: 501 },
  );

export const unknownError = () =>
  HttpResponse.json(
    {
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'Неизвестная ошибка',
      },
    } satisfies ErrorEnvelope,
    { status: 500 },
  );

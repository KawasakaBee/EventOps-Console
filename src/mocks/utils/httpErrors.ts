import { ErrorEnvelope } from '@/shared/types/api.types';
import { HttpResponse } from 'msw';

export const inclusiveEventError = () =>
  HttpResponse.json(
    {
      error: {
        code: 'INCLUSIVE_EVENT_ERROR',
        message: 'Такое событие уже существует',
      },
    } satisfies ErrorEnvelope,
    { status: 400 },
  );

export const unassignError = () =>
  HttpResponse.json(
    {
      error: {
        code: 'UNASSIGN_ERROR',
        message: 'Не удалось удалить слот из расписания',
      },
    } satisfies ErrorEnvelope,
    { status: 400 },
  );

export const slotError = () =>
  HttpResponse.json(
    {
      error: {
        code: 'SLOT_NOT_FOUND',
        message: 'Слот не найден',
      },
    } satisfies ErrorEnvelope,
    { status: 404 },
  );

export const scheduleAssignError = (errorText: string) =>
  HttpResponse.json(
    {
      error: {
        code: 'SCHEDULE_ASSIGNMENT',
        message: errorText,
      },
    } satisfies ErrorEnvelope,
    { status: 400 },
  );

export const validationError = (fields: Record<string, string>) =>
  HttpResponse.json(
    {
      error: {
        code: 'VALIDATE_ERROR',
        message: 'Ошибка заполнения полей',
        fields,
      },
    } satisfies ErrorEnvelope,
    { status: 400 },
  );

export const queryError = () =>
  HttpResponse.json(
    {
      error: {
        code: 'INVALID_QUERY',
        message: 'Неверный запрос',
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

export const unauthorizedError = () =>
  HttpResponse.json(
    {
      error: {
        code: 'AUTH_REQUIRED',
        message: 'Требуется авторизация',
      },
    } satisfies ErrorEnvelope,
    { status: 401 },
  );

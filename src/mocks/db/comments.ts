import { Comment } from '@/entities/comment/model/types';
import { Role } from '@/entities/user/model/types';
import { ID } from '@/shared/types/primitives.types';

export const initialComments = [
  {
    id: 'comment-001',
    proposalId: 'proposal-001',
    actorId: '2',
    actorRole: 'manager',
    message:
      'После ревью можно будет принять решение по статусу без дополнительного созвона.',
    createdAt: '2026-02-01T23:00:00+03:00',
  },
  {
    id: 'comment-002',
    proposalId: 'proposal-002',
    actorId: 'reviewer-009',
    actorRole: 'reviewer',
    message:
      'Содержание выглядит перспективно, но нужна более чёткая структура.',
    createdAt: '2026-02-17T05:00:00+03:00',
  },
  {
    id: 'comment-003',
    proposalId: 'proposal-006',
    actorId: 'manager-002',
    actorRole: 'manager',
    message:
      'Заявка подходит по теме трека, но нужно проверить глубину материала.',
    createdAt: '2026-03-04T00:00:00+03:00',
  },
  {
    id: 'comment-004',
    proposalId: 'proposal-013',
    actorId: 'reviewer-010',
    actorRole: 'reviewer',
    message:
      'Содержание выглядит перспективно, но нужна более чёткая структура.',
    createdAt: '2026-04-08T04:00:00+03:00',
  },
  {
    id: 'comment-005',
    proposalId: 'proposal-015',
    actorId: 'manager-002',
    actorRole: 'manager',
    message:
      'Заявка подходит по теме трека, но нужно проверить глубину материала.',
    createdAt: '2026-03-03T07:00:00+03:00',
  },
  {
    id: 'comment-006',
    proposalId: 'proposal-019',
    actorId: 'manager-002',
    actorRole: 'manager',
    message:
      'Есть риск пересечения с похожими докладами, нужна дополнительная оценка.',
    createdAt: '2026-03-13T07:00:00+03:00',
  },
  {
    id: 'comment-007',
    proposalId: 'proposal-021',
    actorId: 'reviewer-004',
    actorRole: 'reviewer',
    message:
      'Нужно уточнить целевую аудиторию и ожидаемый уровень подготовки слушателей.',
    createdAt: '2026-03-05T04:00:00+03:00',
  },
  {
    id: 'comment-008',
    proposalId: 'proposal-023',
    actorId: 'reviewer-006',
    actorRole: 'reviewer',
    message:
      'Содержание выглядит перспективно, но нужна более чёткая структура.',
    createdAt: '2026-03-26T10:00:00+03:00',
  },
  {
    id: 'comment-009',
    proposalId: 'proposal-025',
    actorId: 'reviewer-009',
    actorRole: 'reviewer',
    message: 'Добавил предварительные замечания перед финальным ревью.',
    createdAt: '2026-04-03T05:00:00+03:00',
  },
  {
    id: 'comment-010',
    proposalId: 'proposal-027',
    actorId: '3',
    actorRole: 'reviewer',
    message:
      'Нужно уточнить целевую аудиторию и ожидаемый уровень подготовки слушателей.',
    createdAt: '2026-02-04T07:00:00+03:00',
  },
  {
    id: 'comment-011',
    proposalId: 'proposal-030',
    actorId: 'reviewer-002',
    actorRole: 'reviewer',
    message:
      'Содержание выглядит перспективно, но нужна более чёткая структура.',
    createdAt: '2026-02-23T06:00:00+03:00',
  },
  {
    id: 'comment-012',
    proposalId: 'proposal-032',
    actorId: 'manager-002',
    actorRole: 'manager',
    message:
      'Заявка подходит по теме трека, но нужно проверить глубину материала.',
    createdAt: '2026-02-12T21:00:00+03:00',
  },
  {
    id: 'comment-013',
    proposalId: 'proposal-033',
    actorId: '3',
    actorRole: 'reviewer',
    message:
      'Нужно уточнить целевую аудиторию и ожидаемый уровень подготовки слушателей.',
    createdAt: '2026-03-22T06:00:00+03:00',
  },
  {
    id: 'comment-014',
    proposalId: 'proposal-038',
    actorId: 'reviewer-003',
    actorRole: 'reviewer',
    message:
      'Нужно уточнить целевую аудиторию и ожидаемый уровень подготовки слушателей.',
    createdAt: '2026-04-10T19:00:00+03:00',
  },
  {
    id: 'comment-015',
    proposalId: 'proposal-039',
    actorId: 'reviewer-002',
    actorRole: 'reviewer',
    message:
      'Нужно уточнить целевую аудиторию и ожидаемый уровень подготовки слушателей.',
    createdAt: '2026-02-01T03:00:00+03:00',
  },
  {
    id: 'comment-016',
    proposalId: 'proposal-043',
    actorId: '2',
    actorRole: 'manager',
    message:
      'Есть риск пересечения с похожими докладами, нужна дополнительная оценка.',
    createdAt: '2026-03-17T13:00:00+03:00',
  },
  {
    id: 'comment-017',
    proposalId: 'proposal-048',
    actorId: '2',
    actorRole: 'manager',
    message:
      'Заявка подходит по теме трека, но нужно проверить глубину материала.',
    createdAt: '2026-03-03T14:00:00+03:00',
  },
  {
    id: 'comment-018',
    proposalId: 'proposal-052',
    actorId: 'manager-002',
    actorRole: 'manager',
    message:
      'После ревью можно будет принять решение по статусу без дополнительного созвона.',
    createdAt: '2026-02-05T19:00:00+03:00',
  },
  {
    id: 'comment-019',
    proposalId: 'proposal-054',
    actorId: 'manager-003',
    actorRole: 'manager',
    message:
      'Попросил ревьюера обратить внимание на практическую применимость доклада.',
    createdAt: '2026-02-20T01:00:00+03:00',
  },
  {
    id: 'comment-020',
    proposalId: 'proposal-056',
    actorId: 'reviewer-009',
    actorRole: 'reviewer',
    message:
      'Содержание выглядит перспективно, но нужна более чёткая структура.',
    createdAt: '2026-01-27T04:00:00+03:00',
  },
  {
    id: 'comment-021',
    proposalId: 'proposal-060',
    actorId: 'manager-003',
    actorRole: 'manager',
    message:
      'После ревью можно будет принять решение по статусу без дополнительного созвона.',
    createdAt: '2026-02-22T21:00:00+03:00',
  },
  {
    id: 'comment-022',
    proposalId: 'proposal-065',
    actorId: 'manager-003',
    actorRole: 'manager',
    message:
      'Есть риск пересечения с похожими докладами, нужна дополнительная оценка.',
    createdAt: '2026-03-01T02:00:00+03:00',
  },
  {
    id: 'comment-023',
    proposalId: 'proposal-068',
    actorId: 'reviewer-006',
    actorRole: 'reviewer',
    message:
      'Нужно уточнить целевую аудиторию и ожидаемый уровень подготовки слушателей.',
    createdAt: '2026-03-13T14:00:00+03:00',
  },
  {
    id: 'comment-024',
    proposalId: 'proposal-073',
    actorId: 'reviewer-005',
    actorRole: 'reviewer',
    message:
      'Нужно уточнить целевую аудиторию и ожидаемый уровень подготовки слушателей.',
    createdAt: '2026-03-22T10:00:00+03:00',
  },
  {
    id: 'comment-025',
    proposalId: 'proposal-075',
    actorId: 'reviewer-007',
    actorRole: 'reviewer',
    message:
      'Нужно уточнить целевую аудиторию и ожидаемый уровень подготовки слушателей.',
    createdAt: '2026-02-13T05:00:00+03:00',
  },
  {
    id: 'comment-026',
    proposalId: 'proposal-081',
    actorId: 'reviewer-007',
    actorRole: 'reviewer',
    message: 'Добавил предварительные замечания перед финальным ревью.',
    createdAt: '2026-04-24T11:00:00+03:00',
  },
  {
    id: 'comment-027',
    proposalId: 'proposal-083',
    actorId: '2',
    actorRole: 'manager',
    message:
      'После ревью можно будет принять решение по статусу без дополнительного созвона.',
    createdAt: '2026-02-25T07:00:00+03:00',
  },
  {
    id: 'comment-028',
    proposalId: 'proposal-084',
    actorId: 'manager-003',
    actorRole: 'manager',
    message:
      'После ревью можно будет принять решение по статусу без дополнительного созвона.',
    createdAt: '2026-02-16T13:00:00+03:00',
  },
  {
    id: 'comment-029',
    proposalId: 'proposal-087',
    actorId: 'manager-003',
    actorRole: 'manager',
    message:
      'Попросил ревьюера обратить внимание на практическую применимость доклада.',
    createdAt: '2026-03-07T23:00:00+03:00',
  },
  {
    id: 'comment-030',
    proposalId: 'proposal-091',
    actorId: 'manager-003',
    actorRole: 'manager',
    message:
      'После ревью можно будет принять решение по статусу без дополнительного созвона.',
    createdAt: '2026-03-29T17:00:00+03:00',
  },
  {
    id: 'comment-031',
    proposalId: 'proposal-094',
    actorId: 'reviewer-010',
    actorRole: 'reviewer',
    message: 'Добавил предварительные замечания перед финальным ревью.',
    createdAt: '2026-04-26T10:00:00+03:00',
  },
  {
    id: 'comment-032',
    proposalId: 'proposal-100',
    actorId: 'manager-003',
    actorRole: 'manager',
    message:
      'После ревью можно будет принять решение по статусу без дополнительного созвона.',
    createdAt: '2026-03-03T14:00:00+03:00',
  },
] satisfies Comment[];

export const comments: Comment[] = [...initialComments];

export const createComment = (
  proposalId: ID,
  actorId: ID,
  actorRole: Role,
  message: string,
): Comment => {
  const comment: Comment = {
    id: crypto.randomUUID(),
    proposalId,
    actorId,
    actorRole,
    message,
    createdAt: new Date().toISOString(),
  };

  comments.push(comment);

  return comment;
};

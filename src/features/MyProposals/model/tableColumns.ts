import { ProposalListItem } from '@/entities/proposal/model/types';

export const myProposalListItemDictionary: Record<
  Exclude<keyof ProposalListItem, 'availableStatuses'> | 'actions',
  string
> = {
  id: 'ID',
  title: 'Название',
  status: 'Статус',
  format: 'Формат',
  level: 'Уровень',
  trackId: 'Трек',
  updatedAt: 'Последнее обновление',
  actions: 'Доступные действия',
};

export const myProposalListItemKeys: (keyof ProposalListItem | 'actions')[] = [
  'id',
  'title',
  'status',
  'format',
  'level',
  'trackId',
  'updatedAt',
  'actions',
];

export const myProposalTableWidthDictionary: Record<
  Exclude<keyof ProposalListItem, 'availableStatuses'> | 'actions',
  { width: number; skeletonWidth: number }
> = {
  id: {
    width: 90,
    skeletonWidth: 70,
  },
  title: {
    width: 460,
    skeletonWidth: 420,
  },
  status: {
    width: 210,
    skeletonWidth: 190,
  },
  format: {
    width: 120,
    skeletonWidth: 100,
  },
  level: {
    width: 120,
    skeletonWidth: 100,
  },
  trackId: {
    width: 180,
    skeletonWidth: 160,
  },
  updatedAt: {
    width: 180,
    skeletonWidth: 140,
  },
  actions: {
    width: 260,
    skeletonWidth: 220,
  },
};

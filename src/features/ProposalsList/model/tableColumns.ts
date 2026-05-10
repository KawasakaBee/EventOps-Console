import { ProposalListItem } from '@/entities/proposal/model/types';

export const proposalListItemDictionary: Record<
  Exclude<keyof ProposalListItem, 'availableStatuses'> | 'actions' | 'checkbox',
  string
> = {
  checkbox: '',
  id: 'ID',
  title: 'Название',
  status: 'Статус',
  format: 'Формат',
  level: 'Уровень',
  trackId: 'Трек',
  updatedAt: 'Последнее обновление',
  actions: 'Доступные действия',
};

export const proposalListItemKeys: (
  | keyof ProposalListItem
  | 'actions'
  | 'checkbox'
)[] = [
  'checkbox',
  'id',
  'title',
  'status',
  'format',
  'level',
  'trackId',
  'updatedAt',
  'actions',
];

export const proposalTableWidthDictionary: Record<
  Exclude<keyof ProposalListItem, 'availableStatuses'> | 'actions' | 'checkbox',
  { width: number; skeletonWidth: number }
> = {
  checkbox: {
    width: 40,
    skeletonWidth: 20,
  },
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
    skeletonWidth: 160,
  },
  actions: {
    width: 260,
    skeletonWidth: 240,
  },
};

import { ProposalListItem } from '@/entities/proposal/model/types';

export const recentListItemDictionary: Record<
  Exclude<keyof ProposalListItem, 'availableStatuses'>,
  string
> = {
  id: 'ID',
  title: 'Название',
  status: 'Статус',
  format: 'Формат',
  level: 'Уровень',
  trackId: 'Трек',
  eventId: 'Событие',
  updatedAt: 'Последнее обновление',
};

export const recentListItemKeys: (keyof ProposalListItem)[] = [
  'id',
  'title',
  'status',
  'format',
  'level',
  'trackId',
  'eventId',
  'updatedAt',
];

export const recentTableWidthDictionary: Record<
  Exclude<keyof ProposalListItem, 'availableStatuses'>,
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
  eventId: {
    width: 210,
    skeletonWidth: 190,
  },
  updatedAt: {
    width: 180,
    skeletonWidth: 160,
  },
};

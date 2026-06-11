import { ProposalListItem } from '@/entities/proposal/model/types';
import getResponsiveValue from '@/shared/utils/getResponsiveValue';

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
  eventId: 'Событие',
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
  'eventId',
  'updatedAt',
  'actions',
];

export const proposalTableWidthDictionary: ({
  isDesktop,
  isLaptop,
  viewportWidth,
}: {
  isDesktop: boolean;
  isLaptop: boolean;
  viewportWidth: number;
}) => Record<
  Exclude<keyof ProposalListItem, 'availableStatuses'> | 'actions' | 'checkbox',
  { width: number; skeletonWidth: number }
> = ({ isDesktop, isLaptop, viewportWidth }) => ({
  checkbox: {
    width: isDesktop
      ? getResponsiveValue(60, 40, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(40, 30, 1440, 1366, viewportWidth)
        : 30,
    skeletonWidth: isDesktop
      ? getResponsiveValue(40, 30, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(30, 20, 1440, 1366, viewportWidth)
        : 20,
  },
  id: {
    width: isDesktop
      ? getResponsiveValue(90, 70, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(70, 30, 1440, 1366, viewportWidth)
        : 30,
    skeletonWidth: isDesktop
      ? getResponsiveValue(70, 30, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(30, 20, 1440, 1366, viewportWidth)
        : 20,
  },
  title: {
    width: isDesktop
      ? getResponsiveValue(460, 280, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(280, 200, 1440, 1366, viewportWidth)
        : 200,
    skeletonWidth: isDesktop
      ? getResponsiveValue(280, 200, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(200, 190, 1440, 1366, viewportWidth)
        : 190,
  },
  status: {
    width: isDesktop
      ? getResponsiveValue(210, 140, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(140, 100, 1440, 1366, viewportWidth)
        : 100,
    skeletonWidth: isDesktop
      ? getResponsiveValue(140, 100, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(100, 90, 1440, 1366, viewportWidth)
        : 90,
  },
  format: {
    width: isDesktop
      ? getResponsiveValue(120, 80, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(80, 60, 1440, 1366, viewportWidth)
        : 60,
    skeletonWidth: isDesktop
      ? getResponsiveValue(80, 60, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(60, 50, 1440, 1366, viewportWidth)
        : 50,
  },
  level: {
    width: isDesktop
      ? getResponsiveValue(120, 80, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(80, 60, 1440, 1366, viewportWidth)
        : 60,
    skeletonWidth: isDesktop
      ? getResponsiveValue(80, 60, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(60, 50, 1440, 1366, viewportWidth)
        : 50,
  },
  trackId: {
    width: isDesktop
      ? getResponsiveValue(180, 140, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(140, 100, 1440, 1366, viewportWidth)
        : 100,
    skeletonWidth: isDesktop
      ? getResponsiveValue(140, 100, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(100, 90, 1440, 1366, viewportWidth)
        : 90,
  },
  eventId: {
    width: isDesktop
      ? getResponsiveValue(180, 140, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(140, 100, 1440, 1366, viewportWidth)
        : 100,
    skeletonWidth: isDesktop
      ? getResponsiveValue(140, 100, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(100, 90, 1440, 1366, viewportWidth)
        : 90,
  },
  updatedAt: {
    width: isDesktop
      ? getResponsiveValue(180, 140, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(140, 100, 1440, 1366, viewportWidth)
        : 100,
    skeletonWidth: isDesktop
      ? getResponsiveValue(140, 100, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(100, 90, 1440, 1366, viewportWidth)
        : 90,
  },
  actions: {
    width: isDesktop
      ? getResponsiveValue(180, 140, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(140, 100, 1440, 1366, viewportWidth)
        : 100,
    skeletonWidth: isDesktop
      ? getResponsiveValue(140, 100, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(100, 90, 1440, 1366, viewportWidth)
        : 90,
  },
});

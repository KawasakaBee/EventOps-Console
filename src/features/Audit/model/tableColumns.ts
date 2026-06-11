import { AuditLog } from '@/entities/audit/model/types';
import getResponsiveValue from '@/shared/utils/getResponsiveValue';

export const auditListItemDictionary: Record<keyof AuditLog, string> = {
  id: 'ID действия',
  action: 'Действие',
  entityType: 'Сущность',
  entityId: 'ID сущности',
  eventId: 'Событие',
  actorId: 'Пользователь',
  payload: 'Примечание',
  createdAt: 'Время',
};

export const auditListItemKeys: (keyof AuditLog)[] = [
  'id',
  'action',
  'entityType',
  'entityId',
  'eventId',
  'actorId',
  'payload',
  'createdAt',
];

export const auditTableWidthDictionary: ({
  isDesktop,
  isLaptop,
  viewportWidth,
}: {
  isDesktop: boolean;
  isLaptop: boolean;
  viewportWidth: number;
}) => Record<keyof AuditLog, { width: number; skeletonWidth: number }> = ({
  isDesktop,
  isLaptop,
  viewportWidth,
}) => ({
  id: {
    width: isDesktop
      ? getResponsiveValue(90, 70, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(70, 60, 1440, 1366, viewportWidth)
        : 60,
    skeletonWidth: isDesktop
      ? getResponsiveValue(70, 60, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(60, 50, 1440, 1366, viewportWidth)
        : 50,
  },
  action: {
    width: isDesktop
      ? getResponsiveValue(210, 190, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(190, 170, 1440, 1366, viewportWidth)
        : 170,
    skeletonWidth: isDesktop
      ? getResponsiveValue(190, 130, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(130, 120, 1440, 1366, viewportWidth)
        : 120,
  },
  entityType: {
    width: isDesktop
      ? getResponsiveValue(210, 190, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(190, 170, 1440, 1366, viewportWidth)
        : 170,
    skeletonWidth: isDesktop
      ? getResponsiveValue(190, 130, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(130, 120, 1440, 1366, viewportWidth)
        : 120,
  },
  entityId: {
    width: isDesktop
      ? getResponsiveValue(90, 70, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(70, 60, 1440, 1366, viewportWidth)
        : 60,
    skeletonWidth: isDesktop
      ? getResponsiveValue(70, 60, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(60, 50, 1440, 1366, viewportWidth)
        : 50,
  },
  eventId: {
    width: isDesktop
      ? getResponsiveValue(210, 190, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(190, 170, 1440, 1366, viewportWidth)
        : 170,
    skeletonWidth: isDesktop
      ? getResponsiveValue(190, 130, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(130, 120, 1440, 1366, viewportWidth)
        : 120,
  },
  actorId: {
    width: isDesktop
      ? getResponsiveValue(210, 190, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(190, 170, 1440, 1366, viewportWidth)
        : 170,
    skeletonWidth: isDesktop
      ? getResponsiveValue(190, 170, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(170, 160, 1440, 1366, viewportWidth)
        : 160,
  },
  payload: {
    width: isDesktop
      ? getResponsiveValue(210, 190, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(190, 170, 1440, 1366, viewportWidth)
        : 170,
    skeletonWidth: isDesktop
      ? getResponsiveValue(190, 170, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(170, 160, 1440, 1366, viewportWidth)
        : 160,
  },
  createdAt: {
    width: isDesktop
      ? getResponsiveValue(180, 140, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(140, 120, 1440, 1366, viewportWidth)
        : 120,
    skeletonWidth: isDesktop
      ? getResponsiveValue(140, 120, 1920, 1440, viewportWidth)
      : isLaptop
        ? getResponsiveValue(120, 110, 1440, 1366, viewportWidth)
        : 110,
  },
});

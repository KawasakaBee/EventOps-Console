import { User } from '@/entities/user/model/types';
import { Permission, Role, Route } from '../types/primitives.types';
import {
  ProposalFormat,
  ProposalLevel,
  ProposalStatus,
} from '@/entities/proposal/model/types';

export const routesByRole: Record<Role, Route[]> = {
  admin: [
    '/dashboard',
    '/proposals',
    '/proposals/[id]',
    '/speakers',
    '/schedule',
    '/analytics',
    '/settings',
    '/audit',
  ],
  manager: [
    '/dashboard',
    '/proposals',
    '/proposals/[id]',
    '/speakers',
    '/schedule',
    '/analytics',
    '/settings',
    '/audit',
  ],
  reviewer: ['/proposals', '/proposals/[id]'],
  speaker: ['/proposals/[id]', '/submit', '/my-proposals'],
};

export const permissionsByRole: Record<Role, Permission[]> = {
  admin: [
    'dashboard:view',
    'proposals:list',
    'proposals:view',
    'proposals:change-status',
    'review:assign',
    'speakers:list',
    'schedule:view',
    'schedule:assign',
    'audit:view',
    'settings:view',
    'settings:update',
  ],
  manager: [
    'dashboard:view',
    'proposals:list',
    'proposals:view',
    'proposals:update',
    'proposals:change-status',
    'review:assign',
    'review:comment',
    'speakers:list',
    'schedule:view',
    'schedule:assign',
    'audit:view',
    'settings:view',
  ],
  reviewer: [
    'proposals:list',
    'proposals:view',
    'review:create',
    'review:comment',
  ],
  speaker: ['proposals:view', 'proposals:create', 'proposals:update'],
};

export const manager: User = {
  id: '2',
  name: 'Manager',
  email: 'manager@gmail.com',
  role: 'manager',
  eventIds: ['1'],
  permissions: permissionsByRole.manager,
};

export const reviewer: User = {
  id: '3',
  name: 'Reviewer',
  email: 'reviewer@gmail.com',
  role: 'reviewer',
  eventIds: ['1'],
  permissions: permissionsByRole.reviewer,
};

export const speaker: User = {
  id: '4',
  name: 'Speaker',
  email: 'speaker@gmail.com',
  role: 'speaker',
  eventIds: ['1'],
  permissions: permissionsByRole.speaker,
};

export const routesDictionary: Map<Route, string> = new Map([
  ['/dashboard', 'Панель управления'],
  ['/proposals', 'Заявки'],
  ['/submit', 'Создать заявку'],
  ['/my-proposals', 'Мои заявки'],
  ['/speakers', 'Спикеры'],
  ['/schedule', 'Расписание'],
  ['/analytics', 'Аналитика'],
  ['/settings', 'Настройки'],
  ['/audit', 'Аудит'],
]);

export const statusDictionary: Map<ProposalStatus, string> = new Map([
  ['draft', 'Черновик'],
  ['submitted', 'Отправлена'],
  ['in_review', 'На ревью'],
  ['changes_requested', 'Запрос на изменения'],
  ['accepted', 'Принята'],
  ['rejected', 'Отклонена'],
  ['scheduled', 'В расписании'],
]);

export const levelDictionary: Map<ProposalLevel, string> = new Map([
  ['junior', 'Джуниор'],
  ['middle', 'Миддл'],
  ['senior', 'Сеньор'],
]);

export const formatDicrionary: Map<ProposalFormat, string> = new Map([
  ['lightning', 'Молния'],
  ['talk', 'Беседа'],
  ['workshop', 'Воркшоп'],
]);

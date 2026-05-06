import { Proposal } from '@/entities/proposal/model/types';
import { SortOrder } from '@/shared/types/primitives.types';
import { tracks } from '../db/track';
import {
  formatDictionary,
  levelDictionary,
  statusDictionary,
} from '@/shared/data';
import { QueryParams } from '@/shared/types/api.types';

const sortById = (
  proposals: Proposal[],
  sortBy: 'id',
  sortOrder: SortOrder,
): Proposal[] => {
  return proposals.toSorted((a, b) => {
    return sortOrder === 'asc'
      ? a[sortBy].localeCompare(b[sortBy], 'en')
      : b[sortBy].localeCompare(a[sortBy], 'en');
  });
};

const sortByTitle = (
  proposals: Proposal[],
  sortBy: 'title',
  sortOrder: SortOrder,
): Proposal[] => {
  const collator = new Intl.Collator(['ru', 'en'], {
    sensitivity: 'base',
    numeric: true,
  });

  return proposals.toSorted((a, b) => {
    return sortOrder === 'asc'
      ? collator.compare(a[sortBy], b[sortBy])
      : collator.compare(b[sortBy], a[sortBy]);
  });
};

const sortByStatus = (
  proposals: Proposal[],
  sortBy: 'status',
  sortOrder: SortOrder,
): Proposal[] => {
  return proposals.toSorted((a, b) => {
    const aValue = statusDictionary[a[sortBy]];
    const bValue = statusDictionary[b[sortBy]];

    return sortOrder === 'asc'
      ? aValue.localeCompare(bValue, 'ru')
      : bValue.localeCompare(aValue, 'ru');
  });
};

const sortByFormat = (
  proposals: Proposal[],
  sortBy: 'format',
  sortOrder: SortOrder,
): Proposal[] => {
  return proposals.toSorted((a, b) => {
    const aValue = formatDictionary[a[sortBy]];
    const bValue = formatDictionary[b[sortBy]];

    return sortOrder === 'asc'
      ? aValue.localeCompare(bValue, 'ru')
      : bValue.localeCompare(aValue, 'ru');
  });
};

const sortByLevel = (
  proposals: Proposal[],
  sortBy: 'level',
  sortOrder: SortOrder,
): Proposal[] => {
  return proposals.toSorted((a, b) => {
    const aValue = levelDictionary[a[sortBy]];
    const bValue = levelDictionary[b[sortBy]];

    return sortOrder === 'asc'
      ? aValue.localeCompare(bValue, 'ru')
      : bValue.localeCompare(aValue, 'ru');
  });
};

const sortByTrackId = (
  proposals: Proposal[],
  sortBy: 'trackId',
  sortOrder: SortOrder,
): Proposal[] => {
  return proposals.toSorted((a, b) => {
    const aValue = tracks.find((item) => item.id === a[sortBy]);
    const bValue = tracks.find((item) => item.id === b[sortBy]);

    if (!aValue || !bValue) {
      return sortOrder === 'asc'
        ? Number(a[sortBy]) - Number(b[sortBy])
        : Number(b[sortBy]) - Number(a[sortBy]);
    }

    return sortOrder === 'asc'
      ? aValue.title.localeCompare(bValue.title, 'ru')
      : bValue.title.localeCompare(aValue.title, 'ru');
  });
};

const sortByUpdatedTime = (
  proposals: Proposal[],
  sortBy: 'updatedAt',
  sortOrder: SortOrder,
): Proposal[] => {
  return proposals.toSorted((a, b) => {
    const aValue = new Date(a[sortBy]).getTime();
    const bValue = new Date(b[sortBy]).getTime();

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });
};

export const applyProposalSort = (
  queryParams: QueryParams,
  proposals: Proposal[],
): Proposal[] => {
  const sortBy = queryParams.sortBy;
  const sortOrder = queryParams.sortOrder;
  if (!sortBy) return proposals;

  if (sortBy === 'id') return sortById(proposals, sortBy, sortOrder);
  if (sortBy === 'title') return sortByTitle(proposals, sortBy, sortOrder);
  if (sortBy === 'status') return sortByStatus(proposals, sortBy, sortOrder);
  if (sortBy === 'format') return sortByFormat(proposals, sortBy, sortOrder);
  if (sortBy === 'level') return sortByLevel(proposals, sortBy, sortOrder);
  if (sortBy === 'trackId') return sortByTrackId(proposals, sortBy, sortOrder);
  if (sortBy === 'updatedAt')
    return sortByUpdatedTime(proposals, sortBy, sortOrder);

  return proposals;
};

import { ProposalFieldChange } from '@/entities/history/model/types';
import isoToLocalDate from './isoToLocalDate';
import {
  isIsoTime,
  isProposalFormat,
  isProposalLevel,
  isProposalStatus,
} from './typeGuards';
import formatDuration from './formatDuration';
import { formatDictionary, levelDictionary, statusDictionary } from '../data';

const normalizeHistoryChanges = (changes: ProposalFieldChange): string[] => {
  const resultParse = (prev: string, next: string) => {
    return [prev, next];
  };

  if (changes.field === 'createdAt' || changes.field === 'updatedAt') {
    if (!isIsoTime(changes.previousValue) || !isIsoTime(changes.nextValue))
      return resultParse(
        String(changes.previousValue),
        String(changes.nextValue),
      );
    return resultParse(
      isoToLocalDate(changes.previousValue),
      isoToLocalDate(changes.nextValue),
    );
  }

  if (changes.field === 'duration') {
    if (
      typeof changes.previousValue !== 'number' ||
      typeof changes.nextValue !== 'number'
    )
      return resultParse(
        String(changes.previousValue),
        String(changes.nextValue),
      );
    return resultParse(
      formatDuration(changes.previousValue),
      formatDuration(changes.nextValue),
    );
  }

  if (changes.field === 'format') {
    if (
      !isProposalFormat(changes.previousValue) ||
      !isProposalFormat(changes.nextValue)
    )
      return resultParse(
        String(changes.previousValue),
        String(changes.nextValue),
      );
    return resultParse(
      String(formatDictionary.get(changes.previousValue)),
      String(formatDictionary.get(changes.nextValue)),
    );
  }

  if (changes.field === 'status') {
    if (
      !isProposalStatus(changes.previousValue) ||
      !isProposalStatus(changes.nextValue)
    )
      return resultParse(
        String(changes.previousValue),
        String(changes.nextValue),
      );
    return resultParse(
      String(statusDictionary.get(changes.previousValue)),
      String(statusDictionary.get(changes.nextValue)),
    );
  }

  if (changes.field === 'level') {
    if (
      !isProposalLevel(changes.previousValue) ||
      !isProposalLevel(changes.nextValue)
    )
      return resultParse(
        String(changes.previousValue),
        String(changes.nextValue),
      );
    return resultParse(
      String(levelDictionary.get(changes.previousValue)),
      String(levelDictionary.get(changes.nextValue)),
    );
  }

  return resultParse(String(changes.previousValue), String(changes.nextValue));
};

export default normalizeHistoryChanges;

import {
  FormattedChangeValues,
  ProposalFieldChange,
} from '@/entities/history/model/types';
import formatIsoDateTime from '../../../shared/utils/formatIsoDateTime';
import formatMinutesDuration from '../../../shared/utils/formatMinutesDuration';
import {
  formatDictionary,
  levelDictionary,
  statusDictionary,
} from '@/entities/proposal/model/dictionaries';
import { isIsoDateTime } from '../../../shared/utils/typeGuards';
import {
  isProposalFormat,
  isProposalLevel,
  isProposalStatus,
} from '@/entities/proposal/model/typeGuards';
import { tracks } from '@/mocks/db/tracks';

const formatHistoryChangeValues = (
  changes: ProposalFieldChange,
): FormattedChangeValues => {
  const resultParse = (prev: string, next: string): FormattedChangeValues => {
    return [prev || 'Начальное значение', next];
  };

  if (changes.field === 'createdAt' || changes.field === 'updatedAt') {
    if (
      !isIsoDateTime(changes.previousValue) ||
      !isIsoDateTime(changes.nextValue)
    )
      return resultParse(
        String(changes.previousValue),
        String(changes.nextValue),
      );
    return resultParse(
      formatIsoDateTime(changes.previousValue),
      formatIsoDateTime(changes.nextValue),
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
      formatMinutesDuration(changes.previousValue),
      formatMinutesDuration(changes.nextValue),
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
      String(formatDictionary[changes.previousValue]),
      String(formatDictionary[changes.nextValue]),
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
      String(statusDictionary[changes.previousValue]),
      String(statusDictionary[changes.nextValue]),
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
      String(levelDictionary[changes.previousValue]),
      String(levelDictionary[changes.nextValue]),
    );
  }

  if (changes.field === 'trackId') {
    if (
      typeof changes.previousValue !== 'string' ||
      typeof changes.nextValue !== 'string'
    ) {
      return resultParse(
        String(changes.previousValue),
        String(changes.nextValue),
      );
    }

    const prevTrack = tracks.find((item) => item.id === changes.previousValue);
    const nextTrack = tracks.find((item) => item.id === changes.nextValue);

    if (!nextTrack) {
      return resultParse(
        String(prevTrack?.title || ''),
        String(changes.nextValue),
      );
    }

    return resultParse(String(prevTrack?.title || ''), String(nextTrack.title));
  }

  return resultParse(String(changes.previousValue), String(changes.nextValue));
};

export default formatHistoryChangeValues;

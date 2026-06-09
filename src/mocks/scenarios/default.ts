import { historyItemToAuditItem, scheduleSlotToAuditItem } from '../db/audit';
import { comments } from '../db/comments';
import { history, scheduleHistory } from '../db/history';
import { proposals } from '../db/proposals';
import { reviewers, reviews } from '../db/reviews';
import { schedule } from '../db/schedule';
import { speakers } from '../db/speakers';
import { tracks } from '../db/tracks';
import { users } from '../db/users';
import { MockScenario } from './types';

const clone = <T>(value: T): T => structuredClone(value);

const defaultScenarioSnapshot: MockScenario = {
  users: clone(users),
  speakers: clone(speakers),
  proposals: clone(proposals),
  reviews: clone(reviews),
  reviewers: clone(reviewers),
  comments: clone(comments),
  history: clone(history),
  scheduleHistory: clone(scheduleHistory),
  audit: [
    ...clone(history.map(historyItemToAuditItem)),
    ...clone(scheduleHistory.map(scheduleSlotToAuditItem)),
  ],
  tracks: clone(tracks),
  schedule: clone(schedule),
};

export const buildDefaultScenario = (): MockScenario =>
  clone(defaultScenarioSnapshot);

export const buildEmptyProposals = (): MockScenario => ({
  users: clone(defaultScenarioSnapshot.users),
  speakers: clone(defaultScenarioSnapshot.speakers),
  proposals: [],
  reviews: [],
  reviewers: [],
  comments: [],
  history: [],
  scheduleHistory: [],
  audit: [],
  tracks: [],
  schedule: { days: [], times: [], slots: [] },
});

export const buildEmptyWithProposals = (): MockScenario => ({
  users: clone(defaultScenarioSnapshot.users),
  speakers: clone(defaultScenarioSnapshot.speakers),
  proposals: clone(defaultScenarioSnapshot.proposals),
  reviews: [],
  reviewers: [],
  comments: [],
  history: [],
  scheduleHistory: [],
  audit: [],
  tracks: clone(defaultScenarioSnapshot.tracks),
  schedule: { days: [], times: [], slots: [] },
});

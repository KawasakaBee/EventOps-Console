import { comments } from '../db/comments';
import { history } from '../db/history';
import { proposals } from '../db/proposals';
import { reviews } from '../db/reviews';
import { speakers } from '../db/speakers';
import { users } from '../db/users';
import { MockScenario } from './types';

export const buildDefaultScenario = (): MockScenario => ({
  users: users,
  speakers: speakers,
  proposals: proposals,
  reviews: reviews,
  comments: comments,
  history: history,
});

export const buildEmptyProposals = (): MockScenario => ({
  users: users,
  speakers: speakers,
  proposals: [],
  reviews: [],
  comments: [],
  history: [],
});

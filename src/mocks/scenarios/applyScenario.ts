import { audit } from '../db/audit';
import { comments } from '../db/comments';
import { history } from '../db/history';
import { proposals } from '../db/proposals';
import { reviewers, reviews } from '../db/reviews';
import { schedule } from '../db/schedule';
import { speakers } from '../db/speakers';
import { tracks } from '../db/tracks';
import { users } from '../db/users';
import { MockScenario } from './types';

const replaceArray = <T>(target: T[], next: T[]) => {
  target.splice(0, target.length, ...structuredClone(next));
};

const replaceObject = <T extends object>(target: T, next: T) => {
  if (Array.isArray(target) || target === null) return;
  (Object.keys(target) as Array<keyof typeof target>).forEach((key) => {
    if (!Array.isArray(target[key]) || !Array.isArray(next[key])) return;
    replaceArray(target[key], next[key]);
  });
};

export const applyScenario = (scenario: MockScenario) => {
  replaceArray(users, scenario.users);
  replaceArray(speakers, scenario.speakers);
  replaceArray(proposals, scenario.proposals);
  replaceArray(reviews, scenario.reviews);
  replaceArray(reviewers, scenario.reviewers);
  replaceArray(comments, scenario.comments);
  replaceArray(history, scenario.history);
  replaceArray(tracks, scenario.tracks);
  replaceArray(audit, scenario.audit);
  replaceObject(schedule, scenario.schedule);
};

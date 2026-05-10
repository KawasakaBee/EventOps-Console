import { comments } from '../db/comments';
import { history } from '../db/history';
import { proposals } from '../db/proposals';
import { reviews } from '../db/reviews';
import { speakers } from '../db/speakers';
import { tracks } from '../db/tracks';
import { users } from '../db/users';
import { MockScenario } from './types';

const replaceArray = <T>(target: T[], next: T[]) => {
  target.splice(0, target.length, ...structuredClone(next));
};

export const applyScenario = (scenario: MockScenario) => {
  replaceArray(users, scenario.users);
  replaceArray(speakers, scenario.speakers);
  replaceArray(proposals, scenario.proposals);
  replaceArray(reviews, scenario.reviews);
  replaceArray(comments, scenario.comments);
  replaceArray(history, scenario.history);
  replaceArray(tracks, scenario.tracks);
};

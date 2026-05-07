import {
  buildDefaultScenario,
  buildEmptyProposals,
  buildEmptyWithProposals,
} from './default';

export const scenarioFactories = {
  default: buildDefaultScenario,
  emptyProposals: buildEmptyProposals,
  emptyWithProposals: buildEmptyWithProposals,
};

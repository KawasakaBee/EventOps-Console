import { scenarioFactories } from '.';
import { applyScenario } from './applyScenario';
import { assertIntegrity } from './assertIntegrity';

export const resetMockDb = () => {
  const scenario = scenarioFactories.default();

  assertIntegrity(scenario);
  applyScenario(scenario);
};

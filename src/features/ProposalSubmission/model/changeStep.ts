import type { SubmitStep } from './steps';

const changeStep = (
  step: SubmitStep,
  direction: 'back' | 'next',
): SubmitStep => {
  if (direction === 'back') {
    switch (step) {
      case 'description':
        return 'basic';
      case 'speakers':
        return 'description';
      case 'extra':
        return 'speakers';
      case 'summary':
        return 'extra';
      default:
        return 'basic';
    }
  }

  switch (step) {
    case 'basic':
      return 'description';
    case 'description':
      return 'speakers';
    case 'speakers':
      return 'extra';
    case 'extra':
      return 'summary';
    default:
      return 'summary';
  }
};

export default changeStep;

import type { SubmitStep } from './steps';

const changeStep = (
  step: SubmitStep,
  direction: 'back' | 'next',
): SubmitStep => {
  if (direction === 'back') {
    switch (step) {
      case 'description':
        return 'basic';
      case 'speaker':
        return 'description';
      case 'extra':
        return 'speaker';
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
      return 'speaker';
    case 'speaker':
      return 'extra';
    case 'extra':
      return 'summary';
    default:
      return 'summary';
  }
};

export default changeStep;

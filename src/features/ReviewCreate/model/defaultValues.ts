import { CreateReviewValues } from './schema';

const defaultValues = {
  scoreContent: '',
  scoreRelevance: '',
  scoreDelivery: '',
  recommendation: 'request_changes',
  comment: '',
} satisfies CreateReviewValues;

export default defaultValues;

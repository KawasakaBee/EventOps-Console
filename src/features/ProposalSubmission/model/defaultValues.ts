import type { SubmitValues } from './schema';

const defaultValues = {
  title: '',
  format: 'talk',
  duration: '',
  level: 'junior',
  trackId: '',
  abstract: '',
  takeaways: '',
  targetAudience: '',
  prerequisites: '',
  speakers: [],
  tags: [],
  notes: '',
  consent: false,
} satisfies SubmitValues;

export default defaultValues;

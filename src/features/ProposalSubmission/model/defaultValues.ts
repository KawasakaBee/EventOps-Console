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
  speakers: [
    {
      id: null,
      name: '',
      email: '',
      company: '',
      position: '',
      bio: '',
      links: '',
    },
  ],
  tags: [],
  notes: '',
  consent: false,
} satisfies SubmitValues;

export default defaultValues;

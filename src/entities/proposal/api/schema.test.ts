import { describe, expect, it } from 'vitest';
import { proposalDraftSchema } from './schema';

const validDraftCourse = {
  status: 'draft',
  title:
    'Дизайн-система в реальном продукте: где заканчивается UI kit на реальном кейсе',
  format: 'workshop',
  level: 'junior',
  trackId: '1',
  prerequisites: '',
  speakers: [
    {
      id: null,
      email: 'maxim.borisov@example.com',
      position: 'Fullstack Developer',
    },
  ],
  tags: [],
  notes: '',
};

describe('proposalDraftSchema', () => {
  it('Валидная схема проходит', () => {
    const result = proposalDraftSchema.safeParse(validDraftCourse);

    expect(result.success).toBe(true);
  });
});

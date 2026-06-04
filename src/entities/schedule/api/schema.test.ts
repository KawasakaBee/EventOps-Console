import { describe, expect, it } from 'vitest';
import { scheduleSchema } from './schema';

const validSchemaCourse = {
  trackId: 'testTrackId',
  date: 'testDate',
  startTime: 'testStartTime',
  endTime: 'testEndTime',
  proposalId: 'testProposalId',
};

describe('scheduleSchema', () => {
  it('Валидная схема проходит', () => {
    const result = scheduleSchema.safeParse(validSchemaCourse);

    expect(result.success).toBe(true);
  });

  it('Невалидная схема не проходит', () => {
    const result = scheduleSchema.safeParse({
      ...validSchemaCourse,
      date: null,
      proposalId: 14,
    });

    expect(result.success).toBe(false);
  });
});

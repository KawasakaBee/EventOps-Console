import { ReviewerListItem } from '@/entities/review/model/types';
import { recommendationDicrionary } from '../data';
import { isRecommendation } from './typeGuards';
import { Comment } from '@/entities/comment/model/types';

const normalizeHistoryPayload = (
  payload: Record<string, unknown>,
  reviewers: ReviewerListItem[] | null,
  comments: Comment[],
): string[] | null => {
  const result = [];

  if (Object.hasOwn(payload, 'reason')) {
    result.push(`Причина: "${payload.reason}"`);
  }

  if (Object.hasOwn(payload, 'reviewId')) {
    result.push(`ID Ревью: "${payload.reviewId}"`);
  }

  if (Object.hasOwn(payload, 'recommendation')) {
    const recommendation = isRecommendation(payload.recommendation)
      ? recommendationDicrionary[payload.recommendation]
      : payload.recommendation;
    result.push(`Рекомендация: "${recommendation}"`);
  }

  if (Object.hasOwn(payload, 'reviewerId') && reviewers) {
    if (typeof payload.reviewerId === 'string') {
      const reviewer = reviewers.find((item) => item.id === payload.reviewerId);
      if (reviewer) {
        result.push(`Ревьюер: "${reviewer.name}"`);
      }
    }
  }

  if (Object.hasOwn(payload, 'commentId')) {
    if (typeof payload.commentId === 'string') {
      const comment = comments.find((item) => item.id === payload.commentId);
      if (comment) {
        result.push(`Комментарий: "${comment.message}"`);
      }
    }
  }

  return result.length > 0 ? result : null;
};

export default normalizeHistoryPayload;

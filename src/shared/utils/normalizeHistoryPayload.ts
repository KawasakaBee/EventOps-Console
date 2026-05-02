import { ReviewerListItem } from '@/entities/review/model/types';
import { recommendationDicrionary } from '../data';
import { isRecommendation } from './typeGuards';
import { Comment } from '@/entities/comment/model/types';

const normalizeHistoryPayload = (
  payload: Record<string, unknown>,
  reviewers: ReviewerListItem[],
  comments: Comment[],
): string | null => {
  let result = '';

  if (Object.hasOwn(payload, 'reason')) {
    result = result + 'Причина: ' + '"' + payload.reason + '"' + '\n';
  }

  if (Object.hasOwn(payload, 'reviewId')) {
    result = result + 'ID Ревью: ' + '"' + payload.reviewId + '"' + '\n';
  }

  if (Object.hasOwn(payload, 'recommendation')) {
    const recommendation = isRecommendation(payload.recommendation)
      ? recommendationDicrionary[payload.recommendation]
      : payload.recommendation;
    result = result + 'Рекомендация: ' + '"' + recommendation + '"' + '\n';
  }

  if (Object.hasOwn(payload, 'reviewerId')) {
    if (typeof payload.reviewerId === 'string') {
      const reviewer = reviewers.find((item) => item.id === payload.reviewerId);
      if (reviewer) {
        result = result + 'Ревьюер: ' + '"' + reviewer.name + '"' + '\n';
      }
    }
  }

  if (Object.hasOwn(payload, 'commentId')) {
    if (typeof payload.commentId === 'string') {
      const comment = comments.find((item) => item.id === payload.commentId);
      if (comment) {
        result = result + 'Комментарий: ' + '"' + comment.message + '"' + '\n';
      }
    }
  }

  return result === '' ? null : result;
};

export default normalizeHistoryPayload;

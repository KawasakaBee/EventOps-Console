import { ProposalStatus } from '@/entities/proposal/model/types';
import { Role } from '@/entities/user/model/types';
import { isManagerLike } from './proposalAccess';

const getAvailableProposalStatuses = (
  status: ProposalStatus,
  reviewsCount: number,
  role: Role,
): ProposalStatus[] => {
  if (!isManagerLike(role)) return [];

  if (status === 'draft') return ['submitted'];
  if (status === 'submitted') return ['in_review'];
  if (status === 'accepted') return ['scheduled'];
  if (status === 'in_review') {
    if (reviewsCount === 0) return ['changes_requested'];
    return ['changes_requested', 'accepted', 'rejected'];
  }
  if (status === 'changes_requested') return ['in_review'];

  return [];
};

export default getAvailableProposalStatuses;

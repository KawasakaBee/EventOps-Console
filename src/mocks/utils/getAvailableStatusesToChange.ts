import { ProposalStatus } from '@/entities/proposal/model/types';

const getAvailableStatusesToChange = (
  status: ProposalStatus,
  reviewsCount: number,
): ProposalStatus[] => {
  if (status === 'submitted') return ['in_review'];
  if (status === 'in_review') {
    if (reviewsCount === 0) return ['changes_requested'];
    return ['changes_requested', 'accepted', 'rejected'];
  }

  if (status === 'changes_requested') return ['in_review'];

  return [];
};

export default getAvailableStatusesToChange;

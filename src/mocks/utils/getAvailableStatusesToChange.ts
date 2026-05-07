import { ProposalStatus } from '@/entities/proposal/model/types';

const getAvailableStatusesToChange = (
  status: ProposalStatus,
): ProposalStatus[] => {
  if (status === 'submitted') return ['in_review'];
  if (status === 'in_review')
    return ['changes_requested', 'accepted', 'rejected'];
  if (status === 'changes_requested') return ['in_review'];

  return [];
};

export default getAvailableStatusesToChange;

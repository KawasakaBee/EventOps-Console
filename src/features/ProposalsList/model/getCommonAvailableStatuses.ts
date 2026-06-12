import {
  ProposalListItem,
  ProposalStatus,
} from '@/entities/proposal/model/types';

const getCommonAvailableStatuses = (
  proposalList: ProposalListItem[] | undefined,
  selectedIds: string[],
) => {
  const selectedProposals = proposalList
    ? proposalList.filter((proposal) => selectedIds.includes(proposal.id))
    : [];

  const selectedStatuses = new Set(
    selectedProposals.map((proposal) => proposal.status),
  );

  const isSelectedStatusesIdentical = selectedStatuses.size === 1;

  const commonAvailableStatuses = (): ProposalStatus[] => {
    if (selectedProposals.length === 0) return [];
    if (!isSelectedStatusesIdentical) return [];

    const [firstItem, ...restItems] = selectedProposals;

    const restStatusSets = restItems.map(
      (item) => new Set(item.availableStatuses),
    );

    return firstItem.availableStatuses.filter((status) =>
      restStatusSets.every((statusSet) => statusSet.has(status)),
    );
  };

  return {
    selectedStatuses,
    commonAvailableStatuses,
  };
};

export default getCommonAvailableStatuses;

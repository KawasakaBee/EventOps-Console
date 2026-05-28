import { ID } from '@/shared/types/primitives.types';
import getProposalErrorState from '../model/getProposalErrorState';
import { GetProposalResponse } from '@/entities/proposal/api/contracts';
import { ProposalResource } from '../model/types';
import { normalizeFetch } from '@/shared/api/normalizeResponse';

export const fetchProposal = async (
  id: ID,
  retry: () => void,
): Promise<{
  proposal: ProposalResource;
  data: GetProposalResponse | null;
}> => {
  const getErrorActions = () => ({
    retry,
  });

  const proposal: ProposalResource = {
    status: 'loading',
    errorProps: null,
  };

  const response = await normalizeFetch<GetProposalResponse>(
    `/api/proposals/${id}`,
  );

  if (!response.ok) {
    proposal.errorProps = getProposalErrorState(
      response.error,
      getErrorActions(),
    );
    proposal.status = 'error';
    return { proposal, data: null };
  }

  proposal.status = 'success';
  return { proposal, data: response.data };
};

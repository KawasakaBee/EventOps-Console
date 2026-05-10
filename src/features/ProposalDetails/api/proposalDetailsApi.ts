import { ProposalResource, UsersResource } from '@/shared/types/resource.types';
import { GetUsersListResponse } from '@/entities/user/api/contracts';
import { fetchWithDemoAuth } from '@/shared/api/fetchWithDemoAuth';
import normalizeResponse from '@/shared/api/normalizeResponse';
import { ID } from '@/shared/types/primitives.types';
import getProposalErrorState from '../model/getProposalErrorState';
import { GetProposalResponse } from '@/entities/proposal/api/contracts';

export const fetchUsers = async (): Promise<UsersResource> => {
  const users: UsersResource = {
    status: 'loading',
    data: [],
  };

  const response = await fetchWithDemoAuth('/api/users');

  if (!response.ok) {
    users.status = 'error';
    return users;
  }

  const result = await normalizeResponse<GetUsersListResponse>(response.data);

  if (!result.ok) {
    users.status = 'error';
    return users;
  }

  users.data = result.data.users;
  users.status = 'success';
  return users;
};

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

  const response = await fetchWithDemoAuth(`/api/proposals/${id}`);

  if (!response.ok) {
    proposal.errorProps = getProposalErrorState(
      response.error,
      getErrorActions(),
    );
    proposal.status = 'error';
    return { proposal, data: null };
  }

  const result = await normalizeResponse<GetProposalResponse>(response.data);

  if (!result.ok) {
    proposal.errorProps = getProposalErrorState(
      result.error,
      getErrorActions(),
    );
    proposal.status = 'error';
    return { proposal, data: null };
  }

  proposal.status = 'success';
  return { proposal, data: result.data };
};

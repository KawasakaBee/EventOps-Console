import { GetUsersListResponse } from '@/entities/user/api/contracts';
import { ID } from '@/shared/types/primitives.types';
import getProposalErrorState from '../model/getProposalErrorState';
import { GetProposalResponse } from '@/entities/proposal/api/contracts';
import { ProposalResource, UsersResource } from '../model/types';
import { normalizeFetch } from '@/shared/api/normalizeResponse';

export const fetchUsers = async (): Promise<UsersResource> => {
  const users: UsersResource = {
    status: 'loading',
    data: [],
  };

  const response = await normalizeFetch<GetUsersListResponse>('/api/users');

  if (!response.ok) {
    users.status = 'error';
    return users;
  }

  users.data = response.data.users;
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

import {
  GetProposalResponse,
  PatchProposalResponse,
  PostProposalResponse,
} from '@/entities/proposal/api/contracts';
import { fetchWithDemoAuth } from '@/entities/user/api/fetchWithDemoAuth';
import { ID } from '@/shared/types/primitives.types';
import getSubmissionErrorState from '../model/getSubmissionErrorState';
import normalizeResponse from '@/shared/api/normalizeResponse';
import { DraftResource, SumbitProposalResource } from '../model/types';
import { SubmitValues } from '../model/schema';
import { GetSpeakerFindResponse } from '@/entities/speaker/api/contracts';

export const fetchGetDraft = async (
  id: ID,
  retry: () => void,
): Promise<DraftResource> => {
  const getErrorActions = () => ({
    retry,
  });

  const draft: DraftResource = {
    status: 'loading',
    data: null,
    errorProps: null,
  };

  const response = await fetchWithDemoAuth(`/api/proposals/${id}`);

  if (!response.ok) {
    draft.errorProps = getSubmissionErrorState(
      response.error,
      getErrorActions(),
    );
    draft.status = 'error';
    return draft;
  }

  const result = await normalizeResponse<GetProposalResponse>(response.data);

  if (!result.ok) {
    draft.errorProps = getSubmissionErrorState(result.error, getErrorActions());
    draft.status = 'error';
    return draft;
  }

  draft.status = 'success';
  draft.data = result.data;
  return draft;
};

export const fetchCreateProposal = async (
  formValues: SubmitValues,
  status: 'submitted' | 'draft',
  retry: () => void,
): Promise<SumbitProposalResource> => {
  const getErrorActions = () => ({
    retry,
  });

  const proposal: SumbitProposalResource = {
    status: 'loading',
    data: null,
    errorProps: null,
  };

  const { duration, ...restValues } = formValues;

  const normalizeDuration = Number(formValues.duration);

  const requestBody = {
    ...restValues,
    status,
    ...(duration !== '' && !Number.isNaN(normalizeDuration)
      ? { duration: normalizeDuration }
      : {}),
  };

  const response = await fetchWithDemoAuth('/api/proposals/', {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    proposal.errorProps = getSubmissionErrorState(
      response.error,
      getErrorActions(),
    );
    proposal.status = 'error';
    return proposal;
  }

  const result = await normalizeResponse<PostProposalResponse>(response.data);

  if (!result.ok) {
    proposal.errorProps = getSubmissionErrorState(
      result.error,
      getErrorActions(),
    );
    proposal.status = 'error';
    return proposal;
  }

  proposal.status = 'success';
  proposal.data = result.data.proposal;
  return proposal;
};

export const fetchChangeProposal = async (
  formValues: Partial<SubmitValues>,
  status: 'submitted' | 'draft',
  id: ID,
  retry: () => void,
): Promise<SumbitProposalResource> => {
  const getErrorActions = () => ({
    retry,
  });

  const proposal: SumbitProposalResource = {
    status: 'loading',
    data: null,
    errorProps: null,
  };

  const { duration, ...restValues } = formValues;

  const normalizeDuration =
    duration !== undefined && duration !== ''
      ? Number(formValues.duration)
      : undefined;

  const requestBody = {
    ...restValues,
    status,
    ...(normalizeDuration !== undefined && !Number.isNaN(normalizeDuration)
      ? { duration: normalizeDuration }
      : {}),
  };

  const response = await fetchWithDemoAuth(`/api/proposals/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    proposal.errorProps = getSubmissionErrorState(
      response.error,
      getErrorActions(),
    );
    proposal.status = 'error';
    return proposal;
  }

  const result = await normalizeResponse<PatchProposalResponse>(response.data);

  if (!result.ok) {
    proposal.errorProps = getSubmissionErrorState(
      result.error,
      getErrorActions(),
    );
    proposal.status = 'error';
    return proposal;
  }

  proposal.status = 'success';
  proposal.data = result.data.proposal;
  return proposal;
};

export const fetchSpeakerFind = async (
  email: string,
): Promise<GetSpeakerFindResponse> => {
  const defaultData: GetSpeakerFindResponse = {
    found: false,
    speaker: null,
  };

  const params = new URLSearchParams({ email });

  const response = await fetchWithDemoAuth(
    `/api/speakers/find?${params.toString()}`,
  );

  if (!response.ok) {
    return defaultData;
  }

  const result = await normalizeResponse<GetSpeakerFindResponse>(response.data);

  if (!result.ok) {
    return defaultData;
  }

  return result.data;
};

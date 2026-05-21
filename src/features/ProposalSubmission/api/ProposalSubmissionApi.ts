import {
  GetProposalResponse,
  PatchProposalResponse,
  PostProposalResponse,
} from '@/entities/proposal/api/contracts';
import { ID } from '@/shared/types/primitives.types';
import getSubmissionErrorState from '../model/getSubmissionErrorState';
import {
  DraftResource,
  SpeakerResource,
  SumbitProposalResource,
} from '../model/types';
import { SubmitValues } from '../model/schema';
import {
  GetSpeakerFindResponse,
  GetSpeakerItemResponse,
} from '@/entities/speaker/api/contracts';
import { normalizeFetch } from '@/shared/api/normalizeResponse';

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

  const response = await normalizeFetch<GetProposalResponse>(
    `/api/proposals/${id}`,
  );

  if (!response.ok) {
    draft.errorProps = getSubmissionErrorState(
      response.error,
      getErrorActions(),
    );
    draft.status = 'error';
    return draft;
  }

  draft.status = 'success';
  draft.data = response.data;
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

  const response = await normalizeFetch<PostProposalResponse>(
    '/api/proposals',
    {
      method: 'POST',
      body: JSON.stringify(requestBody),
    },
  );

  if (!response.ok) {
    proposal.errorProps = getSubmissionErrorState(
      response.error,
      getErrorActions(),
    );
    proposal.status = 'error';
    return proposal;
  }

  proposal.status = 'success';
  proposal.data = response.data.proposal;
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

  const response = await normalizeFetch<PatchProposalResponse>(
    `/api/proposals/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(requestBody),
    },
  );

  if (!response.ok) {
    proposal.errorProps = getSubmissionErrorState(
      response.error,
      getErrorActions(),
    );
    proposal.status = 'error';
    return proposal;
  }

  proposal.status = 'success';
  proposal.data = response.data.proposal;
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

  const response = await normalizeFetch<GetSpeakerFindResponse>(
    `/api/speakers/find?${params.toString()}`,
  );

  if (!response.ok) {
    return defaultData;
  }

  return response.data;
};

export const fetchGetSpeaker = async (): Promise<SpeakerResource> => {
  const speaker: SpeakerResource = {
    status: 'loading',
    data: null,
  };

  const response = await normalizeFetch<GetSpeakerItemResponse>('/api/speaker');

  if (!response.ok) {
    speaker.status = 'error';
    return speaker;
  }

  speaker.status = 'success';
  speaker.data = response.data.speaker;

  return speaker;
};

import {
  PatchProposalStatusRequest,
  PatchProposalStatusResponse,
} from '@/entities/proposal/api/contracts';
import { DialogResource, StatusTransitionSubmitProps } from '../model/types';
import getStatusTransitionErrorState from '../model/getStatusTransitionErrorState';
import { normalizeFetch } from '@/shared/api/normalizeResponse';

export const patchProposalStatusChange = async (
  props: StatusTransitionSubmitProps,
  hasReason: boolean,
  reasonValue: string,
): Promise<DialogResource> => {
  const dialog: DialogResource = {
    status: 'loading',
    errorProps: null,
  };

  const { mode, nextStatus } = props;

  if (!nextStatus) return dialog;

  if (mode === 'single') {
    const { id, onSuccess } = props;

    const requestBody: PatchProposalStatusRequest = {
      status: nextStatus,
      reason: hasReason ? reasonValue : undefined,
    };

    const response = await normalizeFetch<PatchProposalStatusResponse>(
      `/api/proposals/${id}/status`,
      {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      dialog.errorProps = getStatusTransitionErrorState(response.error, {
        retry: () => null,
      });
      dialog.status = 'error';
      return dialog;
    }

    dialog.status = 'success';
    onSuccess(response.data);
  }

  if (mode === 'multiple') {
    const { ids, onSuccess } = props;

    const requestBody: PatchProposalStatusRequest = {
      status: nextStatus,
      reason: hasReason ? reasonValue : undefined,
    };

    const requests = ids.map(async (id) => {
      const response = await normalizeFetch<PatchProposalStatusResponse>(
        `/api/proposals/${id}/status`,
        {
          method: 'PATCH',
          body: JSON.stringify(requestBody),
        },
      );

      if (!response.ok) {
        throw {
          id,
          error: response.error,
        };
      }

      return {
        id,
        data: response.data,
      };
    });

    const settledResults = await Promise.allSettled(requests);

    const successful = settledResults.flatMap((result) =>
      result.status === 'fulfilled' ? [result.value.data] : [],
    );

    const failed = settledResults.flatMap((result) =>
      result.status === 'rejected' ? [result.reason] : [],
    );

    if (successful.length === 0) {
      const firstError = failed[0]?.error;

      dialog.status = 'error';

      if (firstError) {
        dialog.errorProps = getStatusTransitionErrorState(firstError, {
          retry: () => null,
        });
      }

      return dialog;
    }

    dialog.status = 'success';

    onSuccess({ successful, failed });
  }

  return dialog;
};

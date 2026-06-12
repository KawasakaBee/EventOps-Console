import { PatchProposalRequestSchema } from '@/entities/proposal/api/schema';
import {
  Proposal,
  proposalEditableKeys,
  ProposalEditPayload,
} from '@/entities/proposal/model/types';
import { createSpeaker } from '../db/speakers';
import { PatchProposalRequest } from '@/entities/proposal/api/contracts';
import { speakerSubmitSchema } from '@/entities/speaker/api/schema';
import { ID } from '@/shared/types/primitives.types';

const setProposalField = <T extends keyof ProposalEditPayload>(
  proposal: PatchProposalRequest,
  key: T,
  payload: ProposalEditPayload[T] | undefined,
) => {
  if (payload !== undefined) {
    proposal[key] = payload;
  }
};

const mapProposalRequestToProposalBody = (
  payload: PatchProposalRequestSchema,
  ownerId: ID,
): PatchProposalRequest => {
  const proposal: PatchProposalRequest = {};
  const directPayload: Partial<ProposalEditPayload> = payload;

  const draftSpeakers: Proposal['draftSpeakers'] = [];
  const speakerIds: string[] = [];

  if (payload.speakers && payload.speakers.length !== 0) {
    for (const speaker of payload.speakers) {
      const speakerId = speaker.id;

      if (speakerId !== null) {
        if (!speakerIds.includes(speakerId)) speakerIds.push(speakerId);
      } else {
        const result = speakerSubmitSchema.safeParse(speaker);

        if (result.success && payload.status !== 'draft') {
          const newSpeaker = createSpeaker(result.data);
          speakerIds.push(newSpeaker.id);
        } else {
          draftSpeakers.push(speaker);
        }
      }
    }
  }

  if (!speakerIds.includes(ownerId)) speakerIds.push(ownerId);

  proposalEditableKeys.forEach((key) => {
    if (key === 'speakerIds') {
      if (!payload.speakers) return;
      proposal.speakerIds = speakerIds;
      return;
    }

    if (key === 'draftSpeakers') {
      if (!payload.speakers) return;
      proposal.draftSpeakers = draftSpeakers;
      return;
    }

    setProposalField(proposal, key, directPayload[key]);
  });

  return proposal;
};

export default mapProposalRequestToProposalBody;

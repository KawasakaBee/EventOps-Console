import { ScheduleSlot } from '@/entities/schedule/model/types';
import { proposals } from '../db/proposals';
import { speakers } from '../db/speakers';

const scheduleSlotToResponseSlot = (slots: ScheduleSlot[]) => {
  const defaultBody = {
    title: null,
    format: null,
    duration: null,
    speakerNames: [],
  };

  return slots.map((slot) => {
    if (!slot.proposalId) return { slot, ...defaultBody };

    const foundProposal = proposals.find(
      (proposal) => proposal.id === slot.proposalId,
    );

    if (!foundProposal) return { slot, ...defaultBody };

    const speakerNames = [];

    for (const id of foundProposal.speakerIds) {
      const foundSpeaker = speakers.find((speaker) => speaker.id === id);
      if (foundSpeaker) speakerNames.push(foundSpeaker.name);
    }

    return {
      slot,
      title: foundProposal.title,
      format: foundProposal.format,
      duration: foundProposal.duration,
      speakerNames,
    };
  });
};

export default scheduleSlotToResponseSlot;

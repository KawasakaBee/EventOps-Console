import { GetProposalResponse } from '@/entities/proposal/api/contracts';
import { Speaker } from '@/entities/speaker/model/types';

export interface IProposalContentProps {
  data: GetProposalResponse;
  speakers: Speaker[];
}

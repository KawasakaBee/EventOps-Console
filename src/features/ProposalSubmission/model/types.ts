import { FieldPath } from 'react-hook-form';
import type { SubmitValues } from './schema';
import { PageStatus } from '@/shared/types/resource.types';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';
import { GetProposalResponse } from '@/entities/proposal/api/contracts';
import { Proposal } from '@/entities/proposal/model/types';
import { SpeakerInput } from '@/entities/speaker/model/types';

export type SubmitField = FieldPath<SubmitValues>;

export interface DraftResource {
  status: PageStatus;
  data: GetProposalResponse | null;
  errorProps: ErrorStateProps | null;
}

export interface SumbitProposalResource {
  status: PageStatus;
  data: Proposal | null;
  errorProps: ErrorStateProps | null;
}

export interface SpeakerResource {
  status: PageStatus;
  data: SpeakerInput | null;
}

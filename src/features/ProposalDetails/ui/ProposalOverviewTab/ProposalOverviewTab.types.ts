import { Proposal } from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';
import { Resource } from '@/shared/types/primitives.types';

export interface IProposalOverviewTabProps {
  proposal: Proposal | null;
  track: Resource<Track>;
}

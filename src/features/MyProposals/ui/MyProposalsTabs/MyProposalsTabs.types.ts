import { Track } from '@/entities/track/model/types';
import { PaginationResource } from '@/features/ProposalsList/model/types';
import { Resource } from '@/shared/types/resource.types';

export interface IMyProposalsTabsProps {
  proposalsData: PaginationResource;
  draftsData: PaginationResource;
  tracks: Resource<Track[]>;
}

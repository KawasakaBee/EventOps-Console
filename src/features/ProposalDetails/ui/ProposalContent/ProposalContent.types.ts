import { Speaker } from '@/entities/speaker/model/types';
import { UserListItem } from '@/entities/user/model/types';
import { DetailsState } from '../../model/proposalDetailsSlice';
import { Track } from '@/entities/track/model/types';
import { ReviewerListItem } from '@/entities/reviewer/model/types';
import { Resource } from '@/shared/types/resource.types';

export interface IProposalContentProps {
  data: DetailsState;
  tracks: Resource<Track[]>;
  reviewersList: Resource<ReviewerListItem[]>;
  users: Resource<UserListItem[]>;
  speakers: Speaker[];
}

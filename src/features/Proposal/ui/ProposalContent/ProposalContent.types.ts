import { ReviewerListItem } from '@/entities/review/model/types';
import { Speaker } from '@/entities/speaker/model/types';
import { UserListItem } from '@/entities/user/model/types';
import { DetailsState } from '../../model/proposalDetailsSlice';
import { Resource } from '@/shared/types/primitives.types';
import { Track } from '@/entities/track/model/types';

export interface IProposalContentProps {
  data: DetailsState;
  tracks: Resource<Track[]>;
  reviewersList: Resource<ReviewerListItem[]>;
  users: Resource<UserListItem[]>;
  speakers: Speaker[];
}

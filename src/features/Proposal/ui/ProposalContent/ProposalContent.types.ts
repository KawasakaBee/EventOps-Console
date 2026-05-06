import { ReviewerListItem } from '@/entities/review/model/types';
import { Speaker } from '@/entities/speaker/model/types';
import { UserListItem } from '@/entities/user/model/types';
import { DetailsState } from '../../model/proposalDetailsSlice';

export interface IProposalContentProps {
  data: DetailsState;
  trackName: string | null | undefined;
  reviewersList: ReviewerListItem[] | null;
  usersList: UserListItem[] | null;
  speakers: Speaker[];
}

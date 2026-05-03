import { ReviewerListItem } from '@/entities/review/model/types';
import { UserListItem } from '@/entities/user/model/types';
import { GetProposalResponse } from '@/shared/api/contracts/proposal.contract';

export interface IProposalContentProps {
  data: GetProposalResponse;
  trackName: string | null | undefined;
  reviewersList: ReviewerListItem[] | null;
  usersList: UserListItem[] | null;
  isPageUnavailable: boolean;
}

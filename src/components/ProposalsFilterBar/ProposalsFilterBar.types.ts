import { ReviewerListItem } from '@/entities/review/model/types';
import { Track } from '@/entities/track/model/types';
import { ReadonlyURLSearchParams } from 'next/navigation';

export interface IProposalsFilterBarPropos {
  tracks: Track[];
  reviewers: ReviewerListItem[];
  searchParams: ReadonlyURLSearchParams;
  isLoading: boolean;
}

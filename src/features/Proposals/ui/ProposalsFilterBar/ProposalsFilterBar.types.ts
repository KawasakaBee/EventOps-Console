import { ReviewerListItem } from '@/entities/review/model/types';
import { Track } from '@/entities/track/model/types';
import { PageStatus } from '@/shared/types/primitives.types';
import { ReadonlyURLSearchParams } from 'next/navigation';

export interface IProposalsFilterBarProps {
  tracks: Track[];
  tracksStatus: PageStatus;
  reviewers: ReviewerListItem[];
  reviewersStatus: PageStatus;
  searchParams: ReadonlyURLSearchParams;
  isDisabled: boolean;
  handleResetFilters: () => void;
}

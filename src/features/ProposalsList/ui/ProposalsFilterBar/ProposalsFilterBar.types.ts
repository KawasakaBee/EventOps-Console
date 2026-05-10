import { ReviewerListItem } from '@/entities/reviewer/model/types';
import { Track } from '@/entities/track/model/types';
import { Resource } from '@/shared/types/primitives.types';
import { ReadonlyURLSearchParams } from 'next/navigation';

export interface IProposalsFilterBarProps {
  tracks: Resource<Track[]>;
  reviewers: Resource<ReviewerListItem[]>;
  searchParams: ReadonlyURLSearchParams;
  isDisabled: boolean;
  handleResetFilters: () => void;
}

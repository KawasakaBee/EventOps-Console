import { PageSize } from '@/shared/types/primitives.types';

export interface IProposalsInfoProps {
  totalProposalsCount: number;
  selectedPage: number;
  selectedPageSize: PageSize;
  filtersCount: number;
}

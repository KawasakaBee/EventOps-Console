import { PageSize } from '@/shared/types/primitives.types';

export interface IAuditInfoProps {
  totalAuditCount: number;
  selectedPage: number;
  selectedPageSize: PageSize;
  filtersCount: number;
}

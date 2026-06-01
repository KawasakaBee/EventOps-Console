import { ReadonlyURLSearchParams } from 'next/navigation';
export interface IProposalsFilterBarProps {
  searchParams: ReadonlyURLSearchParams;
  isDisabled: boolean;
  handleResetFilters: () => void;
}

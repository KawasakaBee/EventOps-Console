import { UserListItem } from '@/entities/user/model/types';
import { Resource } from '@/shared/types/resource.types';

export interface IAuditFilterBarProps {
  searchParams: string;
  users: Resource<UserListItem[]>;
  isDisabled: boolean;
  handleFiltersReset: () => void;
}

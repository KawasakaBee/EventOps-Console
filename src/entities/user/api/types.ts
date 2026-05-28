import { PageStatus } from '@/shared/types/resource.types';
import { UserListItem } from '../model/types';

export interface UsersResource {
  status: PageStatus;
  data: UserListItem[];
}

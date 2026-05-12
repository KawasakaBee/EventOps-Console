import { PageStatus } from '@/shared/types/resource.types';
import { Tag } from '../model/types';

export interface TagsResource {
  status: PageStatus;
  data: Tag[];
}

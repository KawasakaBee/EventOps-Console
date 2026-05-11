import { PageStatus } from '@/shared/types/resource.types';
import { ReviewerListItem } from '../model/types';

export interface ReviewersResource {
  status: PageStatus;
  data: ReviewerListItem[];
}

import { PageStatus } from '@/shared/types/resource.types';
import { Comment } from '../model/types';

export interface CommentsResource {
  status: PageStatus;
  data: Comment[];
}

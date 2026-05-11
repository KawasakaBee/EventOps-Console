import { PageStatus } from '@/shared/types/resource.types';
import { Track } from '../model/types';

export interface TracksResource {
  status: PageStatus;
  data: Track[];
}

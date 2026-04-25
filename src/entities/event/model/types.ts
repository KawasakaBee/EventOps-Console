import { ID, ISODateString } from '@/shared/types/primitives.types';

export interface Event {
  id: ID;
  title: string;
  description: string;
  place: string;
  trackIds: ID[];
  startTime: ISODateString;
  createdAt: ISODateString;
}

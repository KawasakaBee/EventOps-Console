import { ID, ISODateString } from '@/shared/types/primitives.types';

export interface Event {
  id: ID;
  title: string;
  description: string;
  place: string;
  startTime: ISODateString;
  createdAt: ISODateString;
}

import { ID } from '@/shared/types/primitives.types';

export interface Track {
  id: ID;
  title: string;
  description: string;
  order: number;
}

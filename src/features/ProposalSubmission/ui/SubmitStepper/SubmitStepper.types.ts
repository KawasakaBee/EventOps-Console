import { Speaker } from '@/entities/speaker/model/types';
import { ID } from '@/shared/types/primitives.types';

export interface ISubmitStepperProps {
  id: ID | null;
  speakers: Speaker[] | undefined;
  clearStorage: () => void;
}

import { Track } from '@/entities/track/model/types';
import { BasicValues } from '@/features/ProposalSubmission/model/schema';
import { Resource } from '@/shared/types/resource.types';
import { Control, UseFormRegister } from 'react-hook-form';

export interface IBasicStepProps {
  tracks: Resource<Track[]>;
  reFetchTracks: () => Promise<void>;
}

export interface ITitleRowProps {
  control: Control<BasicValues>;
  register: UseFormRegister<BasicValues>;
}

export interface IDurationRowProps {
  control: Control<BasicValues>;
}

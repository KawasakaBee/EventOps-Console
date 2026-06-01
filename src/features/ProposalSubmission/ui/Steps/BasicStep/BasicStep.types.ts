import { BasicValues } from '@/features/ProposalSubmission/model/schema';
import { Control, UseFormRegister } from 'react-hook-form';

export interface ITitleRowProps {
  control: Control<BasicValues>;
  register: UseFormRegister<BasicValues>;
}

export interface IDurationRowProps {
  control: Control<BasicValues>;
}

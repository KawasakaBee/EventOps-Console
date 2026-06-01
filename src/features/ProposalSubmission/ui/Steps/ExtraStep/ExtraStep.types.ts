import { ExtraValues } from '@/features/ProposalSubmission/model/schema';
import { Control, UseFormRegister } from 'react-hook-form';

export interface INotesRawProps {
  control: Control<ExtraValues>;
  register: UseFormRegister<ExtraValues>;
}

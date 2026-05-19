import { Tag } from '@/entities/tag/model/types';
import { ExtraValues } from '@/features/ProposalSubmission/model/schema';
import { Resource } from '@/shared/types/resource.types';
import { Control, UseFormRegister } from 'react-hook-form';

export interface IExtraStepProps {
  tags: Resource<Tag[]>;
  reFetchTags: () => Promise<void>;
}

export interface INotesRawProps {
  control: Control<ExtraValues>;
  register: UseFormRegister<ExtraValues>;
}

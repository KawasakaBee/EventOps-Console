import { SpeakerField } from '@/entities/speaker/api/dictionary';
import { SpeakerValues } from '@/features/ProposalSubmission/model/schema';
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

export interface ISpeakersStepProps {
  errorMessage: string | null;
}

export interface ISpeakerBlockProps {
  control: Control<SpeakerValues>;
  register: UseFormRegister<SpeakerValues>;
  getValues: UseFormGetValues<SpeakerValues>;
  setValue: UseFormSetValue<SpeakerValues>;
  idx: number;
  ownerIdx: number;
}

export interface ISpeakerRowProps {
  control: Control<SpeakerValues>;
  register: UseFormRegister<SpeakerValues>;
  field: Exclude<SpeakerField, 'email'>;
  idx: number;
  isReadonly: boolean;
}

export interface IEmailRowProps {
  control: Control<SpeakerValues>;
  register: UseFormRegister<SpeakerValues>;
  field: 'email';
  idx: number;
  ownerIdx: number;
  handleSpeakerSearchDebounced: (value: string, idx: number) => void;
}

export type OwnerResource = {
  haveOwner: boolean;
  ownerIdx: number;
};

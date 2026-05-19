import { Control, FormState } from 'react-hook-form';
import { SubmitValues } from '../../model/schema';

export type SubmitDirtyFields = FormState<SubmitValues>['dirtyFields'];

export interface IAutosaveWatcherProps {
  control: Control<SubmitValues>;
  id: string | null;
  scheduleAutosave: (dirtyFields: SubmitDirtyFields) => void;
  scheduleRecoveryAutosave: () => void;
}

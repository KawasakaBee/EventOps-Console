import { Control } from 'react-hook-form';
import { SubmitValues } from '../../model/schema';
import { SubmitDirtyFields } from '../../model/types';

export interface IAutosaveWatcherProps {
  control: Control<SubmitValues>;
  id: string | null;
  scheduleAutosave: (dirtyFields: SubmitDirtyFields) => void;
  scheduleRecoveryAutosave: () => void;
}

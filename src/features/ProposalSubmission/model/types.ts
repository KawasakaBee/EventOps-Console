import { FormState } from 'react-hook-form';
import type { SubmitValues } from './schema';

export type SubmitDirtyFields = FormState<SubmitValues>['dirtyFields'];

import { FieldPath, FormState } from 'react-hook-form';
import type { SubmitValues } from './schema';

export type SubmitField = FieldPath<SubmitValues>;

export type SubmitDirtyFields = FormState<SubmitValues>['dirtyFields'];

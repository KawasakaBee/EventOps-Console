import { useParams } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { SubmitValues } from './schema';
import useSubmissionAutosave from './useSubmissionAutosave';
import useSubmissionResources from './useSubmissionResources';
import useSubmissionSubmit from './useSubmissionSubmit';

const useSubmissionData = (methods: UseFormReturn<SubmitValues>) => {
  const draftId = useParams().id;

  const resources = useSubmissionResources(methods, draftId);
  const { clearAutosaveTimer, ...autosave } = useSubmissionAutosave(
    methods,
    draftId,
  );
  const submit = useSubmissionSubmit(
    methods,
    draftId,
    autosave.deleteFormFromStorage,
    clearAutosaveTimer,
  );

  return {
    ...resources,
    ...autosave,
    ...submit,
  };
};

export default useSubmissionData;

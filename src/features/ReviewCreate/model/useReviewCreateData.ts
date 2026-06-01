import { UseFormGetValues } from 'react-hook-form';
import { CreateReviewValues } from './schema';
import { ID } from '@/shared/types/primitives.types';
import { useCreateReviewMutation } from '../api/ReviewCreateApi';

const useCreateReviewData = (
  getValues: UseFormGetValues<CreateReviewValues>,
  proposalId: ID,
) => {
  // state
  const [createReview, createState] = useCreateReviewMutation();

  // handlers

  const handleCreateReviewSubmit = async () => {
    const fields = getValues();
    await createReview({ id: proposalId, payload: fields }).unwrap();
  };

  return { createState, handleCreateReviewSubmit };
};

export default useCreateReviewData;

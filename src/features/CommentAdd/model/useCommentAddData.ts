import { UseFormGetValues } from 'react-hook-form';
import { AddCommentValues } from './schema';
import { ID } from '@/shared/types/primitives.types';
import { useAddCommentMutation } from '../api/commentAddApi';

const useCommentAddData = (
  proposalId: ID,
  getValues: UseFormGetValues<AddCommentValues>,
) => {
  // state
  const [createComment, createState] = useAddCommentMutation();

  // handlers

  const handleAddCommentSubmit = async () => {
    const fields = getValues();
    createComment({ id: proposalId, payload: fields });
  };

  return { createState, handleAddCommentSubmit };
};

export default useCommentAddData;

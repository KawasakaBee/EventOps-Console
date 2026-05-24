import { AssignReviewerProps } from '../model/types';

export type IReviewerAssignDialogProps = AssignReviewerProps & {
  onClose: () => void;
};

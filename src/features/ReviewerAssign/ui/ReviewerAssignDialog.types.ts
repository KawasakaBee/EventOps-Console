import { AssignReviewerProps } from '../model/types';

export type ReviewerAssignDialogProps = AssignReviewerProps & {
  onClose: () => void;
};

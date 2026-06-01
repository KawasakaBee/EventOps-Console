import { Comment } from '@/entities/comment/model/types';
import { GetUsersListResponse } from '@/entities/user/api/contracts';
import { AppBaseQueryError } from '@/shared/api/baseApi';
import { SerializedError } from '@reduxjs/toolkit';

export interface ICommentCardProps {
  comment: Comment;
  users: GetUsersListResponse | undefined;
  isUsersError: boolean;
  usersError: AppBaseQueryError | SerializedError | undefined;
}

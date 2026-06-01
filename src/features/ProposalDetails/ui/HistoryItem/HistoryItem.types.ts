import { Comment } from '@/entities/comment/model/types';
import { HistoryEntry } from '@/entities/history/model/types';
import { GetReviewersResponse } from '@/entities/reviewer/api/contracts';
import { GetTracksResponse } from '@/entities/track/api/contracts';
import { GetUsersListResponse } from '@/entities/user/api/contracts';
import { AppBaseQueryError } from '@/shared/api/baseApi';
import { SerializedError } from '@reduxjs/toolkit';

export interface IHistoryItemProps {
  item: HistoryEntry;
  users: GetUsersListResponse | undefined;
  isUsersError: boolean;
  usersError: AppBaseQueryError | SerializedError | undefined;
  isLastItem: boolean;
  comments: Comment[];
  reviewers: GetReviewersResponse | undefined;
  isReviewersError: boolean;
  tracks: GetTracksResponse | undefined;
  isTracksError: boolean;
}

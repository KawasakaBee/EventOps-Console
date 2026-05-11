import { DemoRole, User, UserListItem } from '@/entities/user/model/types';

export interface GetUsersListResponse {
  users: UserListItem[];
}

export type GetCurrentUserResponse = User;

export interface PostDemoLoginRequest {
  role: DemoRole;
}

export interface PostDemoLoginResponse {
  ok: boolean;
}

export interface PostLogoutResponse {
  ok: boolean;
}

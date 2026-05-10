import { DemoRole, User } from '@/entities/user/model/types';

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

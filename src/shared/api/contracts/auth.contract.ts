import { User } from '@/entities/user/model/types';
import { DemoRole } from '@/shared/types/primitives.types';

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

import { User } from '@/entities/user/model/types';
import { Role } from '@/shared/types/primitives.types';

export type GetCurrentUserResponse = User;

export interface PostDemoLoginRequest {
  role: Exclude<Role, 'admin'>;
}

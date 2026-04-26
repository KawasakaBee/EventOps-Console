import { User } from '@/entities/user/model/types';
import { GetCurrentUserResponse } from '../api/contracts/auth.contract';

const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await fetch('/api/me');

    if (!response.ok) return null;

    const parsedResponse: GetCurrentUserResponse = await response.json();
    return parsedResponse;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getCurrentUser;

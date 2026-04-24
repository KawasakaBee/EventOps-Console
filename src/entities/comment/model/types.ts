import { ID, ISODateString, Role } from '@/shared/types/primitives.types';

export interface Comment {
  id: ID;
  proposalId: ID;
  actorId: ID;
  actorRole: Role;
  message: string;
  createdAt: ISODateString;
}

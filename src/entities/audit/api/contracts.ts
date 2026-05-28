import { PaginationEnvelope } from '@/shared/types/api.types';
import { AuditLog } from '../model/types';

export type GetAuditListResponse = PaginationEnvelope<AuditLog>;

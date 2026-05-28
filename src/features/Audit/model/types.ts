import { AuditLog } from '@/entities/audit/model/types';
import { PaginationEnvelope } from '@/shared/types/api.types';
import { PageStatus } from '@/shared/types/resource.types';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';

export interface AuditPaginationResource {
  status: PageStatus;
  data: PaginationEnvelope<AuditLog> | null;
  errorProps: ErrorStateProps | null;
}

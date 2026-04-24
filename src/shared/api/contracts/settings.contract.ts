import { Settings } from '@/entities/audit-log/model/types';
import { HistoryEntry } from '@/entities/history/model/types';

export interface GetAuditResponse {
  history: HistoryEntry;
}

export interface GetSettingsListResponse {
  settings: Settings[];
}

export interface PatchUpdateSettingsRequest {
  setting: Settings;
  reason?: string;
}

import { HistoryEntry } from '@/entities/history/model/types';
import { Settings } from '@/entities/settings/model/types';

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

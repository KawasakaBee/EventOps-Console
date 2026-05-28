import { SxProps, Theme } from '@mui/material';

export interface IAuditSearchInputProps {
  isLoading: boolean;
  sxFormControl: SxProps<Theme>;
  sxSearchInput: SxProps<Theme>;
  searchValue: string;
}

import { SxProps, Theme } from '@mui/material';

export interface IProposalsSearchInputProps {
  isLoading: boolean;
  sxFormControl: SxProps<Theme>;
  sxSearchInput: SxProps<Theme>;
  searchValue: string;
}

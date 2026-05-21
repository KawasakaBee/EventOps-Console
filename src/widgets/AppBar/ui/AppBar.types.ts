import { PageStatus } from '@/shared/types/resource.types';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';
import { SxProps, Theme } from '@mui/material';

export interface IAppBarProps {
  sx: SxProps<Theme>;
}

export interface LogoutResource {
  status: PageStatus;
  errorProps: ErrorStateProps | null;
}

import { Role } from '@/shared/types/primitives.types';
import { SxProps, Theme } from '@mui/material';

export interface ISidebarPropos {
  role: Role;
  sidebarSx: SxProps<Theme>;
}

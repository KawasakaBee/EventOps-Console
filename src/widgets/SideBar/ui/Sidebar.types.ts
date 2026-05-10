import { Role } from '@/entities/user/model/types';
import { SxProps, Theme } from '@mui/material';

export interface ISidebarProps {
  role: Role;
  sidebarSx: SxProps<Theme>;
}

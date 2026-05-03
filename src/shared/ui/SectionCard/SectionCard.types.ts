import { SxProps, Theme } from '@mui/material';

export interface ISectionCardProps {
  children: React.ReactNode;
  title: string | null;
  actions?: React.ReactNode;
  restSx?: SxProps<Theme>;
}

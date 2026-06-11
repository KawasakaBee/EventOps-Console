import { SxProps, Theme } from '@mui/material';

type Key = 'page';

interface IStyledProps {
  sidebarWidth?: number;
  appbarHeight?: number;
}

type Styles = (options?: IStyledProps) => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Styles = (options: IStyledProps = {}) => {
  const { sidebarWidth, appbarHeight } = options;

  return {
    page: {
      display: 'grid',
      gridTemplateAreas: "'sidebar appbar' 'sidebar content'",
      gridTemplateColumns: `${sidebarWidth}px minmax(0, 1fr)`,
      gridTemplateRows: `${appbarHeight}px minmax(0, 1fr)`,
      height: '100dvh',
      bgcolor: 'background.default',
      overflow: 'hidden',
    },
  };
};

import { SxProps, Theme } from '@mui/material';

type Key = 'page' | 'appbar' | 'sidebar' | 'content';

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
      gridTemplateColumns: `${sidebarWidth}px 1fr`,
      gridTemplateRows: `${appbarHeight}px 1fr`,
      width: '100vw',
      height: '100dvh',
      bgcolor: 'background.default',
    },
    appbar: {
      position: 'relative',
      gridArea: 'appbar',
      bgcolor: 'background.paper',
    },
    sidebar: {
      gridArea: 'sidebar',
      '& .MuiDrawer-paper': {
        position: 'relative',
        width: sidebarWidth,
        bgcolor: 'background.paper',
      },
    },
    content: {
      gridArea: 'content',
      p: 2,
    },
  };
};

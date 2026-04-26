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
      gridTemplateColumns: `${sidebarWidth}px minmax(0, 1fr)`,
      gridTemplateRows: `${appbarHeight}px minmax(0, 1fr)`,
      height: '100dvh',
      bgcolor: 'background.default',
      overflow: 'hidden',
    },
    appbar: {
      position: 'static',
      gridArea: 'appbar',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      p: 2,
      bgcolor: 'background.paper',
    },
    sidebar: {
      gridArea: 'sidebar',
      '& .MuiDrawer-paper': {
        position: 'relative',
        alignItems: 'flex-start',
        p: 2,
        bgcolor: 'background.paper',
      },
    },
    content: {
      gridArea: 'content',
      p: 2,
      overflowY: 'scroll',
    },
  };
};

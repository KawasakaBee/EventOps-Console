import { createTheme } from '@mui/material';
import { typography } from './typography/typography';
import { palette } from './palette/palette';
import { breakpoints } from './breakpoints/breakpoints';

export const theme = createTheme({
  breakpoints,
  palette,
  typography,
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  zIndex: {
    appBar: 1200,
  },
  components: {
    MuiTab: {
      defaultProps: {
        style: {
          color: palette.primary.main,
        },
      },
    },
  },
});

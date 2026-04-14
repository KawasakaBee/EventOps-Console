declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tabletXS: true;
    tablet: true;
    laptop: true;
    desktop: true;
    desktopXL: true;
  }
}

export const breakpoints = {
  values: {
    mobile: 0,
    tabletXS: 480,
    tablet: 767,
    laptop: 1200,
    desktop: 1500,
    desktopXL: 1920,
  },
};

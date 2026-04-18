declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    orange: Palette['primary'];
    purple: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    orange?: PaletteOptions['primary'];
    purple?: PaletteOptions['primary'];
  }
}

export const palette = {
  background: {
    default: '#f8f6f6',
    paper: '#fff',
  },
  text: {
    primary: '#0a0a0aff',
    secondary: '#ffffff',
    disabled: '#68676862',
  },
  divider: '#000000',
  primary: {
    main: '#093b67',
    light: '#1661a3',
  },
  neutral: {
    main: '#858185',
  },
  info: {
    main: '#00bcd4',
  },
  warning: {
    main: '#ffc107',
  },
  orange: {
    main: '#ff5722',
  },
  success: {
    main: '#4caf50',
  },
  error: {
    main: '#f44336',
  },
  purple: {
    main: '#dd44eb',
  },
};

export const statusColorMap = new Map([
  ['draft', 'neutral'],
  ['submitted', 'info'],
  ['in_review', 'warning'],
  ['changes_request', 'changed'],
  ['accepted', 'success'],
  ['regected', 'error'],
  ['scheduled', 'accent'],
]);

export const palette = {
  background: {
    default: '#f8f6f6',
    paper: '#fff',
  },
  text: {
    primary: '#0a0a0a',
    secondary: '#f1eaea',
    disabled: '#68676862',
  },
  divider: '#000000',
  primary: {
    main: '#21c2eb',
  },
  success: {
    main: '#48db48',
  },
  warning: {
    main: '#dfa63e',
  },
  error: {
    main: '#e91818',
  },
  info: {
    main: '#0e10b1',
  },
};

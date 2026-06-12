import getResponsiveValue from '../utils/getResponsiveValue';

const tableSx = (viewportWidth: number) => ({
  mb: 2,

  '& .MuiTableCell-root': {
    p: getResponsiveValue(2, 1, 1920, 1440, viewportWidth),
  },
  '& .MuiCheckbox-root': {
    p: getResponsiveValue(1, 0.5, 1920, 1440, viewportWidth),
  },
});

export default tableSx;

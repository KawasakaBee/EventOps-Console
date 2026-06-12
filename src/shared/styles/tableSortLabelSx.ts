const tableSortLabelSx = {
  '&.MuiTableSortLabel-root': {
    '&:hover': {
      color: 'text.primary',
      '& .MuiTableSortLabel-icon': {
        opacity: 1,
      },
    },
    '& .MuiTableSortLabel-icon': {
      opacity: 0.5,
    },
    '&.Mui-active': {
      '& .MuiTableSortLabel-icon': {
        color: 'text.primary',
        opacity: 1,
      },
    },
  },
};

export default tableSortLabelSx;

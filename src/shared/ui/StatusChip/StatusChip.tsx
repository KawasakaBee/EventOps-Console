'use client';

import { IStatusChipProps, statusChipConfig } from './StatusChip.types';
import { styles } from './styles';
import { Box, Typography, useTheme } from '@mui/material';

const StatusChip = ({ status, shape, size, type }: IStatusChipProps) => {
  const theme = useTheme();
  const SelectedIcon = statusChipConfig[status].icon;
  const label = statusChipConfig[status].label;
  const color = theme.palette[statusChipConfig[status].color].main;
  const sx = styles({ color, shape, size, type });

  return (
    <Box sx={sx.statusChipWrapper} data-testid="status-chip">
      <SelectedIcon sx={sx.statusChipIcon} />
      <Typography sx={sx.statusChipLabel} variant="h3">
        {label}
      </Typography>
    </Box>
  );
};

export default StatusChip;

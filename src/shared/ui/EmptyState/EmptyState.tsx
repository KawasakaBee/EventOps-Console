import { Box, Typography } from '@mui/material';

const EmptyState = () => {
  return (
    <Box>
      <Typography variant="h2">Enrollment not found</Typography>
      <Typography variant="h3">Create a new enrollment!</Typography>
    </Box>
  );
};

export default EmptyState;

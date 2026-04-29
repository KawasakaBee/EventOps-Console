import { Stack, Typography } from '@mui/material';
import { IEmptyStateProps } from './EmptyState.types';
import Button from '../Button/Button';
import { styles } from './styles';

const EmptyState: React.FC<IEmptyStateProps> = ({
  title,
  subtitle,
  action,
}) => {
  const sx = styles();

  return (
    <Stack spacing={2} sx={sx.emptyStateContainer}>
      <Typography variant="h2" data-testid="empty-state-title">
        {title}
      </Typography>
      <Typography variant="body1" data-testid="empty-state-subtitle">
        {subtitle}
      </Typography>
      {action && (
        <Button
          mode="button"
          variant="contained"
          size="large"
          onClick={action.handler}
        >
          {action.buttonName}
        </Button>
      )}
    </Stack>
  );
};

export default EmptyState;

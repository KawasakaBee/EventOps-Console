import { Box, Card, Typography } from '@mui/material';
import { styles } from './styles';
import { ISectionCardProps } from './SectionCard.types';

const SectionCard: React.FC<ISectionCardProps> = ({
  children,
  title,
  actions,
  restSx,
}) => {
  const sx = styles();

  return (
    <Card
      sx={[
        sx.sectionCard,
        ...(Array.isArray(restSx) ? restSx : restSx ? [restSx] : []),
      ]}
    >
      {title && <Typography variant="h3">{title}</Typography>}
      <Box data-testid="actions">{actions}</Box>
      {children}
    </Card>
  );
};

export default SectionCard;

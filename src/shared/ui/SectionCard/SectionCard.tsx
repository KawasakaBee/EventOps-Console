import { Card, Typography } from '@mui/material';
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
      <Typography variant="h3">{title}</Typography>
      {actions}
      {children}
    </Card>
  );
};

export default SectionCard;

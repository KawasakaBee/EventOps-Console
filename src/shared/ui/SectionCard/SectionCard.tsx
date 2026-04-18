import { Card, Typography } from '@mui/material';
import { styles } from './styles';
import { ISectionCardProps } from './SectionCard.types';

const SectionCard = ({ children, title, actions }: ISectionCardProps) => {
  return (
    <Card sx={styles().sectionCard}>
      <Typography variant="h3">{title}</Typography>
      {actions}
      {children}
    </Card>
  );
};

export default SectionCard;

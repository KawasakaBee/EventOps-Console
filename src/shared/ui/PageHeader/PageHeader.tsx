import { Box, Typography } from '@mui/material';
import { styles } from './styles';
import { IPageHeaderProps } from './PageHeader.types';

const PageHeader = ({
  children,
  title,
  subtitle,
  actions,
}: IPageHeaderProps) => {
  return (
    <Box sx={styles().pageHeader}>
      <Typography variant="h1">{title}</Typography>
      {!!subtitle && <Typography variant="h2">{subtitle}</Typography>}
      {!!actions && <Typography variant="h2">{actions}</Typography>}
      {children}
    </Box>
  );
};

export default PageHeader;

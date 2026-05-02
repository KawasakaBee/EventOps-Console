import { Box, Typography } from '@mui/material';
import { styles } from './styles';
import { IPageHeader } from './PageHeader.types';
import Button from '../Button/Button';
import { isNavigationRoute } from '@/shared/utils/typeGuards';
import { navigationDicrionary } from '@/shared/data';

const PageHeader: React.FC<IPageHeader> = (props) => {
  const { pageName, title, children, mode } = props;

  const sx = styles();

  const breacdrumbs = () => {
    if (mode !== 'inner') return null;

    const { to } = props;
    if (!isNavigationRoute(to)) return null;

    return (
      <Button
        mode="link"
        variant="outlined"
        size="small"
        to={to}
        isRelativeLink
        sx={sx.backButton}
      >
        Назад в {navigationDicrionary.get(to)}
      </Button>
    );
  };

  return (
    <Box sx={sx.pageHeader}>
      {breacdrumbs()}
      {pageName && <Typography variant="h1">{pageName}</Typography>}
      {title}
      {children}
    </Box>
  );
};

export default PageHeader;

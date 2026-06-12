import { Box, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { PageHeaderProps } from './PageHeader.types';
import Button from '../Button/Button';
import { isNavigationRoute } from '@/shared/lib/routes/typeGuards';
import { navigationDictionary } from '@/shared/lib/routes/dictionary';

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { pageName, title, children, mode } = props;

  const sx = styles();

  const breadcrumbs = () => {
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
        sx={sx.pageHeaderBackButton}
      >
        Назад в {navigationDictionary[to]}
      </Button>
    );
  };

  return (
    <Box sx={sx.pageHeader}>
      {breadcrumbs()}
      {pageName && <Typography variant="h1">{pageName}</Typography>}
      <Stack spacing={2}>
        <Box>{title}</Box>
        <Box>{children}</Box>
      </Stack>
    </Box>
  );
};

export default PageHeader;

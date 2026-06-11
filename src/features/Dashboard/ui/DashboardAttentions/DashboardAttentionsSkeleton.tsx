import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { Grid, Skeleton, Stack, useMediaQuery } from '@mui/material';
import { styles } from './styles';
import Button from '@/shared/ui/Button/Button';
import { theme } from '@/shared/theme/theme';

const DashboardAttentionsSkeleton = () => {
  const sx = styles();

  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('laptop'));

  const skeletonWidth = isDesktop ? 200 : isLaptop ? 120 : 80;

  return (
    <Grid container columnSpacing={2}>
      {Array.from({ length: 3 }).map((_, idx) => (
        <Grid key={idx} size={4}>
          <SectionCard title={null} restSx={sx.attentionWrapper}>
            <Stack direction="row" spacing={2} sx={sx.attentionCard}>
              <Stack direction="row" spacing={1}>
                <Skeleton variant="text" width={skeletonWidth} />{' '}
                <Skeleton variant="text" width={skeletonWidth / 5} />
              </Stack>
              <Button mode="button" variant="contained" size="small" isDisabled>
                Открыть
              </Button>
            </Stack>
          </SectionCard>
        </Grid>
      ))}
    </Grid>
  );
};
export default DashboardAttentionsSkeleton;

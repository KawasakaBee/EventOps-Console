import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { Box, Skeleton, Stack, useMediaQuery } from '@mui/material';

import SecondaryStickyButtonsSkeleton from '../SecondaryStickyButtons/SecondaryStickyButtonsSkeleton';
import { styles } from './styles';
import useResizeWindow from '@/shared/utils/hooks/useResizeWindow';
import { theme } from '@/shared/theme/theme';

const ProposalStickyPanelSkeleton = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('laptop'));
  const viewportWidth = useResizeWindow();
  const sx = styles({ isDesktop, isLaptop, viewportWidth });

  return (
    <SectionCard title={null}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Box>
            <Skeleton variant="text" width={'30%'} />
            <Skeleton variant="text" width={'50%'} />
          </Box>
          <Box>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Box>
        </Stack>
        <Stack>
          <Skeleton variant="text" sx={sx.skeletonButton} />
          <Skeleton variant="text" sx={sx.skeletonButton} />
        </Stack>
        <Stack>
          <Skeleton variant="text" sx={sx.skeletonButton} />
          <Skeleton variant="text" sx={sx.skeletonButton} />
        </Stack>

        <SecondaryStickyButtonsSkeleton />
        <Stack spacing={1}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Stack>
      </Stack>
    </SectionCard>
  );
};

export default ProposalStickyPanelSkeleton;

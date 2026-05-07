import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { Box, Skeleton, Stack } from '@mui/material';

import SecondaryStickyButtonsSkeleton from '../SecondaryStickyButtons/SecondaryStickyButtonsSkeleton';
import { styles } from './styles';

const ProposalStickyPanelSkeleton = () => {
  const sx = styles({ action: 'edit' });

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

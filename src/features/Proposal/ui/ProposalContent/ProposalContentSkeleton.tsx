import { Box, Skeleton, Stack } from '@mui/material';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { styles } from './styles';
import ProposalOverviewTabSkeleton from '../ProposalOverviewTab/ProposalOverviewTabSkeleton';
import SpeakerCardSkeleton from '../SpeakerCard/SpeakerCardSkeleton';

const ProposalContentSkeleton = () => {
  const sx = styles();

  return (
    <Stack spacing={2}>
      <SectionCard title={null}>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="text" width={'5%'} />
          <Skeleton variant="text" width={'5%'} />
          <Skeleton variant="text" width={'5%'} />
          <Skeleton variant="text" width={'5%'} />
        </Stack>
      </SectionCard>
      <SectionCard title={null} restSx={sx.tabCard}>
        <Box>
          <ProposalOverviewTabSkeleton />
        </Box>
      </SectionCard>
      <SectionCard title={null}>
        <Stack spacing={4}>
          <SpeakerCardSkeleton />
        </Stack>
      </SectionCard>
    </Stack>
  );
};

export default ProposalContentSkeleton;

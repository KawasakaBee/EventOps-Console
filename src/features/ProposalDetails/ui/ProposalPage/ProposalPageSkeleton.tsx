import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import { Grid, Skeleton } from '@mui/material';
import { styles } from './styles';
import ProposalContentSkeleton from '../ProposalContent/ProposalContentSkeleton';
import ProposalStickyPanelSkeleton from '../ProposalStickyPanel/ProposalStickyPanelSkeleton';

const ProposalPageSkeleton = () => {
  const sx = styles();

  return (
    <>
      <PageHeader
        mode="inner"
        pageName={null}
        title={<Skeleton variant="text" width={300} />}
        to="/proposals"
      >
        <Skeleton variant="text" width={'70%'} />
      </PageHeader>
      <Grid container spacing={2}>
        <Grid size="grow">
          <ProposalContentSkeleton />
        </Grid>
        <Grid size={2} sx={sx.proposalStickyPanel}>
          <ProposalStickyPanelSkeleton />
        </Grid>
      </Grid>
    </>
  );
};

export default ProposalPageSkeleton;

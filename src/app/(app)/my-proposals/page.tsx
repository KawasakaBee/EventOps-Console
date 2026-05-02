import Button from '@/shared/ui/Button/Button';
// import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import { List, ListItem, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const MyProposals = () => {
  return (
    <>
      {/* <PageHeader
        title="This is PageHeader title"
        subtitle="This is PageHeader Subtitle"
      >
        This is custom text inside PageHeader
      </PageHeader> */}
      <Typography variant="h1">This is Dashboard</Typography>
      <Button
        mode="button"
        variant="contained"
        size="medium"
        isDisableElevation
      >
        This is button
      </Button>
      <Button
        mode="iconButton"
        variant="contained"
        size="medium"
        ariaLabel="Icon Button"
        icon={HomeIcon}
      />
      <List>
        <ListItem>
          <SectionCard
            title="This is Section Card Title"
            actions={
              <StatusChip
                status="accepted"
                shape="rounded"
                size="medium"
                type="contained"
              />
            }
          >
            This is Section Card
          </SectionCard>
        </ListItem>
        <ListItem>
          <SectionCard
            title="This is Section Card Title"
            actions={
              <StatusChip
                status="draft"
                shape="rounded"
                size="medium"
                type="outlined"
              />
            }
          >
            This is Section Card
          </SectionCard>
        </ListItem>
        <ListItem>
          <SectionCard
            title="This is Section Card Title"
            actions={
              <StatusChip
                status="rejected"
                shape="square"
                size="small"
                type="contained"
              />
            }
          >
            This is Section Card
          </SectionCard>
        </ListItem>
      </List>
    </>
  );
};

export default MyProposals;

import { Box, Stack, Tab, Tabs } from '@mui/material';
import { IProposalContentProps } from './ProposalContent.types';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { useMemo, useState } from 'react';
import ProposalOverviewTab from '../ProposalOverviewTab/ProposalOverviewTab';
import ProposalReviewsTab from '../ProposalReviewsTab/ProposalReviewsTab';
import { tabsDictionary } from '@/shared/data';
import ProposalCommentsTab from '../ProposalCommentsTab/ProposalCommentsTab';
import ProposalHistoryTab from '../ProposalHistoryTab/ProposalHistoryTab';

const ProposalContent: React.FC<IProposalContentProps> = ({
  data,
  trackName,
  reviewersList,
  usersList,
}) => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const canAssignReviewer = useMemo(
    () => data.availableActions.includes('assignReviewer'),
    [data.availableActions],
  );

  const canAddComment = useMemo(
    () => data.availableActions.includes('addComment'),
    [data.availableActions],
  );

  const handleChangeCurrentTab = (
    _: React.SyntheticEvent,
    newValue: number,
  ) => {
    setCurrentTab(newValue);
  };

  return (
    <Stack spacing={2}>
      <SectionCard title="Вкладки">
        <Tabs value={currentTab} onChange={handleChangeCurrentTab}>
          <Tab label="Информация" />
          <Tab label="Ревью" />
          <Tab label="Комментарии" />
          <Tab label="История" />
        </Tabs>
      </SectionCard>
      <SectionCard title={tabsDictionary[currentTab]}>
        <Box hidden={currentTab !== 0}>
          <ProposalOverviewTab proposal={data.proposal} track={trackName} />
        </Box>
        <Box hidden={currentTab !== 1}>
          <ProposalReviewsTab
            reviews={data.reviews}
            canAssignReview={canAssignReviewer}
            reviewers={reviewersList}
          />
        </Box>
        <Box hidden={currentTab !== 2}>
          <ProposalCommentsTab
            comments={data.comments}
            canAddComment={canAddComment}
            users={usersList}
          />
        </Box>
        <Box hidden={currentTab !== 3}>
          <ProposalHistoryTab
            history={data.history}
            users={usersList}
            comments={data.comments}
            reviewers={reviewersList}
          />
        </Box>
      </SectionCard>
      <SectionCard title="Информация о спикере">Speaker info</SectionCard>
    </Stack>
  );
};

export default ProposalContent;

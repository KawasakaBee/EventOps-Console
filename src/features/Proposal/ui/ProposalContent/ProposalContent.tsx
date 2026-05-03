import { Box, Stack, Tab, Tabs } from '@mui/material';
import { IProposalContentProps } from './ProposalContent.types';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { useMemo } from 'react';
import ProposalOverviewTab from '../ProposalOverviewTab/ProposalOverviewTab';
import ProposalReviewsTab from '../ProposalReviewsTab/ProposalReviewsTab';
import ProposalCommentsTab from '../ProposalCommentsTab/ProposalCommentsTab';
import ProposalHistoryTab from '../ProposalHistoryTab/ProposalHistoryTab';
import { ProposalDetailsTab } from '@/shared/types/primitives.types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { isProposalDetailsTab } from '@/shared/utils/typeGuards';
import { tabsDictionary } from '../../model/tabs';
import { styles } from './styles';

const ProposalContent: React.FC<IProposalContentProps> = ({
  data,
  trackName,
  reviewersList,
  usersList,
  isPageUnavailable,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const currentTab = useMemo(() => {
    const defaultTab: ProposalDetailsTab = 'overview';

    if (!searchParams.has('tab')) return defaultTab;

    const tab = searchParams.get('tab');
    if (!isProposalDetailsTab(tab)) return defaultTab;

    return tab;
  }, [searchParams]);

  const canAssignReviewer = useMemo(
    () => data.availableActions.includes('assignReviewer'),
    [data.availableActions],
  );

  const canAddComment = useMemo(
    () => data.availableActions.includes('addComment'),
    [data.availableActions],
  );

  const sx = styles();

  const handleChangeCurrentTab = (
    _: React.SyntheticEvent,
    newValue: string | number,
  ) => {
    if (!isProposalDetailsTab(newValue)) return;

    const params = new URLSearchParams(searchParamsString);
    params.set('tab', newValue);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Stack spacing={2}>
      <SectionCard title={null}>
        <Tabs value={currentTab} onChange={handleChangeCurrentTab}>
          <Tab
            label={tabsDictionary['overview']}
            value={'overview'}
            sx={sx.proposalTab}
            disabled={isPageUnavailable}
          />
          <Tab
            label={tabsDictionary['reviews']}
            value={'reviews'}
            sx={sx.proposalTab}
            disabled={isPageUnavailable}
          />
          <Tab
            label={tabsDictionary['comments']}
            value={'comments'}
            sx={sx.proposalTab}
            disabled={isPageUnavailable}
          />
          <Tab
            label={tabsDictionary['history']}
            value={'history'}
            sx={sx.proposalTab}
            disabled={isPageUnavailable}
          />
        </Tabs>
      </SectionCard>
      <SectionCard title={null} restSx={sx.tabCard}>
        {currentTab === 'overview' && (
          <Box>
            <ProposalOverviewTab proposal={data.proposal} track={trackName} />
          </Box>
        )}
        {currentTab === 'reviews' && (
          <Box>
            <ProposalReviewsTab
              reviews={data.reviews}
              canAssignReview={canAssignReviewer}
              reviewers={reviewersList}
            />
          </Box>
        )}
        {currentTab === 'comments' && (
          <Box>
            <ProposalCommentsTab
              comments={data.comments}
              canAddComment={canAddComment}
              users={usersList}
            />
          </Box>
        )}
        {currentTab === 'history' && (
          <Box>
            <ProposalHistoryTab
              history={data.history}
              users={usersList}
              comments={data.comments}
              reviewers={reviewersList}
            />
          </Box>
        )}
      </SectionCard>
      <SectionCard title="Информация о спикере">Speaker info</SectionCard>
    </Stack>
  );
};

export default ProposalContent;

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
import SpeakerCard from '../SpeakerCard/SpeakerCard';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import { Proposal } from '@/entities/proposal/model/types';
import { Track } from '@/entities/track/model/types';
import ProposalOverviewTabSkeleton from '../ProposalOverviewTab/ProposalOverviewTabSkeleton';

const ProposalContent: React.FC<IProposalContentProps> = ({
  data,
  tracks,
  reviewersList,
  users,
  speakers,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const isDataLoaded = tracks.status === 'success' || tracks.status === 'error';
  const isError = tracks.status === 'error';

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

  const track = (proposal: Proposal, tracks: Track[]) => {
    const foundTrack = tracks.find((track) => track.id === proposal.trackId);
    return (
      foundTrack ?? {
        id: proposal.trackId,
        title: 'Трек не найден',
        description: '',
        order: 0,
      }
    );
  };

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
          />
          <Tab
            label={tabsDictionary['reviews']}
            value={'reviews'}
            sx={sx.proposalTab}
          />
          <Tab
            label={tabsDictionary['comments']}
            value={'comments'}
            sx={sx.proposalTab}
          />
          <Tab
            label={tabsDictionary['history']}
            value={'history'}
            sx={sx.proposalTab}
          />
        </Tabs>
      </SectionCard>
      <SectionCard title={null} restSx={sx.tabCard}>
        {currentTab === 'overview' && (
          <Box>
            {isDataLoaded && data.proposal ? (
              isError ? (
                <ProposalOverviewTab
                  proposal={data.proposal}
                  track={{ status: tracks.status, message: tracks.message }}
                />
              ) : (
                <ProposalOverviewTab
                  proposal={data.proposal}
                  track={{
                    status: tracks.status,
                    data: track(data.proposal, tracks.data),
                  }}
                />
              )
            ) : (
              <ProposalOverviewTabSkeleton />
            )}
          </Box>
        )}
        {currentTab === 'reviews' && (
          <Box>
            <ProposalReviewsTab
              reviews={data.reviews}
              canAssignReviewer={canAssignReviewer}
              reviewers={reviewersList}
            />
          </Box>
        )}
        {currentTab === 'comments' && (
          <Box>
            <ProposalCommentsTab
              comments={data.comments}
              canAddComment={canAddComment}
              users={users}
            />
          </Box>
        )}
        {currentTab === 'history' && (
          <Box>
            <ProposalHistoryTab
              history={data.history}
              users={users}
              comments={data.comments}
              reviewers={reviewersList}
            />
          </Box>
        )}
      </SectionCard>
      <SectionCard
        title={`Информация о спикер${speakers.length > 1 ? 'ах' : 'е'}`}
      >
        {speakers.length > 0 ? (
          <Stack spacing={4}>
            {speakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </Stack>
        ) : (
          <EmptyState
            title="Не удалось загрузить список спикеров!"
            subtitle="Попробуйте перезагрузить страницу."
          />
        )}
      </SectionCard>
    </Stack>
  );
};

export default ProposalContent;

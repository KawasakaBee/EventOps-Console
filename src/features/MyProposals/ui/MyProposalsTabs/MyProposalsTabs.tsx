import { IMyProposalsTabsProps } from './MyProposalsTabs.types';
import { Box, Stack, Tab, Tabs } from '@mui/material';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { myProposalsTabs } from '../../model/types';
import { myProposalsTabsDictionary } from '../../model/dictionary';
import { styles } from './styles';
import MyProposalsTable from '../MyProposalsTable/MyProposalsTable';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import MyProposalsTableSkeleton from '../MyProposalsTable/MyProposalsTableSkeleton';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import useMyProposalsTabsData from '../../model/useMyProposalsTabsData';
import PaginationControl from '@/shared/ui/PaginationControl/PaginationControl';

const MyProposalsTabs: React.FC<IMyProposalsTabsProps> = ({
  proposalsData,
  draftsData,
  tracks,
}) => {
  const {
    currentTab,
    isProposalsDataLoaded,
    isProposalsError,
    isDraftsDataLoaded,
    isDraftsError,
    handleTabChange,
    handleToSubmitRedirect,
  } = useMyProposalsTabsData(proposalsData, draftsData);

  const sx = styles();

  return (
    <Stack spacing={2}>
      <SectionCard title={null}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          {myProposalsTabs.map((tab) => (
            <Tab
              key={tab}
              label={myProposalsTabsDictionary[tab]}
              value={tab}
              sx={sx.proposalTab}
            />
          ))}
        </Tabs>
      </SectionCard>
      {currentTab === 'proposals' && (
        <Box>
          {isProposalsDataLoaded ? (
            isProposalsError ? (
              proposalsData.errorProps && (
                <ErrorState {...proposalsData.errorProps} />
              )
            ) : proposalsData.data?.items &&
              proposalsData.data.items.length > 0 ? (
              <MyProposalsTable
                data={proposalsData.data.items}
                tracks={tracks}
              />
            ) : (
              <EmptyState
                title="Заявок пока что нет."
                subtitle="Создайте новую заявку"
                action={{
                  handler: handleToSubmitRedirect,
                  buttonName: 'Создать заявку',
                }}
              />
            )
          ) : (
            <MyProposalsTableSkeleton />
          )}
          {!isProposalsError && (
            <PaginationControl
              totalPages={proposalsData.data?.totalPages}
              isDisabled={!isProposalsDataLoaded}
            />
          )}
        </Box>
      )}
      {currentTab === 'drafts' && (
        <Box>
          {isDraftsDataLoaded ? (
            isDraftsError ? (
              draftsData.errorProps && <ErrorState {...draftsData.errorProps} />
            ) : draftsData.data?.items && draftsData.data.items.length > 0 ? (
              <MyProposalsTable data={draftsData.data.items} tracks={tracks} />
            ) : (
              <EmptyState
                title="Заявок пока что нет."
                subtitle="Создайте новую заявку"
                action={{
                  handler: handleToSubmitRedirect,
                  buttonName: 'Создать заявку',
                }}
              />
            )
          ) : (
            <MyProposalsTableSkeleton />
          )}
          {!isDraftsError && (
            <PaginationControl
              totalPages={draftsData.data?.totalPages}
              isDisabled={!isDraftsDataLoaded}
            />
          )}
        </Box>
      )}
    </Stack>
  );
};
export default MyProposalsTabs;

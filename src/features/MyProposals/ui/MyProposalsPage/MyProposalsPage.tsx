'use client';

import { Box, Stack, Tab, Tabs } from '@mui/material';
import useMyProposalsData from '../../model/useMyProposalsData';
import { styles } from './styles';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { myProposalsTabs } from '../../model/types';
import { myProposalsTabsDictionary } from '../../model/dictionary';
import MyProposalsTableSkeleton from '../MyProposalsTable/MyProposalsTableSkeleton';
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import getMyProposalsErrorState from '../../model/getMyProposalsErrorState';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import MyProposalsTable from '../MyProposalsTable/MyProposalsTable';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import PaginationControl from '@/shared/ui/PaginationControl/PaginationControl';

const MyProposalsPage = () => {
  const {
    submittedPagination,
    draftPagination,
    currentTab,
    handleTabChange,
    handleToSubmitRedirect,
  } = useMyProposalsData();

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
              sx={sx.myProposalsPageTabs}
            />
          ))}
        </Tabs>
      </SectionCard>
      {currentTab === 'proposals' && (
        <Box>
          {submittedPagination.isLoading ? (
            <MyProposalsTableSkeleton />
          ) : submittedPagination.isError ? (
            isAppBaseQueryError(submittedPagination.error) && (
              <ErrorState
                {...getMyProposalsErrorState(submittedPagination.error.error, {
                  retry: submittedPagination.refetch,
                })}
              />
            )
          ) : submittedPagination.data?.items &&
            submittedPagination.data.items.length > 0 ? (
            <MyProposalsTable proposalsList={submittedPagination.data.items} />
          ) : (
            <EmptyState
              title="Заявок пока что нет."
              subtitle="Создайте новую заявку"
              action={{
                handler: handleToSubmitRedirect,
                buttonName: 'Создать заявку',
              }}
            />
          )}
          {!submittedPagination.isError &&
            submittedPagination.data?.totalPages !== 0 && (
              <PaginationControl
                totalPages={submittedPagination.data?.totalPages}
                isDisabled={submittedPagination.isLoading}
              />
            )}
        </Box>
      )}
      {currentTab === 'drafts' && (
        <Box>
          {draftPagination.isLoading ? (
            <MyProposalsTableSkeleton />
          ) : draftPagination.isError ? (
            isAppBaseQueryError(draftPagination.error) && (
              <ErrorState
                {...getMyProposalsErrorState(draftPagination.error.error, {
                  retry: draftPagination.refetch,
                })}
              />
            )
          ) : draftPagination.data?.items &&
            draftPagination.data.items.length > 0 ? (
            <MyProposalsTable proposalsList={draftPagination.data.items} />
          ) : (
            <EmptyState
              title="Заявок пока что нет."
              subtitle="Создайте новую заявку"
              action={{
                handler: handleToSubmitRedirect,
                buttonName: 'Создать заявку',
              }}
            />
          )}
          {!draftPagination.isError &&
            draftPagination.data?.totalPages !== 0 && (
              <PaginationControl
                totalPages={draftPagination.data?.totalPages}
                isDisabled={draftPagination.isLoading}
              />
            )}
        </Box>
      )}
    </Stack>
  );
};
export default MyProposalsPage;

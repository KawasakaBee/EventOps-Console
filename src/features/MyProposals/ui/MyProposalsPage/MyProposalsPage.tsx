'use client';

import useMyProposalsData from '../../model/useMyProposalsData';
import MyProposalTabs from '../MyProposalsTabs/MyProposalsTabs';

const MyProposalsPage = () => {
  const { submittedPagination, draftPagination, tracks } = useMyProposalsData();

  return (
    <MyProposalTabs
      proposalsData={submittedPagination}
      draftsData={draftPagination}
      tracks={tracks}
    />
  );
};
export default MyProposalsPage;

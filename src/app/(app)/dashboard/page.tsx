'use client';

import { Box, Typography } from '@mui/material';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { useGetDashboardQuery } from '@/entities/dashboard/api/dashboardApi';

const Dashboard = () => {
  const dashboard = useGetDashboardQuery({ id: '1', range: '30d' });

  return (
    <>
      <Typography variant="h1">This is Dashboard</Typography>
      {dashboard && (
        <Box>
          {dashboard.data?.kpis && (
            <SectionCard title="KPIS" actions>
              <Typography variant="h5">
                Total submissions - {dashboard.data?.kpis.totalSubmissions}
              </Typography>
              <Typography variant="h5">
                Proposal in review - {dashboard.data?.kpis.inReview}
              </Typography>
              <Typography variant="h5">
                Accepted proposals - {dashboard.data?.kpis.accepted}
              </Typography>
              <Typography variant="h5">
                Rejected proposals - {dashboard.data?.kpis.rejected}
              </Typography>
            </SectionCard>
          )}
          {dashboard.data?.submissionsByStatus.length !== 0 && (
            <SectionCard title="Submissions by status" actions>
              {dashboard.data?.submissionsByStatus.map((proposal) => (
                <Box key={proposal.status}>
                  <Typography variant="h5">
                    Proposal status: {proposal.status}
                  </Typography>
                  <Typography variant="h5">Count - {proposal.count}</Typography>
                </Box>
              ))}
            </SectionCard>
          )}

          {dashboard.data?.byTrack.length !== 0 && (
            <SectionCard title="Proposals by trask ID" actions>
              {dashboard.data?.byTrack.map((proposal) => (
                <Box key={proposal.trackId}>
                  <Typography variant="h5">
                    Proposal track ID: {proposal.trackId}
                  </Typography>
                  <Typography variant="h5">Count - {proposal.count}</Typography>
                </Box>
              ))}
            </SectionCard>
          )}

          {dashboard.data?.recentSubmissions.length !== 0 && (
            <SectionCard title="Recent submissions" actions>
              {dashboard.data?.recentSubmissions.map((proposal) => (
                <Box key={proposal.id}>
                  <Typography variant="h5">
                    Proposal: {proposal.title}
                  </Typography>
                  <Typography variant="h5">
                    Proposal: {proposal.format}
                  </Typography>
                  <Typography variant="h5">
                    Proposal: {proposal.level}
                  </Typography>
                  <Typography variant="h5">
                    Proposal: {proposal.status}
                  </Typography>
                </Box>
              ))}
            </SectionCard>
          )}
          {dashboard.data?.attentionItems.length !== 0 && (
            <SectionCard title="Attention block" actions>
              {dashboard.data?.attentionItems.map((item) => (
                <Box key={item.id}>
                  <Typography variant="h5">
                    Attention theme: {item.type}
                  </Typography>
                  <Typography variant="h5">Attention: {item.title}</Typography>
                  <Typography variant="h5">Count - {item.count}</Typography>
                </Box>
              ))}
            </SectionCard>
          )}
        </Box>
      )}
    </>
  );
};

export default Dashboard;

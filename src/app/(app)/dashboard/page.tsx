'use client';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { User } from '@/entities/user/model/types';
import { Dashboard as DashboardType } from '@/entities/dashboard/model/types';
import { GetDashboardResponse } from '@/shared/api/contracts/dashboard.contract';
import { getCurrentUser } from '@/shared/utils/getCurrentUser';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [dashboard, setDashboard] = useState<DashboardType | null>(null);

  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      if (user) setUser(user);
    })();
  }, []);

  useEffect(() => {
    let ignored = false;

    const getDashboard = async () => {
      try {
        if (!user) return;

        const response = await fetch(
          `/api/events/${user?.eventIds[0]}/dashboard?range=30d`,
        );

        if (!response.ok) return;

        const parsedResponse: GetDashboardResponse = await response.json();
        if (!ignored) setDashboard(parsedResponse);
      } catch (err) {
        console.error(err);
      }
    };

    void getDashboard();

    return () => {
      ignored = true;
    };
  }, [user]);

  return (
    <>
      <PageHeader
        title="This is PageHeader title"
        subtitle="This is PageHeader Subtitle"
      >
        This is custom text inside PageHeader
      </PageHeader>
      <Typography variant="h1">This is Dashboard</Typography>
      {dashboard && (
        <Box>
          {dashboard.kpis && (
            <SectionCard title="KPIS" actions>
              <Typography variant="h5">
                Total submissions - {dashboard.kpis.totalSubmissions}
              </Typography>
              <Typography variant="h5">
                Proposal in review - {dashboard.kpis.inReview}
              </Typography>
              <Typography variant="h5">
                Accepted proposals - {dashboard.kpis.accepted}
              </Typography>
              <Typography variant="h5">
                Rejected proposals - {dashboard.kpis.rejected}
              </Typography>
            </SectionCard>
          )}
          {dashboard.submissionsByStatus.length !== 0 && (
            <SectionCard title="Submissions by status" actions>
              {dashboard.submissionsByStatus.map((proposal) => (
                <Box key={proposal.status}>
                  <Typography variant="h5">
                    Proposal status: {proposal.status}
                  </Typography>
                  <Typography variant="h5">Count - {proposal.count}</Typography>
                </Box>
              ))}
            </SectionCard>
          )}

          {dashboard.byTrack.length !== 0 && (
            <SectionCard title="Proposals by trask ID" actions>
              {dashboard.byTrack.map((proposal) => (
                <Box key={proposal.trackId}>
                  <Typography variant="h5">
                    Proposal track ID: {proposal.trackId}
                  </Typography>
                  <Typography variant="h5">Count - {proposal.count}</Typography>
                </Box>
              ))}
            </SectionCard>
          )}

          {dashboard.recentSubmissions.length !== 0 && (
            <SectionCard title="Recent submissions" actions>
              {dashboard.recentSubmissions.map((proposal) => (
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
          {dashboard.attentionItems.length !== 0 && (
            <SectionCard title="Attention block" actions>
              {dashboard.attentionItems.map((item) => (
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

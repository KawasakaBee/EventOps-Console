'use client';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { User } from '@/entities/user/model/types';
import { Dashboard as DashboardType } from '@/entities/dashboard/model/types';
import { GetDashboardResponse } from '@/shared/api/contracts/dashboard.contract';
import { getCurrentUser } from '@/shared/utils/getCurrentUser';

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
          <Typography variant="h5">
            Total submission is {dashboard.kpis.totalSubmissions}
          </Typography>
          <Typography variant="h5">
            Accepted is {dashboard.kpis.accepted}
          </Typography>
          <Typography variant="h5">
            Rejected is {dashboard.kpis.rejected}
          </Typography>
          <Typography variant="h5">
            In review is {dashboard.kpis.inReview}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Dashboard;

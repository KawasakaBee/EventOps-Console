'use client';

import { Proposal } from '@/entities/proposal/model/types';
import {
  GetProposalResponse,
  PatchProposalRequest,
  PatchProposalResponse,
  PatchProposalStatusRequest,
  PatchProposalStatusResponse,
} from '@/shared/api/contracts/proposal.contract';
import { fetchWithDemoAuth } from '@/shared/api/fetchWithDemoAuth';
import Button from '@/shared/ui/Button/Button';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import { Box, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const updatedBody: PatchProposalRequest = {
  format: 'workshop',
  level: 'senior',
};

const changedBody: PatchProposalStatusRequest = {
  status: 'accepted',
  reason: 'Потому что захотелось',
};

const ProposalItem = () => {
  const id = useParams<{ id: string }>().id;
  const [proposal, setProposal] = useState<Proposal | null>(null);

  const updateProposal = async () => {
    try {
      const response = await fetchWithDemoAuth(`/api/proposals/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedBody),
      });

      if (!response.ok) return;

      const parsedResponse: PatchProposalResponse = await response.json();
      setProposal(parsedResponse.proposal);
    } catch (err) {
      console.error(err);
    }
  };

  const changeStatus = async () => {
    try {
      const response = await fetchWithDemoAuth(`/api/proposals/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify(changedBody),
      });

      if (!response.ok) return;

      const parsedResponse: PatchProposalStatusResponse = await response.json();
      setProposal(parsedResponse.proposal);
    } catch (err) {
      console.error(err);
    }
  };

  const assignReviewer = async () => {
    try {
      const response = await fetchWithDemoAuth(
        `/api/proposals/${id}/assign-reviewer`,
        { method: 'POST', body: JSON.stringify({ reviewerId: '3' }) },
      );

      if (!response.ok) return;

      const parsedResponse = await response.json();
      return parsedResponse;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getProposalById = async () => {
      try {
        const response = await fetchWithDemoAuth(`/api/proposals/${id}`);

        if (!response.ok) return;

        const parsedResponse: GetProposalResponse = await response.json();
        setProposal(parsedResponse.proposal);
      } catch (err) {
        console.error(err);
      }
    };

    getProposalById();
  }, [id]);

  return (
    <>
      <PageHeader
        title="This is PageHeader title"
        subtitle="This is PageHeader Subtitle"
      >
        This is custom text inside PageHeader
        <Button
          mode="button"
          variant="contained"
          size="medium"
          onClick={updateProposal}
        >
          Изменить заявку
        </Button>
        <Button
          mode="button"
          variant="contained"
          size="medium"
          onClick={changeStatus}
        >
          Изменить статус
        </Button>
        <Button
          mode="button"
          variant="contained"
          size="medium"
          onClick={assignReviewer}
        >
          Назначить Ревьювера
        </Button>
      </PageHeader>
      {proposal && (
        <Box>
          <Typography variant="h1">
            This is Proposal №{proposal.title}
          </Typography>
          <Box>id is {proposal.id}</Box>
          <Box>format is {proposal.format}</Box>
          <Box>level is {proposal.level}</Box>
          <Box>duration is {proposal.duration}</Box>
          <Box>status is {proposal.status}</Box>
        </Box>
      )}
    </>
  );
};

export default ProposalItem;

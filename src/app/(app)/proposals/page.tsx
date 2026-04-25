'use client';

import Button from '@/shared/ui/Button/Button';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import { List, ListItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  GetProposalsListResponse,
  PostProposalRequest,
  PostProposalResponse,
} from '@/shared/api/contracts/proposal.contract';
import { ProposalListItem } from '@/entities/proposal/model/types';
import { Speaker } from '@/entities/speaker/model/types';
import { fetchWithDemoAuth } from '@/shared/api/fetchWithDemoAuth';

const testSpeaker: Speaker = {
  id: '3',
  userId: '3',
  name: 'Third Speaker',
  email: 'thirdSpeaker@gmail.com',
  company: 'Third speaker company',
  position: 'Third speaker positions',
  bio: 'Third speaker bio',
  contacts: 'Third speaker contacts',
  pastTalks: 'Third speaker past talks',
  avatarUrl: 'Third speaker avatarUrl',
};

const body: PostProposalRequest = {
  title: 'Самая новая заявка',
  abstract: 'Abstract',
  format: 'talk',
  duration: 30,
  level: 'middle',
  trackId: '4',
  speakers: [testSpeaker],
  tags: ['Backend', 'CSS'],
  consent: true,
  status: 'draft',
};

const Proposals = () => {
  const [proposalsList, setProposalsList] = useState<ProposalListItem[]>([]);

  const getProposalList = async () => {
    try {
      const response = await fetchWithDemoAuth('/api/proposals');

      if (!response.ok) return;

      const parsedResponse: GetProposalsListResponse = await response.json();
      return parsedResponse.items;
    } catch (err) {
      console.error(err);
    }
  };

  const createProposal = async () => {
    try {
      const response = await fetchWithDemoAuth('/api/proposals', {
        method: 'POST',
        body: JSON.stringify(body),
      });

      if (!response.ok) return;

      const parsedResponse: PostProposalResponse = await response.json();
      setProposalsList((prev) =>
        prev ? [...prev, parsedResponse.proposal] : prev,
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      const data: ProposalListItem[] | undefined = await getProposalList();
      if (data) setProposalsList(data);
    })();
  }, []);

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
          onClick={createProposal}
        >
          Создать новую заявку
        </Button>
      </PageHeader>
      <Typography variant="h1">This is Proposals List</Typography>
      {proposalsList && proposalsList.length !== 0 && (
        <List>
          {proposalsList.map((proposal) => (
            <ListItem key={proposal.id}>
              <Button
                mode="link"
                variant="contained"
                size="medium"
                to={`/proposals/${proposal.id}`}
              >
                Открыть заявку №{proposal.id}
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default Proposals;

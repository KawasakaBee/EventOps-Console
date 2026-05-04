import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { styles } from './styles';
import { IProposalStickyPanelProps } from './ProposalStickyPanel.types';
import { Box, Stack, Typography } from '@mui/material';
import StatusChip from '@/shared/ui/StatusChip/StatusChip';
import isoToLocalDate from '@/shared/utils/isoToLocalDate';
import { useMemo } from 'react';
import { AdditionalAction, CriticalAction } from '../../model/actions';
import {
  isAdditionalAvailableAction,
  isCriticalAvailableAction,
} from '@/shared/utils/typeGuards';
import Button from '@/shared/ui/Button/Button';
import {
  availableActionsDictionary,
  formatDictionary,
  levelDictionary,
} from '@/shared/data';
import SecondaryStickyButtons from '../SecondaryStickyButtons/SecondaryStickyButtons';
import formatDuration from '@/shared/utils/formatDuration';

const ProposalStickyPanel: React.FC<IProposalStickyPanelProps> = ({
  data,
  trackName,
}) => {
  const { proposal, availableActions } = data;

  const criticalActions: CriticalAction[] = useMemo(
    () => availableActions.filter(isCriticalAvailableAction),
    [availableActions],
  );
  const additionalActions: AdditionalAction[] = useMemo(
    () => availableActions.filter(isAdditionalAvailableAction),
    [availableActions],
  );

  const sx = styles({ action: 'edit' });

  return (
    <SectionCard title={null}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2">Статус:</Typography>
            <StatusChip
              status={proposal.status}
              type="outlined"
              shape="rounded"
              size="small"
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Последнее обновление:</Typography>
            <Typography variant="caption" sx={sx.lastUpdateTime}>
              {isoToLocalDate(proposal.updatedAt)}
            </Typography>
          </Box>
        </Stack>
        {criticalActions.length !== 0 && (
          <Stack spacing={1}>
            {criticalActions.map((action) => (
              <Button
                key={action}
                mode="button"
                variant="contained"
                size="small"
                sx={styles({ action }).criticalButton}
              >
                {availableActionsDictionary[action]}
              </Button>
            ))}
          </Stack>
        )}
        {additionalActions.length !== 0 && (
          <Stack spacing={1}>
            {additionalActions.map((action) => (
              <Button
                key={action}
                mode="button"
                variant="outlined"
                size="small"
              >
                {availableActionsDictionary[action]}
              </Button>
            ))}
          </Stack>
        )}
        <SecondaryStickyButtons />
        <Stack spacing={1}>
          <Typography variant="subtitle2">
            Трек: <b>{trackName ?? '—'}</b>
          </Typography>
          <Typography variant="subtitle2">
            Формат: <b>{formatDictionary.get(proposal.format) ?? '—'}</b>
          </Typography>
          <Typography variant="subtitle2">
            Уровень: <b>{levelDictionary.get(proposal.level) ?? '—'}</b>
          </Typography>
          <Typography variant="subtitle2">
            Продолжительность: <b>{formatDuration(proposal.duration)}</b>
          </Typography>
        </Stack>
      </Stack>
    </SectionCard>
  );
};

export default ProposalStickyPanel;

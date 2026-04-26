import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { IProposalsFilterBarPropos } from './ProposalsFilterBar.types';
import {
  ProposalFormat,
  proposalFormats,
  ProposalLevel,
  proposalLevels,
  ProposalStatus,
  proposalStatuses,
} from '@/entities/proposal/model/types';
import { usePathname, useRouter } from 'next/navigation';
import {
  isId,
  isProposalFormat,
  isProposalLevel,
  isProposalStatus,
} from '@/shared/utils/typeGuards';
import { ID } from '@/shared/types/primitives.types';
import {
  formatDicrionary,
  levelDictionary,
  statusDictionary,
} from '@/shared/data';
import Button from '@/shared/ui/Button/Button';
import { styles } from './styles';

const ProposalsFilterBar: React.FC<IProposalsFilterBarPropos> = ({
  tracks,
  reviewers,
  searchParams,
  isLoading,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const reviewerId = searchParams.get('reviewerId');

  const statusesList = searchParams.getAll('status').filter(isProposalStatus);
  const trackIdsList = searchParams.getAll('trackId');
  const levelsList = searchParams.getAll('level').filter(isProposalLevel);
  const formatsList = searchParams.getAll('format').filter(isProposalFormat);

  const reviewerOptions = reviewers.map((item) => ({
    label: item.name,
    id: item.id,
  }));

  const autocompleteValue =
    reviewerOptions.find((item) => item.id === reviewerId) ?? null;

  const sx = styles();

  const filterArrayQueryParams = <T extends string>(
    value: T[] | string,
    qeuryType: string,
    queryTypeCheck: (value: unknown) => value is T,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value)) {
      params.delete(qeuryType);
      value.forEach((value) => {
        params.append(qeuryType, value);
      });
    } else {
      if (!queryTypeCheck(value)) return;
      params.set(qeuryType, value);
    }
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleStatusFilter = (value: ProposalStatus[] | string) => {
    filterArrayQueryParams(value, 'status', isProposalStatus);
  };

  const handleTrackIdFilter = (value: ID[] | string) => {
    filterArrayQueryParams(value, 'trackId', isId);
  };

  const handleLevelFilter = (value: ProposalLevel[] | string) => {
    filterArrayQueryParams(value, 'level', isProposalLevel);
  };

  const handleFormatFilter = (value: ProposalFormat[] | string) => {
    filterArrayQueryParams(value, 'format', isProposalFormat);
  };

  const handleReviewerFilter = (id: ID | undefined) => {
    const params = new URLSearchParams(searchParams.toString());

    if (id) {
      params.set('reviewerId', id);
    } else {
      params.delete('reviewerId');
    }
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    router.push(pathname);
  };

  return (
    <SectionCard title="Фильтры">
      <TextField sx={sx.filterSearchInput} />
      <Stack direction="row" sx={sx.filtersWrapper}>
        <FormControl disabled={isLoading} sx={sx.filterInput}>
          <InputLabel id="proposal-status-select">Статус заявки</InputLabel>
          <Select
            value={statusesList}
            labelId="proposal-status-select"
            label="Статус заявки"
            multiple
            onChange={(event) => handleStatusFilter(event.target.value)}
          >
            {proposalStatuses.map((status) => (
              <MenuItem key={`Select-option-${status}`} value={status}>
                {statusDictionary.get(status)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl disabled={isLoading} sx={sx.filterInput}>
          <InputLabel id="proposal-trackId-select">Отслеживаемый ID</InputLabel>
          <Select
            value={trackIdsList}
            labelId="proposal-trackId-select"
            label="Отслеживаемый ID"
            multiple
            onChange={(event) => handleTrackIdFilter(event.target.value)}
          >
            {tracks.map((track) => (
              <MenuItem key={`Select-option-${track.id}`} value={track.id}>
                {track.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl disabled={isLoading} sx={sx.filterInput}>
          <InputLabel id="proposal-level-select">Уровень заявки</InputLabel>
          <Select
            value={levelsList}
            labelId="proposal-level-select"
            label="Уровень заявки"
            multiple
            onChange={(event) => handleLevelFilter(event.target.value)}
          >
            {proposalLevels.map((level) => (
              <MenuItem key={`Select-option-${level}`} value={level}>
                {levelDictionary.get(level)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl disabled={isLoading} sx={sx.filterInput}>
          <InputLabel id="proposal-format-select">Формат заявки</InputLabel>
          <Select
            value={formatsList}
            labelId="proposal-format-select"
            label="Формат заявки"
            multiple
            onChange={(event) => handleFormatFilter(event.target.value)}
          >
            {proposalFormats.map((format) => (
              <MenuItem key={`Select-option-${format}`} value={format}>
                {formatDicrionary.get(format)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl disabled={isLoading} sx={sx.filterInput}>
          <Autocomplete
            options={reviewerOptions}
            value={autocompleteValue}
            renderInput={(params) => <TextField {...params} label="Ревьюер" />}
            onChange={(_, option) => handleReviewerFilter(option?.id)}
          />
        </FormControl>

        <Button
          mode="button"
          variant="contained"
          size="small"
          onClick={handleReset}
        >
          Сбросить фильтры
        </Button>
      </Stack>
    </SectionCard>
  );
};

export default ProposalsFilterBar;

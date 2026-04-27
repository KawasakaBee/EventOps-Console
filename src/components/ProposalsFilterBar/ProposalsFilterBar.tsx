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
  formatDictionary,
  levelDictionary,
  statusDictionary,
} from '@/shared/data';
import Button from '@/shared/ui/Button/Button';
import { styles } from './styles';
import ProposalSearchInput from '../ProposalSearchInput/ProposalSearchInput';
import { useEffect } from 'react';
import { parseProposalsListQuery } from '@/entities/proposal/lib/parseProposalsListQuery';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import {
  FiltersState,
  hydrateFilters,
  patchFilters,
  resetFilters,
} from '@/features/ProposalsFilters/model/proposalsFiltersSlice';

const ProposalsFilterBar: React.FC<IProposalsFilterBarPropos> = ({
  tracks,
  reviewers,
  searchParams,
  isLoading,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.proposalsFilters.filters);

  const statusesList = filters.status;
  const trackIdsList = filters.trackId;
  const levelsList = filters.level;
  const formatsList = filters.format;

  const reviewerOptions = reviewers.map((item) => ({
    label: item.name,
    id: item.id,
  }));

  const selectedReviewer =
    reviewerOptions.find((item) => item.id === filters.reviewerId) ?? null;

  const queryString = searchParams.toString();

  const sx = styles();

  useEffect(() => {
    const { search, status, trackId, level, format, reviewerId } =
      parseProposalsListQuery(`${pathname}?${queryString}`);

    const filtersStoreBody: FiltersState = {
      filters: {
        search,
        status,
        trackId,
        level,
        format,
        reviewerId,
      },
    };

    dispatch(hydrateFilters(filtersStoreBody));
  }, [pathname, queryString, dispatch]);

  const filterArrayQueryParams = <T extends string>(
    value: T[] | string,
    queryType: keyof FiltersState['filters'],
    queryTypeCheck: (value: unknown) => value is T,
  ) => {
    if (Array.isArray(value)) {
      dispatch(patchFilters({ [queryType]: value }));
    } else {
      if (!queryTypeCheck(value)) return;
      dispatch(patchFilters({ [queryType]: [value] }));
    }
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
    if (id) {
      dispatch(patchFilters({ reviewerId: id }));
    } else {
      dispatch(patchFilters({ reviewerId: null }));
    }
  };

  const setFilterParam = (
    queryType: keyof FiltersState['filters'],
    params: URLSearchParams,
  ) => {
    params.delete(queryType);
    if (
      queryType === 'status' ||
      queryType === 'trackId' ||
      queryType === 'level' ||
      queryType === 'format'
    ) {
      filters[queryType].forEach((val) => params.append(queryType, val));
    }
    if (
      (queryType === 'search' || queryType === 'reviewerId') &&
      filters[queryType]
    ) {
      params.set(queryType, filters[queryType]);
    }
  };

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    setFilterParam('search', params);
    setFilterParam('status', params);
    setFilterParam('trackId', params);
    setFilterParam('level', params);
    setFilterParam('format', params);
    setFilterParam('reviewerId', params);
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    dispatch(resetFilters());

    router.push(pathname);
  };

  return (
    <SectionCard title="Фильтры" restSx={sx.filtersContainer}>
      <ProposalSearchInput
        isLoading={isLoading}
        sxFormControl={sx.filterInput}
        sxSearchInput={sx.filterSearchInput}
        searchValue={filters.search ?? ''}
      />
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
                {formatDictionary.get(format)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={sx.filterInput}>
          <Autocomplete
            options={reviewerOptions}
            value={selectedReviewer}
            renderInput={(params) => <TextField {...params} label="Ревьюер" />}
            onChange={(_, option) => handleReviewerFilter(option?.id)}
            disabled={isLoading}
          />
        </FormControl>

        <Button
          mode="button"
          variant="contained"
          size="small"
          onClick={handleApply}
        >
          Применить фильтры
        </Button>
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

import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from '@mui/material';
import { IProposalsFilterBarProps } from './ProposalsFilterBar.types';
import { usePathname, useRouter } from 'next/navigation';
import { isId } from '@/shared/utils/typeGuards';
import { ID } from '@/shared/types/primitives.types';
import Button from '@/shared/ui/Button/Button';
import { styles } from './styles';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { parseProposalsListQuery } from '@/entities/proposal/lib/parseProposalsListQuery';
import {
  FiltersState,
  hydrateFilters,
  patchFilters,
} from '../../model/proposalsListSlice';
import {
  ProposalFormat,
  proposalFormats,
  ProposalLevel,
  proposalLevels,
  ProposalStatus,
  proposalStatuses,
} from '@/entities/proposal/model/types';
import {
  formatDictionary,
  levelDictionary,
  statusDictionary,
} from '@/entities/proposal/model/dictionaries';
import {
  isProposalFormat,
  isProposalLevel,
  isProposalStatus,
} from '@/entities/proposal/model/typeGuards';
import SearchInput from '@/shared/ui/SearchInput/SearchInput';
import { getApiErrorMessage } from '@/shared/api/getApiErrorMessage';
import { useGetTracksQuery } from '@/entities/track/api/trackApi';
import { useGetReviewersQuery } from '@/entities/reviewer/api/reviewerApi';
import { useGetEventsQuery } from '@/entities/event/api/eventApi';

const ProposalsFilterBar: React.FC<IProposalsFilterBarProps> = ({
  searchParams,
  isDisabled,
  handleResetFilters,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const filters = useAppSelector(
    (state) => state.proposalsFilters.draftFilters,
  );

  const tracks = useGetTracksQuery();
  const events = useGetEventsQuery();
  const reviewers = useGetReviewersQuery();

  const statusesList = filters.status;
  const trackIdsList = filters.trackId;
  const eventIdsList = filters.eventId;
  const levelsList = filters.level;
  const formatsList = filters.format;

  const queryString = searchParams.toString();

  const isReviewersSuccess =
    !reviewers.isError &&
    !reviewers.isLoading &&
    reviewers.data &&
    reviewers.data.reviewers.length !== 0;

  const reviewerOptions = isReviewersSuccess
    ? reviewers.data.reviewers.map((item) => ({
        label: item.name,
        id: item.id,
      }))
    : [];

  const selectedReviewer =
    reviewerOptions.find((item) => item.id === filters.reviewerId) ?? null;

  const sx = styles();

  useEffect(() => {
    const { search, status, trackId, eventId, level, format, reviewerId } =
      parseProposalsListQuery(`${pathname}?${queryString}`);

    const filtersStoreBody: FiltersState['draftFilters'] = {
      search,
      status,
      trackId,
      eventId,
      level,
      format,
      reviewerId,
    };

    dispatch(hydrateFilters(filtersStoreBody));
  }, [pathname, queryString, dispatch]);

  const filterArrayQueryParams = <T extends string>(
    value: T[] | string,
    queryType: keyof FiltersState['draftFilters'],
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

  const handleEventIdFilter = (value: ID[] | string) => {
    filterArrayQueryParams(value, 'eventId', isId);
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    dispatch(patchFilters({ search: value || null }));
  };

  const setFilterParam = (
    queryType: keyof FiltersState['draftFilters'],
    params: URLSearchParams,
  ) => {
    params.delete(queryType);
    if (
      queryType === 'status' ||
      queryType === 'trackId' ||
      queryType === 'eventId' ||
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
    setFilterParam('eventId', params);
    setFilterParam('level', params);
    setFilterParam('format', params);
    setFilterParam('reviewerId', params);
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <SectionCard title="Фильтры" restSx={sx.filtersContainer}>
      <SearchInput
        searchValue={filters.search ?? ''}
        label="Поиск по названию"
        isDisabled={isDisabled}
        handleSearchChange={handleSearchChange}
      />
      <Grid container spacing={2}>
        <FormControl disabled={isDisabled} sx={sx.filterInput}>
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
                {statusDictionary[status]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          disabled={isDisabled || events.isLoading || events.isError}
          sx={sx.filterInput}
        >
          {events.isLoading ? (
            <Skeleton variant="text" />
          ) : (
            <>
              <InputLabel id="proposal-eventId-select">Событие</InputLabel>
              <Select
                value={eventIdsList}
                labelId="proposal-eventId-select"
                label="Событие"
                multiple
                onChange={(event) => handleEventIdFilter(event.target.value)}
              >
                {events.isError ? (
                  <MenuItem>{getApiErrorMessage(events.error)}</MenuItem>
                ) : events.data ? (
                  events.data.events.map((event) => (
                    <MenuItem
                      key={`Select-option-${event.id}`}
                      value={event.id}
                    >
                      {event.title}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>Нет доступных событий</MenuItem>
                )}
              </Select>
            </>
          )}
        </FormControl>

        <FormControl
          disabled={isDisabled || tracks.isLoading || tracks.isError}
          sx={sx.filterInput}
        >
          {tracks.isLoading ? (
            <Skeleton variant="text" />
          ) : (
            <>
              <InputLabel id="proposal-trackId-select">Трек</InputLabel>
              <Select
                value={trackIdsList}
                labelId="proposal-trackId-select"
                label="Трек"
                multiple
                onChange={(event) => handleTrackIdFilter(event.target.value)}
              >
                {tracks.isError ? (
                  <MenuItem>{getApiErrorMessage(tracks.error)}</MenuItem>
                ) : tracks.data ? (
                  tracks.data.tracks.map((track) => (
                    <MenuItem
                      key={`Select-option-${track.id}`}
                      value={track.id}
                    >
                      {track.title}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>Нет доступных треков</MenuItem>
                )}
              </Select>
            </>
          )}
        </FormControl>

        <FormControl disabled={isDisabled} sx={sx.filterInput}>
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
                {levelDictionary[level]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl disabled={isDisabled} sx={sx.filterInput}>
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
                {formatDictionary[format]}
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
            disabled={isDisabled || !isReviewersSuccess}
          />
        </FormControl>

        <Button
          mode="button"
          variant="contained"
          size="medium"
          onClick={handleApply}
          isDisabled={isDisabled}
        >
          Применить фильтры
        </Button>
        <Button
          mode="button"
          variant="contained"
          size="medium"
          onClick={handleResetFilters}
          isDisabled={isDisabled}
        >
          Сбросить фильтры
        </Button>
      </Grid>
    </SectionCard>
  );
};

export default ProposalsFilterBar;

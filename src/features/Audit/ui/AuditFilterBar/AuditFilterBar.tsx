import { IAuditFilterBarProps } from './AuditFilterBar.types';
import { styles } from './styles';
import useAuditFilterBarData from '../../model/useAuditFilterBarData';
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
import { auditActions, auditEntities } from '@/entities/audit/model/types';
import {
  auditActionsDictionary,
  auditEntitiesDictionary,
} from '@/entities/audit/model/dictionaries';
import Button from '@/shared/ui/Button/Button';
import SearchInput from '@/shared/ui/SearchInput/SearchInput';
import { patchAuditFilters } from '../../model/auditSlice';
import { useAppDispatch } from '@/shared/store/hooks';
import { useGetUsersQuery } from '@/entities/user/api/userApi';

const AuditFilterBar: React.FC<IAuditFilterBarProps> = ({
  searchParams,
  isDisabled,
  handleFiltersReset,
}) => {
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = useGetUsersQuery();

  const {
    filters,
    handleActionFilter,
    handleEntityFilter,
    handleActorIdFilter,
    handleApplyFilters,
  } = useAuditFilterBarData(searchParams);

  const actionsList = filters.action;
  const entitiesList = filters.entity;

  const isUsersSuccess =
    !isLoading && !isError && data && data.users.length !== 0;

  const usersOptions = isUsersSuccess
    ? data.users.map((item) => ({
        label: item.name,
        id: item.id,
      }))
    : [];

  const selectedUser =
    usersOptions.find((item) => item.id === filters.actorId) ?? null;

  const sx = styles();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    dispatch(patchAuditFilters({ search: value || null }));
  };

  return (
    <SectionCard title="Фильтры" restSx={sx.filtersContainer}>
      <SearchInput
        searchValue={filters.search ?? ''}
        label="Поиск по ID действия или ID сущности"
        isDisabled={isDisabled}
        handleSearchChange={handleSearchChange}
      />
      <Stack direction="row" sx={sx.filtersWrapper}>
        <FormControl disabled={isDisabled} sx={sx.filterInput}>
          <InputLabel id="proposal-action-select">Тип действия</InputLabel>
          <Select
            value={actionsList}
            labelId="proposal-action-select"
            label="Тип действия"
            multiple
            onChange={(event) => handleActionFilter(event.target.value)}
          >
            {auditActions.map((action) => (
              <MenuItem key={`Select-option-${action}`} value={action}>
                {auditActionsDictionary[action]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl disabled={isDisabled} sx={sx.filterInput}>
          <InputLabel id="proposal-entity-select">Сущность</InputLabel>
          <Select
            value={entitiesList}
            labelId="proposal-entity-select"
            label="Сущность"
            multiple
            onChange={(event) => handleEntityFilter(event.target.value)}
          >
            {auditEntities.map((entity) => (
              <MenuItem key={`Select-option-${entity}`} value={entity}>
                {auditEntitiesDictionary[entity]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={sx.filterInput}>
          <Autocomplete
            options={usersOptions}
            value={selectedUser}
            renderInput={(params) => (
              <TextField {...params} label="Пользователь" />
            )}
            onChange={(_, option) => handleActorIdFilter(option?.id)}
            disabled={isDisabled || !isUsersSuccess}
          />
        </FormControl>

        <Stack direction="row" spacing={1}>
          <Button
            mode="button"
            variant="contained"
            size="medium"
            onClick={handleApplyFilters}
            isDisabled={isDisabled}
          >
            Применить фильтры
          </Button>
          <Button
            mode="button"
            variant="contained"
            size="medium"
            onClick={handleFiltersReset}
            isDisabled={isDisabled}
          >
            Сбросить фильтры
          </Button>
        </Stack>
      </Stack>
    </SectionCard>
  );
};

export default AuditFilterBar;

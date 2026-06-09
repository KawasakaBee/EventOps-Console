import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { useGetEventsQuery } from '@/entities/event/api/eventApi';
import { isAppBaseQueryError } from '@/shared/api/getApiErrorMessage';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';
import getDashboardErrorState from '../../model/getDashboardErrorState';
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { dashboardRanges } from '@/entities/dashboard/model/types';
import { dashboardRangesDictionary } from '@/entities/dashboard/model/dictionary';
import { isDashboardRange } from '@/entities/dashboard/model/typeGuards';
import DashboardSelectSkeleton from './DashboardSelectSkeleton';

const DashboardSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stringifySearchParams = searchParams.toString();
  const events = useGetEventsQuery();

  const currentEventId = searchParams.get('eventId') ?? '';
  const currentRange = searchParams.get('range') ?? '';

  const handleEventSelect = (value: string) => {
    const eventId = value.trim();
    const params = new URLSearchParams(stringifySearchParams);

    params.delete('eventId');
    if (eventId) params.set('eventId', value);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleRangeSelect = (value: string) => {
    if (!isDashboardRange(value) && value !== '') return;

    const params = new URLSearchParams(stringifySearchParams);

    params.set('range', value);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleToSettingsRedirect = () => {
    router.push('/settings');
  };

  return events.isLoading ? (
    <DashboardSelectSkeleton />
  ) : events.isError ? (
    isAppBaseQueryError(events.error) && (
      <ErrorState
        {...getDashboardErrorState(events.error.error, {
          retry: events.refetch,
        })}
      />
    )
  ) : events.data && events.data.events.length > 0 ? (
    <Stack direction="row" spacing={2}>
      <FormControl fullWidth>
        <InputLabel id="dashboard-event-select">Событие</InputLabel>
        <Select
          value={currentEventId}
          labelId="dashboard-event-select"
          label="Событие"
          onChange={(event) => handleEventSelect(event.target.value)}
        >
          {events.data.events.map((event) => (
            <MenuItem key={event.id} value={event.id}>
              {event.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="dashboard-range-select">
          Временной промежуток
        </InputLabel>
        <Select
          value={currentRange}
          labelId="dashboard-range-select"
          label="Временной промежуток"
          onChange={(event) => handleRangeSelect(event.target.value)}
        >
          {dashboardRanges.map((range) => (
            <MenuItem key={range} value={range}>
              {dashboardRangesDictionary[range]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  ) : (
    <EmptyState
      title="Нет доступных событий"
      subtitle="Создайте новое событие на странице настроек"
      action={{
        buttonName: 'На страницу настроек',
        handler: handleToSettingsRedirect,
      }}
    />
  );
};

export default DashboardSelect;

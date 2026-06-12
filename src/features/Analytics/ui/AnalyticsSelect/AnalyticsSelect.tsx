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
import EmptyState from '@/shared/ui/EmptyState/EmptyState';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { dashboardRanges } from '@/entities/dashboard/model/types';
import { dashboardRangesDictionary } from '@/entities/dashboard/model/dictionary';
import { isDashboardRange } from '@/entities/dashboard/model/typeGuards';
import AnalyticsSelectSkeleton from './AnalyticsSelectSkeleton';
import getAnalyticsErrorState from '../../model/getAnalitycsErrorState';

const AnalyticsSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const serializedSearchParams = searchParams.toString();
  const events = useGetEventsQuery();

  const currentEventId = searchParams.get('eventId') ?? '';
  const currentRange = searchParams.get('range') ?? '';

  const handleEventSelect = (value: string) => {
    const eventId = value.trim();
    const params = new URLSearchParams(serializedSearchParams);

    params.delete('eventId');
    if (eventId) params.set('eventId', value);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleRangeSelect = (value: string) => {
    if (!isDashboardRange(value) && value !== '') return;

    const params = new URLSearchParams(serializedSearchParams);

    params.set('range', value);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleToSettingsRedirect = () => {
    router.push('/settings');
  };

  return events.isLoading ? (
    <AnalyticsSelectSkeleton />
  ) : events.isError ? (
    isAppBaseQueryError(events.error) && (
      <ErrorState
        {...getAnalyticsErrorState(events.error.error, {
          retry: events.refetch,
        })}
      />
    )
  ) : events.data && events.data.events.length > 0 ? (
    <Stack direction="row" spacing={2}>
      <FormControl fullWidth>
        <InputLabel id="analytics-event-select">Событие</InputLabel>
        <Select
          value={currentEventId}
          labelId="analytics-event-select"
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
        <InputLabel id="analytics-range-select">
          Временной промежуток
        </InputLabel>
        <Select
          value={currentRange}
          labelId="analytics-range-select"
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

export default AnalyticsSelect;

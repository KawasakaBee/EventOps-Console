import SectionCard from '@/shared/ui/SectionCard/SectionCard';
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
import ScheduleSelectSkeleton from './ScheduleSelectSkeleton';
import getScheduleErrorState from '../../model/getScheduleErrorState';

const ScheduleSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stringifySearchParams = searchParams.toString();
  const events = useGetEventsQuery();

  const currentEventId = searchParams.get('eventId') ?? '';

  const handleEventSelect = (value: string) => {
    const eventId = value.trim();
    const params = new URLSearchParams(stringifySearchParams);

    params.delete('date');
    if (eventId !== '') params.set('eventId', value);

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleToSettingsRedirect = () => {
    router.push('/settings');
  };

  return (
    <SectionCard title="Выберите событие">
      {events.isLoading ? (
        <ScheduleSelectSkeleton />
      ) : events.isError ? (
        isAppBaseQueryError(events.error) && (
          <ErrorState
            {...getScheduleErrorState(events.error.error, {
              retry: events.refetch,
            })}
          />
        )
      ) : events.data && events.data.events.length > 0 ? (
        <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="schedule-event-select">Событие</InputLabel>
            <Select
              value={currentEventId}
              labelId="schedule-event-select"
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
      )}
    </SectionCard>
  );
};
export default ScheduleSelect;

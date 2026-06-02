import { Tab, Tabs, Typography } from '@mui/material';
import { IScheduleTabsProps } from './ScheduleTabs.types';
import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { styles } from './styles';

const ScheduleTabs: React.FC<IScheduleTabsProps> = ({ days }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stringifySearchParams = searchParams.toString();

  const currentTab = useMemo(() => {
    if (days.length === 0) return;
    const defaultTab = days[0].date;

    if (!searchParams.has('date')) return defaultTab;

    const tab = searchParams.get('date');
    if (days.findIndex((day) => day.date === tab) === -1) return defaultTab;

    return tab;
  }, [searchParams, days]);

  const sx = styles();

  const handleCurrentTabChange = (
    _: React.SyntheticEvent,
    newValue: string | number,
  ) => {
    if (days.findIndex((day) => day.date === newValue) === -1) return;
    const params = new URLSearchParams(stringifySearchParams);

    params.delete('date');
    params.set('date', String(newValue));

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <SectionCard title={null}>
      {days.length === 0 ? (
        <Typography variant="h3">
          Не удалось загрузить дни расписания
        </Typography>
      ) : (
        <Tabs value={currentTab} onChange={handleCurrentTabChange}>
          {days.map((day) => (
            <Tab
              key={day.date}
              value={day.date}
              label={day.title}
              sx={sx.proposalTab}
            />
          ))}
        </Tabs>
      )}
    </SectionCard>
  );
};
export default ScheduleTabs;

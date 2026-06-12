import SectionCard from '@/shared/ui/SectionCard/SectionCard';
import { Grid, Stack, Typography } from '@mui/material';
import { styles } from './styles';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/shared/ui/Button/Button';
import { IDashboardAttentionItemsProps } from './DashboardAttentionItems.types';

const DashboardAttentionItems: React.FC<IDashboardAttentionItemsProps> = ({
  dashboard,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serializedSearchParams = searchParams.toString();

  const sx = styles();

  const handleAttentionRedirect = (
    type: 'missing_reviewer' | 'accepted_unscheduled' | 'stale_draft',
  ) => {
    const params = new URLSearchParams(serializedSearchParams);

    params.delete('range');
    params.delete('status');

    switch (type) {
      case 'missing_reviewer':
        params.set('status', 'submitted');
        break;
      case 'accepted_unscheduled':
        params.set('status', 'accepted');
        break;
      case 'stale_draft':
        params.set('status', 'draft');
        break;
    }

    router.push(`/proposals?${params.toString()}`);
  };

  return (
    <Grid container columnSpacing={2}>
      {dashboard.attentionItems.map((item) => (
        <Grid key={item.id} size={4}>
          <SectionCard title={null} restSx={sx.DashboardAttentionItems}>
            <Stack
              direction="row"
              spacing={2}
              sx={sx.DashboardAttentionItemsCard}
            >
              <Stack direction="row" spacing={1}>
                <Typography variant="subtitle2">
                  {item.title}:{'\u00A0'}
                  <b>{item.count}</b>
                </Typography>
              </Stack>
              <Button
                mode="button"
                variant="contained"
                size="small"
                onClick={() => handleAttentionRedirect(item.type)}
              >
                Открыть
              </Button>
            </Stack>
          </SectionCard>
        </Grid>
      ))}
    </Grid>
  );
};
export default DashboardAttentionItems;

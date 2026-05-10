import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab';
import { Skeleton, Stack } from '@mui/material';
import { styles } from './styles';

const HistoryItemSkeleton = () => {
  const sx = styles();

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Stack>
          <Skeleton variant="text" width={80} />
          <Stack direction="row" spacing={2} sx={sx.itemChangesWrapper}>
            <Skeleton variant="text" width={150} />
            <Skeleton variant="text" width={100} />
          </Stack>
          <Skeleton variant="text" width={120} />
        </Stack>
      </TimelineContent>
    </TimelineItem>
  );
};

export default HistoryItemSkeleton;

import { Skeleton, TableCell, TableRow, useMediaQuery } from '@mui/material';
import {
  myProposalListItemKeys,
  myProposalTableWidthDictionary,
} from '../../model/tableColumns';
import useResizeWindow from '@/shared/utils/hooks/useResizeWindow';
import { theme } from '@/shared/theme/theme';

const MyProposalsTableRowSkeleton = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('laptop'));
  const viewportWidth = useResizeWindow();

  return (
    <TableRow>
      {myProposalListItemKeys.map((key) => {
        if (key === 'availableStatuses') return null;

        return (
          <TableCell key={`Table-body-cell-${key}`}>
            <Skeleton
              variant="text"
              width={
                myProposalTableWidthDictionary({
                  isDesktop,
                  isLaptop,
                  viewportWidth,
                })[key].skeletonWidth
              }
            />
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default MyProposalsTableRowSkeleton;

import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from '@mui/material';
import { styles } from './styles';
import {
  myProposalListItemDictionary,
  myProposalListItemKeys,
  myProposalTableWidthDictionary,
} from '../../model/tableColumns';
import { theme } from '@/shared/theme/theme';
import useViewportWidth from '@/shared/utils/hooks/useViewportWidth';

const MyProposalsTableSkeleton = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('laptop'));
  const viewportWidth = useViewportWidth();
  const sx = styles({ viewportWidth });

  return (
    <TableContainer component={Paper} sx={sx.myProposalsTable}>
      <Table>
        <colgroup>
          {Object.entries(
            myProposalTableWidthDictionary({
              isDesktop,
              isLaptop,
              viewportWidth,
            }),
          ).map(([key, value]) => (
            <col key={key} style={{ width: value.width }} />
          ))}
        </colgroup>

        <TableHead>
          <TableRow>
            {myProposalListItemKeys.map((key) => {
              if (key === 'availableStatuses') return null;

              return (
                <TableCell sortDirection={'asc'} key={`Table-head-cell-${key}`}>
                  {myProposalListItemDictionary[key]}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 10 }).map((_, idx) => (
            <TableRow key={idx}>
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default MyProposalsTableSkeleton;

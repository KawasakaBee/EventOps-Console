import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  useMediaQuery,
} from '@mui/material';
import { styles } from './styles';
import {
  auditListItemDictionary,
  auditListItemKeys,
  auditTableWidthDictionary,
} from '../../model/tableColumns';
import { theme } from '@/shared/theme/theme';
import useResizeWindow from '@/shared/utils/hooks/useResizeWindow';

const AuditTableSkeleton = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const isLaptop = useMediaQuery(theme.breakpoints.up('laptop'));
  const viewportWidth = useResizeWindow();
  const sx = styles({ viewportWidth });

  return (
    <TableContainer component={Paper} sx={sx.auditTable}>
      <Table>
        <colgroup>
          {Object.entries(
            auditTableWidthDictionary({ isDesktop, isLaptop, viewportWidth }),
          ).map(([key, value]) => (
            <col key={key} style={{ width: value.width }} />
          ))}
        </colgroup>

        <TableHead>
          <TableRow>
            {auditListItemKeys.map((key) => (
              <TableCell sortDirection="asc" key={`Table-head-cell-${key}`}>
                <TableSortLabel
                  active={true}
                  direction="asc"
                  sx={sx.auditTableSortLabel}
                  disabled={true}
                >
                  {auditListItemDictionary[key]}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 20 }).map((_, rowIdx) => {
            return (
              <TableRow key={rowIdx}>
                {auditListItemKeys.map((key) => (
                  <TableCell key={key}>
                    <Skeleton
                      variant="text"
                      width={
                        auditTableWidthDictionary({
                          isDesktop,
                          isLaptop,
                          viewportWidth,
                        })[key].skeletonWidth
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AuditTableSkeleton;
